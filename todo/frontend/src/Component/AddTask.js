import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import DeleteIcon from '@material-ui/icons/Delete';
const axios = require('axios');

function AddTask(props) {
    console.log(props.task_detail)
    function saveTask() {
        axios.post('/add_Task', {
            pro_id: props.projectInfo.id,
            task_name: document.getElementById('newtask').value,
        })
        .then(function (response) {
          $('#exampleModal').modal('hide')
        })
        .catch(function (error) {
          console.log(error);
        })        
    }

    function deleteProject(row) {
        console.log(row.project_id)
        axios.post('/task-delete', {
            pro_id: row.project_id,
            taskName: row.task_name
        })
        .then(function (response) {
        //   window.location.reload()
        })
        .catch(function (error) {
          console.log(error);
        })
    }
    return (
        <div>
            <div>
             <h2 style={{color:'black',textAlign:'left'}}>{props.projectInfo.project_name}</h2>    
                    <div className="line"></div>
                    <button type="button" className="btn btn-info"  id="button1" data-toggle="modal" data-target="#exampleModal3" style={{marginTop:'30px',textAlign:'left'}}>+ Add task</button>
                        <br></br>
                        <br></br>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Created</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                            {props.task_detail.map((obj,index) => 
                                <tr key={index}>   
                                    <td>{obj.task_name}</td> 
                                    <td>{obj.created_at}</td>
                                    <td onClick={(e) => deleteProject(obj)}><DeleteIcon /></td>
                                </tr>
                            )} 
                            </tbody>
                    </table>
                    </div>
        <div className="modal fade" id="exampleModal3" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <form className="form" method="POST" action="/addTask">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">    
                            <div className="form-group">
                                <input className="form-control popup-input" id="newtask" name="task_name" placeholder="Enter new task name" />
                            </div>
                            {/* <input className="form-control popup-input" type="hidden" name="project_id" value="<%= project_detail.id %>" /> */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" onClick={saveTask} className="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        </div>
    );
}

export default AddTask;