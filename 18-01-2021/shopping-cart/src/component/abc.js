import React, { Component } from "react"
import './style.css'
import axios from 'axios';
    
class EventBinding extends Component {

    constructor(props) {
        super(props)
        this.state = {
            //isLoggedIn: false,
            isUpdate: false,
            index:0,
            person : [
                {
                    Action: "X",
                    Update: "U"
                }
            ]
        }// this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/todos',
        ).then( (res) => {
            console.log(res.data);
                this.setState( {person: res.data})
        })
    }
        
        
    clickHandler = () =>  {
        const person = this.state.person.slice(0);
        var firstname = document.getElementById('firstname').value    
        var lastname = document.getElementById('lastname').value   
        person.push({
           firstname: firstname,
           lastname: lastname,
           Action: "X",
           Update: "U"
       })
       this.setState({
            person: person
       })
    }

    // updateHandler = () =>  {
    //     var firstname = document.getElementById('firstname').value    
    //     var lastname = document.getElementById('lastname').value   
    //     console.log(firstname,lastname);

    //     this.state.person.splice(this.state.index,1)
    //     this.state.person.splice(this.state.index, 0, {firstname : firstname,lastname:lastname,Action: "X",Update: "U"});

    //    this.setState({
    //         isUpdate: false
    //     })
    // }

    updateHandler = () =>  {
        var updateUserId = document.getElementById('userId').value
        console.log(updateUserId);
        var id = document.getElementById('id').value    
        console.log(id);
        var title = document.getElementById('title').value   
        this.state.person.splice(this.state.index,1)
        this.state.person.splice(this.state.index, 0, { updateUserId,id,title,Action: "X",Update: "U"});

       this.setState({
            isUpdate: false
        })
    }
    
    
    UpdateName = (index) => {
        this.setState({
            isUpdate: true,
            index : index
       })
    }   

    deleteElement = (index) => {
        console.log(index);
        this.state.person.splice(index,1);
        this.setState({
            person:this.state.person
        })
    }       

    render() {
        console.log(this.state.index);
        if (this.state.isUpdate === true) {
            return (
                <div>
                    Userid: <input type="text" name="userid" id="userId"/>
                    <br></br>
                    id: <input type="text" name="id" id="id"/>
                    <br></br>
                    title: <input type="text" name="title" id="title"/> 
                    <br></br>
                    <button
                        className="App-link"
                        onClick={this.updateHandler.bind(this)}
                        >Update
                    </button>
                </div>
            );
        }
        // const gods = [{
        //     name: 'Krishna',
        //     weapon: 'Sudarshan Chakra'
        // }, {
        //     name: 'Ram',
        //     weapon: 'Bow'
        // }, {
        //     name: 'Shiv',
        //     weapon: 'Pashupatastra'
        // }];

        // const godList = gods.map((god, index) => <h2 key={index} style={heading}>My name is {god.name} and my weapon is {god.weapon}</h2>)
        return (
            <div>
                <div>  
                    <table>   
                        <thead>
                            <tr>
                                <th>UserId</th>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Action</th>
                                <th>Update</th>
                            </tr>
                        </thead> 
                        <tbody>       
                        {Object.keys(this.state.person).map((name,index) =>
                            <tr key={index}>
                                <td>{this.state.person[name].userId}</td>
                                <td>{this.state.person[name].id}</td>
                                <td>{this.state.person[name].title}</td>
                                <td onClick={() => this.deleteElement(index)}>X</td>
                                <td onClick={() => this.UpdateName(index)}>U</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        )   
    }
}

export default EventBinding;