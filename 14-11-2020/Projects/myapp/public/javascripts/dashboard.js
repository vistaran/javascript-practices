
// pure javascript
// window.onload = () => {
//     init();
// };


// jquery alternative
$(document).ready(function () {
    init();
});

var fav_projs = [];
var projects = [];
var currentlySelectedProject = '';
var taskdetails = [];
var str;

function init() {
    $.ajax({
        url: "/api/projects"
      }).done(function(response) {
        // Append favorite projects
        
        fav_projs = response.favorite_projects;
        projects = response.projects;

        if(!projects.length && !fav_projs.length) {
            $("#emptyProject").fadeIn();    
        }else {
           $("#emptyProject").fadeOut();  

        var str = '';
        $("#fav_projs_name").fadeIn();
        $("#local_projs_name").fadeIn();
        fav_projs.forEach(function (obj,index) {
            str += `
            <li class="list-style">
            <span style="display:block; width:15px; height: 15px; border-radius: 50%; background-color: ${obj.project_color}; float: left;position: relative;top: 7px;
            margin-right: 10px;"></span>
                <div class="row">
                    <div class="col-md-8">
                        <a href="javascript:void(0)" onclick="getProjectTasks(${obj.id})"  name ="select" id="select" class="button" style="color: black;"><label>${obj.project_name}</label></a>
                    </div>
                    <div class="col-md-2">
                        <a href="javascript:void(0)" name ="select" class="button" style="color: black"; data-toggle="modal" data-target="#exampleModalupdate"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                        </a>
                    </div>
                    <div class="col-md-2">
                        <a href="javascript:void(0)" onclick="deleteProject(${obj.id},${index})"  name ="select" id="select" class="button" style="color: black;"><i class="fa fa-trash" style="color: black"; aria-hidden="true"></i></a></li>
                    </div>
                </div>
            </li>
            `;
        });
    
        document.getElementById('fav_projs').innerHTML = str;
    
        // jquery alternative
        // $('#fav_projs').html(str);
    
        var str = '';
        projects.forEach(function (obj,index) {
            str += `
            <li class="list-style">
            <span style="display:block; width:15px; height: 15px; border-radius: 50%; background-color: ${obj.project_color}; float: left;position: relative;top: 7px;
            margin-right: 10px;"></span>
                <div class="row">
                    <div class="col-md-8">
                        <a href="javascript:void(0)" onclick="getProjectTasks(${obj.id})"  name ="select" id="select" class="button" style="color: black;"><label>${obj.project_name}</label></a>
                    </div>
                    <div class="col-md-2">
                        <a href="javascript:void(0)" name ="select" id="select" class="button" style="color: black"; data-toggle="modal" data-target="#exampleModalupdate"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                        </a>
                    </div>
                    <div class="col-md-2">
                        <a href="javascript:void(0)" onclick="deleteProject(${obj.id},${index})"  name ="select" id="select" class="button" style="color: black;"><i class="fa fa-trash" style="color: black"; aria-hidden="true"></i></a></li>
                    </div>
                </div>
            </li>
            `;
        });
    
        $('#projects').html(str);
    }
    });
}

function getProjectTasks(project_id) {
    // show task detail section
    $('#task_list_section').fadeIn();
    $('#show-project-details').fadeIn();

    // set selected project
    projects.forEach((p) => {
        if(p.id == project_id) {
            currentlySelectedProject = p;
        }
    });

    fav_projs.forEach((p) => {
        if(p.id == project_id) {
            currentlySelectedProject = p;
        }
    });
    console.log(currentlySelectedProject);
    console.log(currentlySelectedProject.project_created_at);
    
    $('#project-name').html(currentlySelectedProject.project_name.charAt(0).toUpperCase()+currentlySelectedProject.project_name.substring(1));
    $('#project-createdat').html(currentlySelectedProject.project_created_at);
    
    // set project name
    $('#project_name').html(currentlySelectedProject.project_name.charAt(0).toUpperCase()+currentlySelectedProject.project_name.substring(1));
    // get tasks for project
    $.ajax({
        url: '/api/projects/tasks/' + project_id
    }).done((response) => {
        taskdetails = response.task_details;
        var str = '';  
        console.log(taskdetails);  
        taskdetails.forEach((task,index) => {
            //console.log(taskdetails);
            str += `
            <tr>
                
                 <td>${task.task_name}</td> 
            
                <td>${task.created_at}</td>
            
                <td><a href="javascript:void(0)"  onclick="deleteTasks(${task.project_id},'${task.task_name}',${index})"><i class="fa fa-trash" style="color: black"; aria-hidden="true">
                </i></a></td>
            </tr>
            `;
            
        });
       
        $('#task_list').html(str);
    });
}

function addTask() {
    console.log(taskdetails.created_at);
    var data = {
        task: $('#newtask').val(), // from input
        pro_id: currentlySelectedProject.id
    };
    // send data to server and refresh view

    $.ajax({
        url: '/api/projects/add_task',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done((res) => {
        console.log(res);
        $('#exampleModal1').modal('hide');
        // automatic refresh - reusable function
        getProjectTasks(currentlySelectedProject.id);
    })
}

function addproject() {
    
    console.log($("#add_favorites").val());
    var data = {
        project_name: $('#newProject').val(), // from input
        fav : $("#add_favorites").val(),
        color : $('#project_color').val()
    };
    // send data to server and refresh view

    $.ajax({
        url: '/api/projects/addnewproject',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done((res) => {
        console.log(res);
        $('#exampleModal').modal('hide');
        // automatic refresh - reusable function
        init();
    });
}

function deleteProject(project_id,index) {
    if(confirm('Are you sure?')) {
        $.ajax({
            url: '/api/projects/project-delete/' + project_id
        }).done((res) => {
            var str = '';
            fav_projs.splice(index,1);   
            fav_projs.forEach(function (obj,index) {
                str += `
                <li class="list-style">
                <span style="display:block; width:15px; height: 15px; border-radius: 50%; background-color: ${obj.project_color}; float: left;position: relative;top: 7px;
                margin-right: 10px;"></span>
                    <div class="row">
                        <div class="col-md-8">
                            <a href="javascript:void(0)" onclick="getProjectTasks(${obj.id})"  name ="select" id="select" class="button" style="color: black;"><label>${obj.project_name}</label></a>
                        </div>
                        <div class="col-md-2">
                            <a href="javascript:void(0)" name ="select" class="button" style="color: black"; data-toggle="modal" data-target="#exampleModalupdate"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                            </a>
                        </div>
                        <div class="col-md-2">
                            <a href="javascript:void(0)" onclick="deleteProject(${obj.id},${index})"  name ="select" id="select" class="button" style="color: black;"><i class="fa fa-trash" style="color: black"; aria-hidden="true"></i></a></li>
                        </div>
                    </div>
                </li>
                `;
            });
        
            document.getElementById('fav_projs').innerHTML = str;
        
            // jquery alternative
            // $('#fav_projs').html(str);
        
            var str = '';
            projects.splice(index,1)
            projects.forEach(function (obj,index) {
                str += `
                <li class="list-style">
                <span style="display:block; width:15px; height: 15px; border-radius: 50%; background-color: ${obj.project_color}; float: left;position: relative;top: 7px;
                margin-right: 10px;"></span>
                    <div class="row">
                        <div class="col-md-8">
                            <a href="javascript:void(0)" onclick="getProjectTasks(${obj.id})"  name ="select" id="select" class="button" style="color: black;"><label>${obj.project_name}</label></a>
                        </div>
                        <div class="col-md-2">
                            <a href="javascript:void(0)" name ="select" id="select" class="button" style="color: black"; data-toggle="modal" data-target="#exampleModalupdate"><i class="fa fa-pencil" aria-hidden="true"></i></a>
                            </a>
                        </div>
                        <div class="col-md-2">
                            <a href="javascript:void(0)" onclick="deleteProject(${obj.id},${index})"  name ="select" id="select" class="button" style="color: black;"><i class="fa fa-trash" style="color: black"; aria-hidden="true"></i></a></li>
                        </div>
                    </div>
                </li>
                `;
            });
        
            $('#projects').html(str);
        });
    }
}

    
function deleteTasks(project_id,task_name,index) {
    console.log(index);
    var data = {
        taskName : task_name,
        pro_id : project_id 
    };
    $.ajax({
        url: '/api/projects/task-delete', 
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done((res) => {
        console.log(res);
        // remove from task details array and re-fresh table
        var str = '';  
        taskdetails.splice(index,1);   
        taskdetails.forEach((task,index) => {   
            //console.log(taskdetails);
            str += `
            <tr>
                
                 <td>${task.task_name}</td> 
            
                <td>${task.created_at}</td>
            
                <td><a href="javascript:void(0)"  onclick="deleteTasks(${task.project_id},'${task.task_name}',${index})"><i class="fa fa-trash" style="color: black"; aria-hidden="true">
                </i></a></td>
            </tr>
            `;
            
        });
       
        $('#task_list').html(str);
        
    });
}

function updateName() {
        var data ={
            update_name: $('#updateName123').val(), // from input
            pro_id: currentlySelectedProject.id
        };
    $.ajax({
        url: '/api/projects/updateproject',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json' 
    }).done(function(res) {
        console.log(res);
        $('#exampleModal').modal('hide');
        init()
    });       //updateName(id);
}
