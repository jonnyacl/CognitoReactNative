/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useReducer, useState } from 'react';
import Amplify, { Auth } from "aws-amplify";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';

import { styles } from "./styles";
import config from "./config";
import { UserReducer } from "./reducers/UserReducer";
import { UserContext } from "./context/UserContext";
import UserAuth from "./screens/UserAuth";
import { defaultHeaders } from "./ApiConfig";

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  API: {
    endpoints: [],
  },
});

const App: () => React$Node = () => {
  const initialUserState = {
    user: null,
    appKey: null,
    confirmCode: false,
    newUser: null,
  };
  const [userChecked, setUserChecked] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [register, setRegister] = useState(false);
  const userReducer = (state, action) => UserReducer(state, action);
  const [userState, userDispatch] = useReducer(userReducer, initialUserState);

  const doShowAuth = (show) => {
    setShowAuth(show);
  };

  // only check user is logged in once on component load (and we have no logged-in user in global state)
  if (!userState.user && !userChecked) {
    Auth.currentSession().then(res => {
      const idToken = res.getIdToken();
      console.log(`Company ${JSON.stringify(idToken.payload.company)}`);
      const name = idToken.payload["cognito:username"];
      const user = {
        id: name,
        email: idToken.payload.email,
      };
      const appKey = idToken.payload.appkey;
      const jwtToken = idToken.jwtToken;
      userDispatch({ type: "CHECK_LOGIN_SUCCESS", user, appKey, jwtToken, company: "Fractal" });
      setUserChecked(true);
    }).catch((e) => {
      console.log(e);
      setUserChecked(true);
      userDispatch({ type: "CHECK_LOGIN_FAIL" });
    });
  };

  const logout = () => {
    Auth.signOut().then(() => {
      userDispatch({ type: "LOGOUT_SUCCESS" })
    }).catch(() => {
      console.log("Failed to logout");
    });
  }

  const getStarted = () => {
    setRegister(true);
    setShowAuth(true);
  };

  const goToLogin = () => {
    setShowAuth(true);
    setRegister(false);
  };

  const renderAppContent = () => {
    if (userState.company === null) {
      return (
        <>
          <View>
            <Text style={styles.sectionDescription}>Please enter your company name so we can find you and help with your VAT</Text>
            <TextInput style={styles.formText}placeholder="Company Name" onChangeText={(value) => setCompanyName(value)} />
            <Button title="Submit" onPress={() => submitCompany()} disabled={!companyName || companyName.length == 0}/>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View>
            <Text style={styles.sectionContent}>{userState.user}</Text>
          </View>
        </>
      );
    }
  };

  const renderAuth = () => {
    if (userState.user) {
      // logged in
      return renderAppContent();
    } else if (showAuth) {
      // show login and register
      return (<UserAuth showRegister={register} showAuth={doShowAuth}/>);
    } else {
      // show home page
      return (
      <View style={styles.sectionContainer}>
        <View>
          <Text style={styles.sectionTitle}>App</Text>
        </View>
        <View style={styles.loginButton}>
          <Button title="Get Started" onPress={() => {getStarted()}} />
        </View>
        <View>
          <Button title="Login" onPress={() => {goToLogin()}} />
        </View>
      </View>);
    }
  };

  return (
    <>
      <UserContext.Provider value={[userState, userDispatch]}>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <View style={styles.topBar}>
                <Text style={styles.header}>VAT-I-Can</Text>
                {userState.user ? <Button style={styles.logoutButton} title="Logout" onPress={() => logout()}/> : null}
              </View>
              {renderAuth()}
            </View>
          </ScrollView>
        </SafeAreaView>
      </UserContext.Provider>
    </>);
};

export default App;
