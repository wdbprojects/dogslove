import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { Button, Divider } from "@mui/material";
import { InputTextSmall, RegisterInput } from "../components/inputs";
import logo5 from "../assets/images/logo5.png";

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
          <div className="login_1_wrap">
            <div className="login_1">
              {/* <img src="../../icons/facebook.svg" alt="logo" /> */}
              <div className="logo_image">
                <img src={logo5} alt="Wingless Angels logo" />
              </div>

              <span>
                <strong>Wingless Angels</strong> is the place where our little
                angels will find a chance to a better life
              </span>
            </div>
          </div>

          <div className="login_2_wrap">
            <div className="login_2">
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
                color="info"
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

const Container = styled.div`
  background-color: var(--bg-secondary);
`;
const Wrapper = styled.div`
  display: block;
  margin: 0px auto;
  max-width: 1280px;
  .login_wrap {
    height: 78vh;
    color: var(--color-primary);
    @media (min-width: 850px) {
      display: flex;
      align-items: center;
      flex-direction: row;
    }
    .login_1_wrap {
      width: 100%;
      .login_1 {
        width: 300px;
        margin: 0px auto;
        padding: 1rem 0px 0px;
        text-align: center;
        @media (min-width: 850px) {
          width: 60%;
          margin: 0px auto;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        @media (min-width: 1100px) {
          width: 80%;
        }
        span {
          display: inline-block;
          font-size: 0.9rem;
          line-height: 1.3;
          width: 100%;
          @media (min-width: 850px) {
            display: block;
            font-size: 1rem;
            text-align: left;
          }
          @media (min-width: 1100px) {
            font-size: 1.2rem;
            line-height: 1.6;
          }
        }
        .logo_image {
          display: inline-block;
          margin-bottom: 0.5rem;
          display: flex;
          justify-content: flex-start;
          img {
            max-width: 90%;
            @media (min-width: 850px) {
              max-width: 100%;
            }
            @media (min-width: 1100px) {
              max-width: 70%;
            }
          }
        }
      }
    }
    .login_2_wrap {
      width: 100%;
      .login_2 {
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
        @media (min-width: 850px) {
          width: 70%;
        }
        form {
          width: 100%;
        }
        button {
          width: 100%;
          display: flex;
          align-items: center;
        }
      }
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
