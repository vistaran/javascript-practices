
// pure javascript
// window.onload = () => {
//     init();
// };


// jquery alternative
$(document).ready(function () {
    init();
});

var listOfUsers = [];
var currentlySelectedUser = '';
var currentRoom;
var showmessage;
var messagedisplay;

function init() {
    $.ajax({
        url: "/api"
      }).done(function(response) {
        // Append favorite projects
        
        listOfUsers = response.result;
        
        console.log(listOfUsers);
        var str = '';
        listOfUsers.forEach(function (obj) {
            str += `
            <div class="col-md-12">
                <a href="javascript:void(0)" onclick="selectUser('${obj._id}')" style="color:black">
                    <div class="row" style="margin-top: 15px;">
                        <div class="col-md-2">
                            <span class="dot1"></span>
                        </div>
                        <div class="col-md-10" style="line-height:60%;">
                            <p class="name" style="font-size:18px">${obj.name} ${obj.lastname ? obj.lastname : ''}</p>
                        </div>
                    </div>
                </a>
            </div>
            `;
        });
    
        document.getElementById('listofuser').innerHTML = str;
    });
}

function selectUser(_id, justRefresh) {
    listOfUsers.forEach((s) => {
        if(s._id === _id) {
            currentlySelectedUser = s;
        }
    });

    var data = {
        Userid : currentlySelectedUser._id
    };
   
    $.ajax({
        url: "/api/createRoomUser",
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
      }).done(function(response) {
            
            currentRoom = response.room;
            console.log("C ROOM > ", currentRoom);
            messagedisplay = response.sendMessagesdetails
            console.log(messagedisplay);
            // set user name
            var str = '';  
            $('#hr').fadeIn();
            $('#username').html(currentlySelectedUser.name);
            $('#username').fadeIn();
            console.log(_id);
            messagedisplay.forEach((u) => {
                if (u.from_user_id === _id) {
                    str +=`
                    <div class="message">
                        <div class="sender-message">
                            ${u.message}
                        </div>
                    </div>
                    `;
                }else {
                    str +=`
                    <div class="message">
                        <div class="sender-message-reciver">
                            ${u.message}
                        </div>
                    </div>
                    `;
                }
                                          
            })
            $('#viewmessage').html(str);
            if(!justRefresh) {
                var str1 = ``;
                    str1 +=`
                        <form class="form">
                            <div class = "row">
                                <div class="col-md-8" style="width : 718px">
                                    <div class="form-group ">
                                        <input type="text" id ="message" class="form-control" placeholder="Type a message..." />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <button type="button" id="button" class="btn btn-success"  onclick="sendmessage('${currentRoom.room_users[1]}')">Send</button>
                                </div>
                            </div>
                        </form>
                    `;
                $('#sendmessage').html(str1);
                $('#sendmessage').fadeIn();
            }
        });
}

// setInterval(function () {
//     if(currentlySelectedUser && currentlySelectedUser._id) {
//         selectUser(currentlySelectedUser._id, true);
//     }
// }, 2000);

function sendmessage(users_id) {
    console.log(users_id,currentRoom._id);
    var usermessage = $('#message').val();
        $('#viewmessage').append(usermessage);

    var data = {
        message: $('#message').val(),
        room_users: currentRoom._id,
        user_id: currentlySelectedUser._id
    };

    $.ajax({
        url: '/api/sendMessages',
        method: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
        }).done((res) => {
        console.log(res);
        document.getElementById('message').value = '';
    })
}

// function addproject() {
//     var data = {
//         project_name: $('#newProject').val(), // from input
//         fav : $("#add_favorites").val(),
//         color : $('#project_color').val()
//     };
//     // send data to server and refresh view

//     $.ajax({
//         url: '/api/addnewproject',
//         method: 'POST',
//         data: JSON.stringify(data),
//         contentType: 'application/json; charset=utf-8',
//         dataType: 'json'
//     }).done((res) => {
//         $('#exampleModal').modal('hide');
//         if (res.selectProject.length > 0) {
//             $('#added_projct').html("Project is Already Exist in Database")
//             x= setTimeout(callfunction,3000);
//             function callfunction() {
//                 var y = $('#added_projct')
//                 y.remove()
//             }
//         }
//         // automatic refresh - reusable functions
//         init();
//     });
// }

// function deleteProject(_id,index) {
//     if(confirm('Are you sure?')) {
//         $.ajax({
//             url: '/api/project-delete/' + _id
//         }).done((res) => {
//             var str = '';
//             fav_projs.splice(index,1);   
//             fav_projs.forEach(function (obj,index) {
//                 str += `
//                 <li class="list-style">
//                 <span style="display:block; width:15px; height: 15px; border-radius: 50%; background-color: ${obj.project_color}; float: left;position: relative;top: 7px;
//                 margin-right: 10px;"></span>
//                     <div class="row">
//                         <div class="col-md-8">
//                             <a href="javascript:void(0)" onclick="getProjectTasks('${obj._id}')"  name ="select" id="select" class="button" style="color: black;"><label>${obj.project_name}</label></a>
//                         </div>
//                         <div class="col-md-2">
//                             <a href="javascript:void(0)" name ="select" class="button" style="color: black"; data-toggle="modal" data-target="#exampleModalupdate"><i class="fa fa-pencil" aria-hidden="true"></i></a>
//                             </a>
//                         </div>
//                         <div class="col-md-2">
//                             <a href="javascript:void(0)" onclick="deleteProject('${obj._id}',${index})"  name ="select" id="select" class="button" style="color: black;"><i class="fa fa-trash" style="color: black"; aria-hidden="true"></i></a></li>
//                         </div>
//                     </div>
//                 </li>
//                 `;
//             });
        
//             document.getElementById('fav_projs').innerHTML = str;
        
//             // jquery alternative
//             // $('#fav_projs').html(str);
        
//             var str = '';
//             projects.splice(index,1)
//             projects.forEach(function (obj,index) {
//                 str += `
//                 <li class="list-style">
//                 <span style="display:block; width:15px; height: 15px; border-radius: 50%; background-color: ${obj.project_color}; float: left;position: relative;top: 7px;
//                 margin-right: 10px;"></span>
//                     <div class="row">
//                         <div class="col-md-8">
//                             <a href="javascript:void(0)" onclick="getProjectTasks('${obj._id}')"  name ="select" id="select" class="button" style="color: black;"><label>${obj.project_name}</label></a>
//                         </div>
//                         <div class="col-md-2">
//                             <a href="javascript:void(0)" name ="select" id="select" class="button" style="color: black"; data-toggle="modal" data-target="#exampleModalupdate"><i class="fa fa-pencil" aria-hidden="true"></i></a>
//                             </a>
//                         </div>
//                         <div class="col-md-2">
//                             <a href="javascript:void(0)" onclick="deleteProject('${obj._id}',${index})"  name ="select" id="select" class="button" style="color: black;"><i class="fa fa-trash" style="color: black"; aria-hidden="true"></i></a></li>
//                         </div>
//                     </div>
//                 </li>
//                 `;
//             });
        
//             $('#projects').html(str);
//         });
//     }
// }
  
// function deleteTasks(_id,task_name,index) {
//     console.log(index);
//     var data = {
//         taskName : task_name,
//         pro_id : _id 
//     };
//     $.ajax({
//         url: '/api/task-delete', 
//         method: 'POST',
//         data: JSON.stringify(data),
//         contentType: 'application/json; charset=utf-8',
//         dataType: 'json'
//     }).done((res) => {
//         console.log(res);
//         // remove from task details array and re-fresh table
//         var str = '';  
//         taskdetails.splice(index,1);   
//         taskdetails.forEach((task,index) => {   
//             //console.log(taskdetails);
//             str += `
//             <tr>
                
//                  <td>${task.task_name}</td> 
            
//                 <td>${task.created_at}</td>
            
//                 <td><a href="javascript:void(0)"  onclick="deleteTasks('${task._id}','${task.task_name}',${index})"><i class="fa fa-trash" style="color: black"; aria-hidden="true">
//                 </i></a></td>
//             </tr>
//             `;
            
//         });
       
//         $('#task_list').html(str);
        
//     });
// }

// function updateName() {
//         var data ={
//             update_name: $('#updateName123').val(), // from input
//             pro_id: currentlySelectedUser._id
//         };
//     $.ajax({
//         url: '/api/updateproject',
//         method: 'POST',
//         data: JSON.stringify(data),
//         contentType: 'application/json; charset=utf-8',
//         dataType: 'json' 
//     }).done(function(res) {
//         $('#exampleModalupdate').modal('hide');
//         init();
//     });       
// }
