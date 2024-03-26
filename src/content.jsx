import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const content = ({onLogout,subId,dataAPI}) => {
    const [data,setData] = useState([]);
    useEffect(() => {
        const fethcData = async () => {
          const getData = await axios.get(
            `${dataAPI}/api/check/${subId}`
          );
          setData(getData.data);
          console.log(getData.data);
        };
        fethcData();
      }, []);

      const [inputFeild,setInputFeild] = useState('');

      const handleInputSubmit = async() => {
        try {
            const postData = await axios.post(`${dataAPI}/api/check`,{
                name:inputFeild,
                authId:subId
            })
            setInputFeild('');
            setData([...data,postData.data]);
        } catch (error) {
            console.error(error);
        }
      }

      const handleDelete = async(id) => {
        console.log(id)
        try {
            const deleteData = await axios.delete(`${dataAPI}/api/check/${id}`);
            setData(data.filter(item => item._id !== id));
        } catch (error) {
            console.error(error);
        }
      }
  return (
    <div>
        {data.map((checkData) => (
            <div key={checkData._id}>
                {checkData._id}
                {checkData.name}
                <span onClick={() => handleDelete(checkData._id)}>Delete</span>
            </div>
        ))}
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.authId}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="left"> <Button variant="contained" size="small"  onClick={() => handleDelete(row._id)}>Delete malpu</Button>
</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        <br />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" value={inputFeild} onChange={(e) => setInputFeild(e.target.value)}  />
        <br />
        <Button variant="contained" size="large" onClick={handleInputSubmit}>Add</Button>
        <br />
        <br />
        <br />
        {subId}
        <button onClick={onLogout}>Logout</button>
    </div>
  )
}

export default content

// import React, { useState } from 'react';
// import axios from 'axios';

// const content = () => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [message, setMessage] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await axios.post('http://localhost:5000/send-sms', { phoneNumber, message });
//             alert('SMS sent successfully');
//             setPhoneNumber('');
//             setMessage('');
//         } catch (error) {
//             console.error('Error sending SMS:', error);
//             alert('Failed to send SMS');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <input
//                 type="text"
//                 placeholder="Phone Number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//             <input
//                 type="text"
//                 placeholder="Message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//             />
//             <button type="submit">Send SMS</button>
//         </form>
//     );
// };

// export default content;
