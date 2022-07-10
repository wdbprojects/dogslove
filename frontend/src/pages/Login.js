import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Button, Divider } from "@mui/material";
import { InputTextSmall, RegisterInput } from "../components/inputs";

const loginInfos = { email: "", password: "" };

const Login = () => {
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is a required field")
      .email("Must be a valid email address"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters")
      .max(25, "Password no longer than 25 characters"),
  });
  return (
    <Container>
      <Wrapper>
        <div className="login_wrap">
          <div className="login_1">
            <img src="../../icons/facebook.svg" alt="logo" />
            <span>
              <strong>DogsLove</strong> is the place where our little angels
              will find a chance to a better life
            </span>
          </div>
          <div className="login_2">
            <div className="login_2_wrap">
              <Formik
                enableReinitialize
                initialValues={{ email: email, password: password }}
                validationSchema={loginValidation}>
                {(formik) => {
                  return (
                    <Form autoComplete="off">
                      <InputTextSmall
                        type="text"
                        label="Your email"
                        name="email"
                        onChange={handleLoginChange}
                        value={email}
                      />
                      <InputTextSmall
                        type="password"
                        label="Your password"
                        name="password"
                        onChange={handleLoginChange}
                        value={password}
                        bottom
                      />
                      <Button variant="contained" color="primary">
                        Log In
                      </Button>
                    </Form>
                  );
                }}
              </Formik>
              <Link to="/forgot" className="forgotPassword">
                Forgot your password?
              </Link>
              <Divider sx={{ width: "100%" }} />

              <Button
                variant="contained"
                color="success"
                sx={{ width: "70% !important", marginTop: "1rem" }}>
                Create Account
              </Button>
            </div>
            <div className="createCelebPage">
              <Link to="/" className="createCelebPage">
                <strong>Create a Page</strong> for a celebrity, brand, or
                business
              </Link>
            </div>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;
const Wrapper = styled.div`
  background-color: var(--bg-secondary);
  .login_wrap {
    height: 78vh;
    color: var(--color-primary);
    .login_1 {
      width: 300px;
      margin: 0 auto;
      text-align: center;
      span {
        font-size: 16px;
        line-height: 1.3;
      }
    }
  }
  .login_2_wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    background-color: var(--bg-primary);
    box-shadow: 0px 1px 2px var(--shadow-1);
    padding: 1rem;
    padding-bottom: 2rem;
    width: 350px;
    height: fit-content;
    border-radius: 8px;
    margin: 1rem auto;
    form {
      width: 100%;
    }
    button {
      width: 100%;
      display: flex;
      align-items: center;
    }
  }
  .createCelebPage {
    text-align: center;
  }
  .forgotPassword {
    color: var(--blue-color);
    font-size: 15px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default Login;
