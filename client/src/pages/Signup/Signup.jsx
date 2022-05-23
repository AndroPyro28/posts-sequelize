import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
function Signup() {
  const onSubmit = async (values) => {
    const res = await axios.post("/api/signup", values, {
      withCredentials: true,
    });
    console.log(res.data);
  };
  const validationSchema = yup.object().shape({
    email: yup.string().required().email(),
    username: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required("password confirmation is required"),
  });

  const initialValues = {
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  };
  const matchPassword = (password, confirmPassword) => {
    return password !== confirmPassword
      ? "Password & Confirm Password must be match"
      : "";
  };
  return (
    <div className="creatpost__container">
      <Formik
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        initialValues={initialValues}
      >
        {(formik) => {
          const { password, confirmPassword } = formik.values;
          return (
            <Form autoComplete="off" className="form">
             <h2>Signup Form</h2>
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
                <label htmlFor="username">username</label>
                <Field
                  name="username"
                  className="inputField"
                  id="username"
                  placeholder="(Ex: username...)"
                />
                <ErrorMessage
                  name="username"
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
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  className="inputField"
                  id="confirmPassword"
                  placeholder="(Ex: Confirm Password...)"
                  validate={() => matchPassword(password, confirmPassword)}
                />
                <ErrorMessage
                  name="confirmPassword"
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

export default Signup;
