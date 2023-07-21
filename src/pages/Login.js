import classesCSS from './Login.module.css'
import { makeStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { useState } from 'react';
const useStyles = makeStyles({
    field: {
      marginTop: 20,
      marginBottom: 20,
    }
  })

const Login = (props) => {
  const classes = useStyles()
    const [username,setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameHandler = (e) => {
        setUsername(e.target.value)
    }

    const passwordHandler = (e) => {
        setPassword(e.target.value)
    }

    return ( <div className={classesCSS.container} >

            <form noValidate autoComplete="off"  >
            <Typography 
                variant="h6"
                color="textSecondary"
                component="h2"
                gutterBottom
                >
        Login </Typography>
                <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" width="500px">
                <TextField
                      onChange={usernameHandler}
                    label="Username"
                    variant="outlined"
                    color="secondary"
                    className={classes.field}
                    fullWidth
                    required
                    //   error={titleError}
                    />
                    <TextField
                      onChange={passwordHandler}
                    label="Password"
                    variant="outlined"
                    color="secondary"
                    className={classes.field}
                    fullWidth
                    required
                    //   error={titleError}
                    />
                    <Button onClick={()=>props.loginHandler(username,password)}
                    color="secondary" 
                    variant="contained"
                    fullWidth
                    >Login</Button>
                    </Box>
            </form>
        </div>
         );
}
 
export default Login;