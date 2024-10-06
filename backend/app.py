import os
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from datetime import datetime
from flask_cors import CORS
from flask_socketio import SocketIO
import uuid
import logging

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
socketio = SocketIO(app, cors_allowed_origins="*")

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'postgresql://rsduran:password@localhost/hiraya')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

logging.basicConfig(level=logging.DEBUG)

class Task(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    workload_id = db.Column(db.String(36), db.ForeignKey('workload.id'), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'createdAt': self.created_at.isoformat(),
            'workloadId': self.workload_id
        }

class Workload(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    name = db.Column(db.String(100), nullable=False)
    visibility = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    tasks = db.relationship('Task', backref='workload', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'visibility': self.visibility,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat(),
            'tasks': [task.to_dict() for task in self.tasks]
        }

@app.route('/api/workloads', methods=['GET', 'POST'])
def handle_workloads():
    if request.method == 'GET':
        try:
            workloads = Workload.query.all()
            return jsonify([workload.to_dict() for workload in workloads])
        except Exception as e:
            app.logger.error(f"Error fetching workloads: {str(e)}")
            return jsonify({"error": str(e)}), 500
    elif request.method == 'POST':
        try:
            data = request.json
            app.logger.info(f"Received data: {data}")
            new_workload = Workload(name=data['name'], visibility=data['visibility'])
            for task_data in data.get('tasks', []):
                new_task = Task(title=task_data['title'], description=task_data.get('description', ''))
                new_workload.tasks.append(new_task)
            db.session.add(new_workload)
            db.session.commit()
            socketio.emit('workload_updated', {'type': 'workload_updated'}, namespace='/')
            return jsonify(new_workload.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            app.logger.error(f"Error creating workload: {str(e)}")
            return jsonify({"error": str(e)}), 500

@app.route('/api/workloads/<workload_id>', methods=['GET'])
def get_workload(workload_id):
    try:
        workload = Workload.query.get_or_404(workload_id)
        return jsonify(workload.to_dict())
    except Exception as e:
        app.logger.error(f"Error fetching workload {workload_id}: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/workloads/<workload_id>/tasks', methods=['POST'])
def add_task_to_workload(workload_id):
    try:
        workload = Workload.query.get_or_404(workload_id)
        data = request.json
        new_task = Task(title=data['title'], description=data.get('description', ''), workload_id=workload_id)
        db.session.add(new_task)
        db.session.commit()
        socketio.emit('task_added', {'type': 'task_added', 'workload_id': workload_id}, namespace='/')
        return jsonify(new_task.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        app.logger.error(f"Error adding task to workload {workload_id}: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/workloads/<workload_id>/tasks/<task_id>', methods=['GET'])
def get_task(workload_id, task_id):
    try:
        task = Task.query.filter_by(id=task_id, workload_id=workload_id).first_or_404()
        task_data = task.to_dict()
        task_data['workloadName'] = task.workload.name
        return jsonify(task_data)
    except Exception as e:
        app.logger.error(f"Error fetching task {task_id} for workload {workload_id}: {str(e)}")
        return jsonify({"error": str(e)}), 500

@socketio.on('connect')
def handle_connect():
    app.logger.info('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    app.logger.info('Client disconnected')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    socketio.run(app, debug=True)