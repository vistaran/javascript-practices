import React from 'react';

function ProjectInfo(props) {
    return (
        <div>
             
                    Name: {props.projectInfo.project_name}
                    <br></br>
                    Created At: {props.projectInfo.project_created_at}                
        </div>
    );
}

export default ProjectInfo;