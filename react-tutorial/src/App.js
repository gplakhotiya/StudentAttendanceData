import React, {useState} from 'react';
import './App.css';

function App() {

  const [name, setName]=useState("");
  const [rollNumber, setRollNumber]=useState("");
  const [studentData, setStudentData] = useState([]);
  const currentdate = new Date(); 
  
  function addData(){
    const checkIn = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    if (rollNumber !== "" && name !== ""){
      const data = {"rollNumber": rollNumber, "name": name, "checkIn": checkIn , "checkOut": ""}
      setStudentData(
        [...studentData, data]
      ); 
    }
  }


  function checkOut(student){
    const checkOut = currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const studentId = {"rollNumber": student.rollNumber, "name": student.name, "checkIn": student.checkIn , "checkOut": checkOut};
    const newStudentData = studentData.filter((newStudent) => newStudent.rollNumber !== student.rollNumber);
    setStudentData([...newStudentData, studentId])
  }

  return (
    <div className="App" >
        <input id="roll-number" type="text" placeholder="Roll Number" name="rollnumber" value={rollNumber} onChange ={(e) => setRollNumber(e.target.value)} />
        <input id="name" type="text" placeholder="Name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
        <button onClick={() => addData()}> Add </button>
        <hr/>
        <p>{studentData.length} student data is here in list</p>
        <table>
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Name</th>
              <th>Checkin Time</th>
              <th>checkout Time</th>
            </tr>
          </thead>
          <tbody>
          {studentData.map((student)=> {
            if(student.checkOut !== "") {
               return (            
                <tr key={student.rollNumber}>
                  <td>{student.rollNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.checkIn}</td>
                  <td>{student.checkOut}</td>                  
                </tr>
            );
            }else{
            return (            
                <tr key={student.rollNumber}>
                  <td>{student.rollNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.checkIn}</td>
                  <td><button onClick={() => (checkOut(student))}>Check Out</button></td>                  
                </tr>
            );
          }
          })}
          </tbody>
        </table>
    </div>
  );
}

export default App;
