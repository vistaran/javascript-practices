import React from 'react';
import './styles.css';
import $ from 'jquery';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ProjectInfo from './ProjectInfo';
import AddTask from './AddTask';
import NavBar from './NavBar';
import { useHistory } from "react-router-dom";
const axios = require('axios');


function Dashboard() {
    let { id } = useParams();
    // const [user_id, setId] = useState(id)
    const [task_details ,setTaskDetails] = useState([])
    let history = useHistory();
    const [projectdetails, setProjectDetails] = useState()
    const [isNoData,setIsNoData] = useState(false);
    const [favProject, setFavProject] = useState([]);
    const [project, setProject] = useState([]);
    const [addToFavPro,setAddToFavPro] = useState(0);
    
    var user = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : "";
    var user_id = user ? user[0].id : '';

    useEffect(() => {
        if(user.length <= 0) {
            history.push('/')
        }
        getproject();
    },[favProject.length,project.length]);

    function getproject() {
        axios.post('/getProject', { 
            user_id: user_id 
      })
      .then(function (response) {
        console.log(response.data.favorite_projects,response.data.projects)
        setFavProject(response.data.favorite_projects);
        setProject(response.data.projects);
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    
     function favorites () {
            if($('#add_favorites').prop("checked") == true){
                setAddToFavPro(1)
            }
     }

     function Addproject() {
        axios.post('/addnewproject', {
                user_id: user_id,
                project_name: document.getElementById('newProject').value,
                add_favorites: addToFavPro,
                project_color: document.getElementById('project_color').value
            })
            .then(function (response) {
                $('#exampleModal').modal('hide')
                getproject()

            })
            .catch(function (error) {
                console.log(error);
            })
         }

    function deleteProject(row) {
        console.log(row.id)
        axios.post('/project-delete', {
            id: row.id,
        })
        .then(function (response) {
        //   window.location.reload()
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    function updateProject(row) {
        setProjectDetails(row)
    }

    function selectProject(row) {
        setProjectDetails(row)
        axios.post('/tasks', { 
            project_id: row.id 
        })
        .then(function (response) {
            console.log(response.data.task_details)
            setTaskDetails(response.data.task_details);
            setIsNoData(true)
        })
        .catch(function (error) {
            console.log(error);
        })
                
    }

    function updateName() {
        axios.post('/updateproject', {
            pro_id: projectdetails.id,
            update_name: document.getElementById('updateName123').value
        })
        .then(function (response) {
          $('#exampleModalupdate').modal('hide')
        })
        .catch(function (error) {
          console.log(error);
        })
    }

    return (
        <>
            <NavBar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="project-style">
                                <h1 style={{textAlign:"center"}}>Projects</h1>
                                
                                <button type="button" className="btn btn-info" id="button" data-toggle="modal" data-target="#exampleModal" style={{marginTop:"15px"}}>+New project</button>
                                
                                <p id="fav_projs_name" className="favproject-name">Favorites Projects</p>
                                <ul className="ul" id="fav_projs">
                               { favProject.map((obj,index) =>  
                                    <li className="list-style" key={index}>
                                    <span style={{display:"block",width:'15px',height:'15px',borderRadius:"50%",backgroundColor:'"{obj.project_color}"',float:'left',position:'relative',top:'7px',marginRight:'10px'}}></span>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <span onClick={(e) => selectProject(obj)}  name="select" id="select" className="button" style={{color:'black'}}><label>{obj.project_name}</label></span>
                                            </div>
                                            <div className="col-md-2">
                                                <span onClick={(e) => updateProject(obj)} name ="select" className="button" style={{color:'black',display:'block'}} data-toggle="modal" data-target="#exampleModalupdate"><EditIcon /></span>
                                            </div>
                                            <div className="col-md-2">
                                                <span onClick={(e) => deleteProject(obj)}  name ="select" id="select" className="button" style={{color:'black'}}><DeleteIcon /></span>
                                            </div>
                                        </div>
                                    </li>
                                )}
                                </ul>
                                <p id="local_projs_name" className="localproject-name">Projects</p> 
                                <ul className="ul" id="projects">
                                {project.map((obj,index) => 
                                    <li className="list-style" key={index}>
                                    <span style={{display:"block",width:'15px',height:'15px',borderRadius:"50%",backgroundColor:'{obj.project_color}',float:'left',position:'relative',top:'7px',marginRight:'10px'}}></span>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <span onClick={(e) => selectProject(obj)} name="select" id="select" className="button" style={{color:'black'}}><label>{obj.project_name}</label></span>
                                            </div>
                                            <div className="col-md-2">
                                                <span onClick={(e) => updateProject(obj)} name ="select" className="button" style={{color:'black'}} data-toggle="modal" data-target="#exampleModalupdate"><EditIcon />
                                                </span>
                                            </div>
                                            <div className="col-md-2">
                                                <span onClick={(e) => deleteProject(obj)} name ="select" id="select" className="button" style={{color:'black'}}><DeleteIcon /></span>
                                            </div>
                                        </div>
                                    </li>
                                )}
                                </ul>
                            </div>
                        </div>
                       { isNoData && <div className="col-md-6">
                            <AddTask projectInfo={projectdetails} task_detail={task_details} />
                        </div>}

                        { isNoData && <div className="col-md-3">
                            <ProjectInfo projectInfo={projectdetails} />
                        </div>}
                    </div>
                </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <form className="form">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Project</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">    
                                <div className="form-group">
                                    <input className="form-control popup-input" id="newProject" name="project_name" placeholder="Enter new project name" />
                                </div>
                                <label className="switch">
                                    <input type="checkbox" id ="add_favorites" onChange={favorites} />
                                    <span className="slider round"></span>
                                </label>
                                <br></br>
                                Add to favorites
                                <br></br>
                                <br></br>
                                <input type="color" id ="project_color" name="project_color" style={{marginRight:"10px"}} />Project color           
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" id="buttoncheck" onClick={Addproject} className="btn btn-primary">Save changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            
            <div className="modal fade" id="exampleModalupdate" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update projectname</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">    
                                <div className="form-group">
                                    <input className="form-control popup-input" id="updateName123"  placeholder="Enter new task name" />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" onClick={updateName} className="btn btn-primary">Save changes</button>
                            </div>
                    </div>
                </div>
            </div>

            </>
    );
}

export default Dashboard;