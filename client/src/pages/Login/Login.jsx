import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import Cookie from 'js-cookie'
import { useHistory } from "react-router";
function Login({setAuth}) {
  let history = useHistory();
  const onSubmit = async (values) => {
    const res = await axios.post("/api/login", values, {
      withCredentials: true,
    });
    const {success, msg, jwtToken} = res.data;

    alert(msg);

    if(success) {
      Cookie.set("userToken", jwtToken, {
        secure: true,
        expires: 1,
        http: true,
        sameSite:"Strict"
      })
      setAuth(true)
      return window.location.href="/"
    }

  };

  const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    password: yup.string().required(),
  });

  const initialValues = {
    email: "",

    password: "",
   
  };
 
  return (
    <div className="creatpost__container">
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {(formik) => {
          return (
            <Form autoComplete="off" className="form">

             <h2>Login Form</h2>
             
              <div className="input__container">
                <label htmlFor="email">email</label>
                <Field
                  name="email"
                  className="inputField"
                  id="email"
                  placeholder="(Ex: email...)"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input__container">
                <label htmlFor="password">password</label>
                <Field
                  type="password"
                  name="password"
                  className="inputField"
                  id="password"
                  placeholder="(Ex: password...)"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>

              <div className="input__container">
                <button type="submit">Submit</button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default Login;
