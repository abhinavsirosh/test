import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/base';

export default function User() {
    const[name,setName]=React.useState('')
    const[address,setAddress]=React.useState('')
    const[users,setUsers]=React.useState([])
    const handleClick=(e)=>{
        e.preventDefault()
        const user={name,address}
        console.log(user)
        fetch(" http://localhost:8080/user/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(user)
        }).then(()=>{
            console.log("New user added")
        })

    }
    React.useEffect(()=>{
        fetch("http://localhost:8080/user/getall")
        .then(res=>res.json())
        .then((result)=>{
            setUsers(result);
        }
        )
    },[])
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="User name" variant="outlined" 
      value={name}
      onChange={(e)=>setName(e.target.value)} />
      <TextField id="outlined-basic" label="Address" variant="outlined" 
      value={address}
      onChange={(e)=>setAddress(e.target.value)}
      />
      <Button variant="contained" onClick={handleClick}>Submit</Button>
      <Box>
        {
            users.map(user=>(
                <paper>
                    Id:{user.id}
                    name:{user.name}
                    address:{user.address}
                </paper>
            ))
        }
      </Box>
    </Box>
   
    
  );
}
