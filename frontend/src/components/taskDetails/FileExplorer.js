import React from 'react'
import { Box } from '@primer/react'
import { TreeView } from '@primer/react'
import {
    FileIcon,
    DiffAddedIcon,
    DiffModifiedIcon,
    DiffRemovedIcon,
    DiffRenamedIcon,
} from '@primer/octicons-react'

const FileExplorer = () => {
    return (
        <Box
            bg="canvas.subtle"
            p={3}
            sx={{
                width: '300px',
                height: '100vh',
                overflowY: 'auto',
                borderRight: '1px solid',
                borderColor: 'border.default',
            }}
        >
            <Box sx={{ marginBottom: '20px' }}></Box>

            <nav aria-label="Files">
                <TreeView aria-label="Files">
                    <TreeView.Item id="src" defaultExpanded>
                        <TreeView.LeadingVisual>
                            <TreeView.DirectoryIcon />
                        </TreeView.LeadingVisual>
                        src
                        <TreeView.SubTree>
                            <TreeView.Item id="src/Avatar.tsx">
                                <TreeView.LeadingVisual>
                                    <FileIcon />
                                </TreeView.LeadingVisual>
                                Avatar.tsx
                                <TreeView.TrailingVisual label="added">
                                    <DiffAddedIcon color="success.fg" />
                                </TreeView.TrailingVisual>
                            </TreeView.Item>
                            <TreeView.Item id="src/utils.js">
                                <TreeView.LeadingVisual>
                                    <FileIcon />
                                </TreeView.LeadingVisual>
                                utils.js
                                <TreeView.TrailingVisual label="modified">
                                    <DiffModifiedIcon color="attention.fg" />
                                </TreeView.TrailingVisual>
                            </TreeView.Item>
                            <TreeView.Item id="src/App.tsx">
                                <TreeView.LeadingVisual>
                                    <FileIcon />
                                </TreeView.LeadingVisual>
                                App.tsx
                            </TreeView.Item>
                            <TreeView.Item id="src/index.tsx">
                                <TreeView.LeadingVisual>
                                    <FileIcon />
                                </TreeView.LeadingVisual>
                                index.tsx
                            </TreeView.Item>
                        </TreeView.SubTree>
                    </TreeView.Item>

                    <TreeView.Item id="public" defaultExpanded>
                        <TreeView.LeadingVisual>
                            <TreeView.DirectoryIcon />
                        </TreeView.LeadingVisual>
                        public
                        <TreeView.SubTree>
                            <TreeView.Item id="public/index.html">
                                <TreeView.LeadingVisual>
                                    <FileIcon />
                                </TreeView.LeadingVisual>
                                index.html
                                <TreeView.TrailingVisual label="renamed">
                                    <DiffRenamedIcon />
                                </TreeView.TrailingVisual>
                            </TreeView.Item>
                            <TreeView.Item id="public/favicon.ico">
                                <TreeView.LeadingVisual>
                                    <FileIcon />
                                </TreeView.LeadingVisual>
                                favicon.ico
                                <TreeView.TrailingVisual label="removed">
                                    <DiffRemovedIcon color="danger.fg" />
                                </TreeView.TrailingVisual>
                            </TreeView.Item>
                            <TreeView.Item id="public/manifest.json">
                                <TreeView.LeadingVisual>
                                    <FileIcon />
                                </TreeView.LeadingVisual>
                                manifest.json
                            </TreeView.Item>
                            <TreeView.Item id="public/robots.txt">
                                <TreeView.LeadingVisual>
                                    <FileIcon />
                                </TreeView.LeadingVisual>
                                robots.txt
                            </TreeView.Item>
                        </TreeView.SubTree>
                    </TreeView.Item>
                </TreeView>
            </nav>
        </Box>
    )
}

export default FileExplorer
