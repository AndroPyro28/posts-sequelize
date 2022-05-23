import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import "./createpost.css";
import axios from "axios";
import Cookies from "js-cookie";
import {useHistory} from 'react-router-dom';

function Createpost() {
  let history = useHistory();  
  const onSubmit = (values) => {
    axios.post("/api/createPost", {values}, {
      withCredentials: true,
      headers: {
        userToken: Cookies.get("userToken")
      }
    }).then(res => {
      console.log(res.data)
      if(res.data.success) {
        return history.push("/");//use history for this and for authentication Redirect and if forcing to change routes window.location.href
      }
    })
    .catch(err => console.error(err))
  };

  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    postText: yup.string().required("Post Text is required"),
  });

  const initialValues = {
    title: "",
    postText: "",
  };

  return (
    <div className="creatpost__container">
      <Formik
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        initialValues={initialValues}
      >
        {(formik) => (
          <Form autoComplete="off" className="form">
            <div className="input__container">
              <label htmlFor="title">title</label>
              <Field
                name="title"
                className="inputField"
                id="title"
                placeholder="(Ex: title...)"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input__container">
              <label htmlFor="postText">post text</label>
              <Field
                name="postText"
                className="inputField"
                id="postText"
                placeholder="(Ex: post...)"
              />
              <ErrorMessage
                name="postText"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input__container">
              <button type="submit">Submit</button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Createpost;
