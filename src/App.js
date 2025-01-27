import React,{useState,useEffect} from "react";
import "./App.css"
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import {BsCheckLg} from 'react-icons/bs';
function App() {
  const [isCompleteScreen,setIsCompleteScreen]=useState(false)
  const [allToDo,setToDo]= useState([])
  const [newTitle,setNewTitle]= useState("")
  const [newDescription,setNewDescripition]=useState("")
  const [completedTodo,setCompledTodo]=useState([])

  const handleAddToDo=()=>{
    let newToDoItem={
      title:newTitle,
      description:newDescription
    }
    let updatedToDoArray=[...allToDo]
    updatedToDoArray.push(newToDoItem)
    setToDo(updatedToDoArray);
    localStorage.setItem("todoList",JSON.stringify(updatedToDoArray))
    setNewTitle("");
    setNewDescripition("");
  }
  const handleDeleteCompletedTodo=index=>{
    let reduceTodo=[...allToDo]
    reduceTodo.splice(index)
    localStorage.setItem("todoList",JSON.stringify(reduceTodo))
    setToDo(reduceTodo)
  }
  const handleComplete=(index)=>{
    let now= new Date();
    let dd= now.getDate()
    let mm =now.getMonth()+1;
    let h = now.getHours ();
    let yyyy= now.getFullYear();
    let m=now.getMinutes();
    let s= now.getSeconds(); 
    let completedOn =
      dd + '-' + mm + '-' + yyyy + ' at ' + h + ':' + m + ':' + s;     
    let filteredItem={
      ...allToDo[index],
      completedOn:completedOn
    } 
    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.push (filteredItem);
    setCompledTodo(updatedCompletedArr);
    handleDeleteCompletedTodo(index);
    localStorage.setItem (
      'completedTodos',
      JSON.stringify (updatedCompletedArr)
    );
    
  }
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todoList"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos")); // Corrected key
  
    if (savedTodo) {
      setToDo(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompledTodo(savedCompletedTodo);
    }
  }, []);
  

  return (
    
    <div className="App">
     <h1>My To do</h1>
     <div className="todo-wrapper">
         <div className="todo-input">
            <div className="todo-input-item">
              <label>Title</label>
              <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)} placeholder="whats the task "></input>
            </div>
            <div className="todo-input-item">
              <label>Description</label>
              <input type="text" value={newDescription} onChange={(e)=>setNewDescripition(e.target.value)} placeholder="whats the task description"></input>
            </div>
            <div className="todo-input-item">
                   <button onClick={handleAddToDo} type="button" className="primaryBtn">Add</button>
            </div>
         </div>
         <div className="btn-area">
               <button className={`secondaryBtn ${isCompleteScreen===false && "active"}`} onClick={()=>setIsCompleteScreen(false)}>Todo</button>
               <button className={`secondaryBtn ${isCompleteScreen===true && "active"}`} onClick={()=>setIsCompleteScreen(true)}>completed</button>
         </div>
         <div  className="todo-List">
          {isCompleteScreen===false && allToDo.map((item,index)=>{
              return(
              <div className="todo-list-item" key={item}>
              <div>
               <h3>{item.title}</h3>
               <p>{item.description}</p>
               </div>
               <div >
                 <AiOutlineDelete className="icon"  onClick={() => handleDeleteCompletedTodo (index)} title="Delete"/>
                 <BsCheckLg className="check-icon" onClick={()=>handleComplete(index)} title="Complete?"/>
             </div>
             </div>
              )
            })}
             {isCompleteScreen===true && completedTodo.map((item,index)=>{
              return(
              <div className="todo-list-item" key={item}>
              <div>
               <h3>{item.title}</h3>
               <p>{item.description}</p>
               <p><small>{item.completedOn}</small></p>
               </div>
               <div >
                 <AiOutlineDelete className="icon"  onClick={() => handleDeleteCompletedTodo (index)} title="Delete"/>
                 
             </div>
             </div>
              )
            })}
           
         </div>
     </div>
    </div>
  );
}

export default App;
