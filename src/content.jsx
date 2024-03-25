import React, { useState, useEffect } from "react";
import axios from "axios";

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
        <input type="text" value={inputFeild} onChange={(e) => setInputFeild(e.target.value)} />
        <button onClick={handleInputSubmit}>Submit</button>
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
