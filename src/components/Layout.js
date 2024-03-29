import { AppBar, Box, Drawer, Tab, Tabs, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { List, ListItem,ListItemIcon, ListItemText } from "@material-ui/core";
import { AddCircleOutlineOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import {format} from 'date-fns'
import { Avatar } from "@material-ui/core";
import Login from "../pages/Login";
import { useState } from "react";
import React from "react";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { loginActions } from "../store/loginSlice";
import { Button } from "@material-ui/core";
// import loginSlice from "../../store/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import SignUp from "../pages/SignUp";

const drawerWidth = 240

const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawerWidth
        },
        drawerPraper: {
            width: drawerWidth
        },
        root: {
            display:'flex'
        },
        active : {
            background: '#f4f4f4'
        },
        title: {
            padding: theme.spacing(2)
        },
        appbar: {
            width: `calc(100% - ${drawerWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar:{ 
            marginLeft: theme.spacing(2)
        }

    }
})



function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


const Layout = (props) => {

    const loggedIn = useSelector(state => state.login.loggedIn)
    const dispatch = useDispatch()
    // const [loggedIn, setLoggedIn] = useState(false)
    const history = useHistory()
    const location = useLocation()
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(()=> {
        const sendRequest = async () => {
            let token = localStorage.getItem('jwt')
            console.log('token',token)
             const data = await axios.post('http://localhost:5000/login',{
                jwtToken : token
            })

            if(data.data.loggedIn){
                dispatch(loginActions.setLoggedInUserAndState({
                    userID : data.data.userID
                }))
            }
            // console.log('Inside UseEffect')
            // console.log(data)
        }
       sendRequest()
    }
    ,[])
    const menuItems = [
        {
            text: 'My Notes',
            icon: <SubjectOutlined color="secondary" />,
            path: '/'
        },
        {
            text: 'Create Note',
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: '/create'
        },
    ]

    const loginHandler = async (username,password) => {
        console.log(username,password)
        let data = await axios.post('http://localhost:5000/login',{
            username,password
        },{
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })

        console.log(data.data)
        localStorage.setItem('jwt', data.data.accessToken)
        
        if(data.data.loggedIn){
            dispatch(loginActions.setLoggedInUserAndState({
                userID : data.data.userID
            }))
        }
    }

    const signUpHandler = async (username,password) => {
        console.log(username,password)
        let data = await axios.post('http://localhost:5000/signup',{
            username,password
        },{
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true
          })
    }
    const logoutHandler = () => {
        console.log('logoutHandler')
        localStorage.removeItem('jwt')
        dispatch(loginActions.setLoggedInUserAndState({
            userID : ''
        }))
    }


    var background = <Login/>
    if(!loggedIn){
        background = (
        <div style={{display:'flex', flexDirection:'column',justifyContent:'center',alignItems:'center',width:'100%',height:'100vh'}}>

        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', display:'flex', justifyContent:'center' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="SignUp" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <Login loginHandler={loginHandler} /> 
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <SignUp signUpHandler={signUpHandler} /> 
            </CustomTabPanel>
        </Box>
            
    
            
        </div>
           )
    }
    else{
        background = (
                    <React.Fragment>
                        {/* app bar */}
                    <AppBar className={classes.appbar} elevation={0}>
                    <Toolbar>
                    <Typography className={classes.date} >
                        Today is the {format(new Date(),'do MMMM Y')}
                    </Typography>
                    <Button type="button" 
                    onClick={logoutHandler}
                    color="secondary" 
                    variant="contained">Log out</Button>
                    
                    </Toolbar>
                </AppBar>
                {/* side drawer */}
                <Drawer 
                className={classes.drawer}
                variant="permanent"
                classes={{paper: classes.drawerPraper}}
                >
                    <div>
                        <Typography variant="h5" className={classes.title}>
                            MyNotes
                        </Typography>
                    </div>
                    <List>
                        {menuItems.map(item=> (
                            <ListItem
                            button
                            key={item.text}
                            onClick={()=>history.push(item.path)}
                            className={location.pathname == item.path?classes.active:null}
                            >
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />

                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <div className={classes.page}>
                    <div className={classes.toolbar}></div>
                    {props.children}
                </div>
                </React.Fragment>)
    }
    return ( 
    <div className={classes.root}>
      {background}
    </div> );
}
 
export default Layout;