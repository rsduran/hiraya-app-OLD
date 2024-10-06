from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://rsduran:password@localhost/hiraya'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    workload_id = db.Column(db.Integer, db.ForeignKey('workload.id'), nullable=False)

class Workload(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    visibility = db.Column(db.String(20), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    tasks = db.relationship('Task', backref='workload', lazy=True)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'visibility': self.visibility,
            'updatedAt': self.updated_at.isoformat(),
            'tasks': [{'title': task.title, 'description': task.description} for task in self.tasks]
        }

@app.route('/api/workloads', methods=['GET', 'POST'])
def handle_workloads():
    if request.method == 'GET':
        workloads = Workload.query.all()
        return jsonify([workload.to_dict() for workload in workloads])
    elif request.method == 'POST':
        data = request.json
        new_workload = Workload(name=data['name'], visibility=data['visibility'])
        for task_data in data.get('tasks', []):
            new_task = Task(title=task_data['title'], description=task_data.get('description', ''))
            new_workload.tasks.append(new_task)
        db.session.add(new_workload)
        db.session.commit()
        return jsonify(new_workload.to_dict()), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)