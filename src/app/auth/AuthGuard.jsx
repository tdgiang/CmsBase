import React, {
  useContext,
  useEffect,
  useState,
} from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import AppContext from "../contexts/AppContext";
import useAuth from 'app/hooks/useAuth'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Backdrop,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));


const getUserRoleAuthStatus = (pathname, user) => {
  
if(user){
  return true
  // if(user.is_sysadmin){
  //   return true
  // }else{
  //   let flag=false;
  //   console.log("listPath",user.listPath)
  //   console.log("Path",pathname)
  //   user.listPath.map(e=>{
  //     if(e==pathname || pathname==='/dashboard/default' || pathname==='/'  || pathname=="/dashboard" || pathname=="/my-profile" || pathname=="/change-password" )
  //       flag=true
      
  //   })
  //   return flag
  // }
}

return false

};

const AuthGuard = ({ children,modalLoading }) => {
  const classes = useStyles();
  const {
      isAuthenticated,
      user
  } = useAuth()

  const [previouseRoute, setPreviousRoute] = useState(null)
  const { pathname } = useLocation()

  const isUserRoleAuthenticated = getUserRoleAuthStatus(pathname, user);
  let authenticated = isAuthenticated && isUserRoleAuthenticated;

  console.log("authenticated",authenticated)

  useEffect(() => {
      if (previouseRoute !== null) setPreviousRoute(pathname)
  }, [pathname, previouseRoute])
  if (authenticated) 
  return <>
            <Backdrop
          className={classes.backdrop}
            open={modalLoading.isVisible}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {children}
  </>
  else {
      return (
          <Redirect
              to={{
                  pathname: '/session/signin',
                  state: { redirectUrl: previouseRoute },
              }}
          />
      )
  }
}



const mapStateToProps = (state) => {
  return {
    modalLoading: state.ModalLoadingReducer,
  };
};
export default connect(mapStateToProps, {})(AuthGuard);