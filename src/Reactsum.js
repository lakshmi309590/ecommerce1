import React,{useState} from "react";

function AddSum(){
    const[num1,setNum1]=useState('')
    const [num2,setNum2]=useState('')
    const [result,setResult]= useState(null)
    const handleAddition=()=>{
        const sum=parseFloat(num1)+parseFloat(num2)
        setResult(sum)
    }
    return(
        <div>
          <h1>Add Number</h1>
          <div>
            <input
            type="number"
            placeholder="enter a number"
            value={num1}
            onChange={(e)=>setNum1(e.target.value)}
            />
            <input
            type="number"
            placeholder="enter the other number"
            value={num2}
            onChange={(e)=>setNum2(e.target.value)}
            />
            <button onClick={handleAddition}>add numbers</button>

            <p>result:{result}</p>
          </div>
        </div>
    )
}

export default AddSum