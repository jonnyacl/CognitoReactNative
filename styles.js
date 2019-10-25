import {
    StyleSheet,
  } from 'react-native';

export const styles = StyleSheet.create({
    scrollView: {
      // backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      // backgroundColor: Colors.white,
    },
    header: {
      fontSize: 24,
      fontWeight: '700',
      flex: 1,
    },
    loginButton: {
      marginTop: 40,
    },
    formText: {
      padding:12,
      borderWidth: 1,
      margin: 10,
      // borderColor: Colors.dark,
      borderRadius: 5,
    },
    topBar: {
      marginTop: 32,
      paddingHorizontal: 24,
      flexDirection:"row",
    },
    logoutButton: {
      flex: 1,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: '600',
      // color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      paddingLeft: 24,
      paddingRight: 24,
      fontSize: 18,
      fontWeight: '400',
      // color: Colors.dark,
    },
    sectionContent: {
      marginTop: 8,
      paddingLeft: 24,
      paddingRight: 24,
      fontSize: 12,
      fontWeight: '400',
      // color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      // color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });