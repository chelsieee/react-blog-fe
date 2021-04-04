import React from "react";
import { LoginUser } from "./LoginUser";
import { SignUp } from "./NewUser";
import axios from "axios";
import { Route, useHistory } from "react-router-dom";     

export const UserContainer = (props) => {
  const history =useHistory()

  const handleRegisterFormSubmit = (newUser) => {
    axios
      .post("/api/users", newUser, {
        "Access-Control-Allow-Credentials": true,
      })
      .then((res) => {
        history.replace('/user/login')
       
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data["message"]);
      });
  };

  const handleLoginFormSubmit = (existingUser) => {
    axios
      .post("/api/auth/login", existingUser, {
        "Access-Control-Allow-Credentials": true,
      })
      .then((user) => {
        console.log(user)
        console.log("user.data", user.data);
        props.setUsers({ isLoggin: true });
        window.localStorage.setItem("userName", JSON.stringify(user.data.user.username))
        window.localStorage.setItem(
          "token",
          JSON.stringify(user.data.token)
        );
        history.replace('/private')
      })
      .catch((err) => {
      console.log("err", err.response.data["message"])
      window.alert(err.response.data["message"])
      });
  };
  return (
    <div>
      <Route path="/user/login">
        <LoginUser onSubmit={handleLoginFormSubmit} />
      </Route>
      <Route path="/user/register">
        <SignUp onSubmit={handleRegisterFormSubmit} />
      </Route>
    </div>
  );
};
