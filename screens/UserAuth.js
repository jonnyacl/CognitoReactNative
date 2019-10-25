import React, { useState, useContext } from "react";
import { Auth } from "aws-amplify";
import { UserContext } from "../context/UserContext";
import { View, Text, TextInput, Button } from "react-native";
import { styles } from "../styles";

const UserAuth = ({showRegister, showAuth}) => {
  // eslint-disable-next-line no-unused-vars
  const [ userState, dispatch ] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(!showRegister);

  const signin = () => {
    setIsLoading(true);
    console.log(`Signing in with ${email}`);
    Auth.signIn(email, password)
      .then(u => {
        console.log(JSON.stringify(u));
        setIsLoading(false);
        dispatch({
          type: "LOGIN_SUCCESS",
          user: {
            email: u.attributes.email,
            id: u.username,
          },
          company: "Fractal",
          appKey: u.signInUserSession.idToken.payload.appkey,
          jwtToken: u.signInUserSession.idToken.jwtToken,
        });
      }).catch(e => {
        console.log(e);
        dispatch({ type: "LOGIN_FAIL", e });
        if (e.code === "UserNotFoundException") {
          setLoginError("Username or password incorrect");
        } else if (e.code === "NotAuthorizedException") {
          setLoginError("Username or password incorrect");
        } else {
          setLoginError("Login failed");
        }
        setIsLoading(false);
      }
    );
  };

  const confirmCode = () => {
    setIsLoading(true);
    Auth.confirmSignUp(userState.newUser.email, code)
      .then(() => {
        Auth.signIn(userState.newUser.email, userState.newUser.password).then(u => {
          console.log(JSON.stringify(u));
          setIsLoading(false);
          dispatch({
            type: "LOGIN_SUCCESS",
            user: {
              email: u.attributes.email,
              id: u.username,
            },
            company: "Fractal",
            appKey: u.signInUserSession.idToken.payload.appkey,
            jwtToken: u.signInUserSession.idToken.jwtToken,
          });
        }).catch(e => {
          console.log(e);
          dispatch({ type: "LOGIN_FAIL", e });
          setLoginError(`Failed to login: ${e.message}`);
          setIsLoading(false);
        });
      }).catch(e => {
        console.log(e);
        dispatch({ type: "CONFIRM_CODE_FAIL", e });
        setLoginError(`Failed to confirm code: ${e.message}`);
        setIsLoading(false);
      }
    );
  };

  const register = () => {
    setIsLoading(true);
    Auth.signUp(email, password)
      .then(u => {
        console.log(JSON.stringify(u));
        setIsLoading(false);
        dispatch({
          type: "SIGNUP_SUCCESS",
          newUser: {
            email,
            password
          }
        });
      }).catch(e => {
        console.log(JSON.stringify(e));
        dispatch({ type: "SIGNUP_FAIL", e });
        setLoginError(`Failed to login: ${e.message}`);
        setIsLoading(false);
      }
    );
  };

  const validateLoginForm = () => {
    return email && email.length > 0 && password && password.length > 0;
  };

  const validateRegisterForm = () => {
    return email && email.length > 0 && password && password.length > 0 && passwordConfirm && (passwordConfirm === password);
  };

  const validateConfirmForm = () => {
    return code && code.length > 0;
  };

  const onChangeEmail = (value) => {
    setEmail(value);
  };

  const onChangePw = (value) => {
    setPassword(value);
  };

  const onChangeConfirmPassword = (value) => {
    setPasswordConfirm(value);
  };

  const onChangeCode = (value) => {
    setCode(value);
  }

  const renderErrors = () => {
    if (loginError && loginError.length > 0) {
      return (
        <View className="text-danger">
          <Text>{loginError}</Text>
        </View>
      );
    }
    return null;
  };

  return (
    <>
    {(userState.newUser && userState.confirmCode) ? <View>
      <Text style={styles.sectionDescription}>Enter confirmation code</Text>
      <TextInput placeholder="Code"
        onChangeText={value => onChangeCode(value)}
        style={styles.formText}
      />
      <Button title="Confirm" onPress={() => {confirmCode()}} disabled={!validateConfirmForm()}/>
      {renderErrors()}
      </View>
    : isLogin ? <View>
        <Text style={styles.sectionDescription}>Login</Text>
        <TextInput placeholder="Email"
          onChangeText={value => onChangeEmail(value)}
          style={styles.formText}
        />
        <TextInput placeholder="Password"
          onChangeText={value => onChangePw(value)}
          style={styles.formText}
        />
        <Button title="Login" onPress={() => signin()} disabled={!validateLoginForm()}/>
        <Button title="Register" onPress={() => {setIsLogin(false)}}/>
        {renderErrors()}
      </View>
      : <View>
          <Text style={styles.sectionDescription}>Sign up here</Text>
          <TextInput placeholder="Email"
            onChangeText={value => onChangeEmail(value)}
            style={styles.formText}
          />
          <TextInput placeholder="Password"
            onChangeText={value => onChangePw(value)}
            style={styles.formText}
          />
          <TextInput placeholder="Confirm Password"
            onChangeText={value => onChangeConfirmPassword(value)}
            style={styles.formText}
          />
          <Button title="Register" onPress={() => register()} disabled={!validateRegisterForm()}/>
          <Button title="Login" onPress={() => {setIsLogin(true)}}/>
          {renderErrors()}
        </View>}
        <View><Button title="Home" onPress={() => {showAuth(false)}}/></View>
      </>
  );
};

export default UserAuth;
