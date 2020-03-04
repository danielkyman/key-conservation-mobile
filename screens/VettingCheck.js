import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  Alert,
  TouchableOpacity,
  ImageBackground,
  Image
} from 'react-native';
import { ScrollView } from 'react-navigation';
import { connect } from 'react-redux';
import * as SecureStore from 'expo-secure-store';
import styles from '../constants/screens/org-onboarding-styles/VettingCheck.js';
import { logout, postUser } from '../store/actions';

import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import NavigateBack from './org-onboarding-screens/formElement/NavigateBack.js';

function VettingCheck(props) {
  useEffect(() => {
    getAirtableId();
    getBackend();
  }, []);

  const [user, setUser] = useState({});

  const [state, setState] = useState({});

  // Retrieves state object from SecureStore that was created in the onboarding process (ReviewYourInfoScreen).
  const getBackend = async () => {
    const state = await SecureStore.getItemAsync('stateBE', {});
    const parseBE = JSON.parse(state);
    parseBE ? setUser(parseBE) : null;
  };

  const getAirtableId = async () => {
    const id = await SecureStore.getItemAsync('airtableID', {});
    const email = await SecureStore.getItemAsync('email', {});
    const key = await SecureStore.getItemAsync('airtableKey', {});

    setState({ email: email, id: id, key: key });
    updateAirtableVettingTrue();
    await SecureStore.setItemAsync('isVetting', 'true');
    await SecureStore.setItemAsync('vettingEmail', email);
  };

  // This adds a user if the airtable 'accepted' field is set to true and deletes all vetting data from SecureStore
  const addUser = async record => {
    console.log('checkAirtable activated');
    if (record.fields.accepted === true) {
      await SecureStore.deleteItemAsync('stateBE', {});
      props.postUser(user);
      updateAirtableVettingFalse();
      await SecureStore.deleteItemAsync('isVetting', {});
      await SecureStore.deleteItemAsync('vettingEmail', {});
      props.navigation.navigate('Welcome');
      console.log("You're good to go!");
    } else {
      console.log('not vetted yet!');
      Alert.alert('Oops', "You're not vetted yet", [{ text: 'Got it' }]);
    }
  };

  const getAirtable = () => {
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: state.key }).base('appbPeeXUSNCQWwnQ');
    base('Table 2')
      .select({
        maxRecords: 20,
        view: 'Grid view',
        filterByFormula: `{email} = \'${state.email}\'`
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach(function(record) {
            addUser(record);
          });
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }; // Checks 'Table 2' for 'accepted' field.

  const updateAirtableVettingTrue = async () => {
    console.log('update airtable activated!');
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: state.key }).base('appbPeeXUSNCQWwnQ');
    await base('Table 1').update(
      [
        {
          id: state.id,
          fields: {
            isVetting: true
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        records.forEach(function(record) {
          console.log('done with update.');
        });
      }
    );
  }; // Updates 'isVetting' field in 'Table 1' based on airtable ID.

  const updateAirtableVettingFalse = async () => {
    console.log('NameScreen updateAirtable triggered');
    var Airtable = require('airtable');
    var base = new Airtable({ apiKey: state.key }).base('appbPeeXUSNCQWwnQ');
    await base('Table 1').update(
      [
        {
          id: state.id,
          fields: {
            isVetting: false
          }
        }
      ],
      function(err, records) {
        if (err) {
          console.error(err);
          return;
        }
        // this.navOverride();
        records.forEach(function(record) {
          console.log(record.getId());
        });
      }
    );
  }; // This sets the cuurent user's 'Table 1' form, field 'isVetting', to false. This will allow a new organization to sign up through the same device.

  const logoutPress = async () => {
    await SecureStore.deleteItemAsync('sub', {});
    await SecureStore.deleteItemAsync('email', {});
    await SecureStore.deleteItemAsync('roles', {});
    await SecureStore.deleteItemAsync('id', {});
    await SecureStore.deleteItemAsync('accessToken', {});
    logout();

    const logoutURL = 'https://key-conservation.auth0.com/v2/logout?federated';

    if (Constants.platform.ios) {
      await WebBrowser.openAuthSessionAsync(logoutURL).then(result => {});
    } else {
      await WebBrowser.openBrowserAsync(logoutURL).then(result => {});
    }
    props.navigation.navigate('Logout');
  };

  return (
    <ImageBackground
      source={require('../assets/images/sumatranrhinoceros.png')}
      style={{ width: '100%', height: '100%' }}
    >
      <View style={styles.arrowView}>
        <NavigateBack
          onButtonPress={() => {
            props.navigation.navigate('ReviewYourInfo');
          }}
          color='#fff'
        />
      </View>
      <View style={styles.obBody}>
        <View style={styles.aroundImage}>
          <Image
            source={require('../assets/images/onboarding/on_g1.png')}
            resizeMode={'contain'}
            style={styles.image}
          />
          <View style={styles.titleTexts}>
            <Text style={styles.obTitle}>
              Thanks for submitting your application!
            </Text>
            <Text style={styles.obText}>
              You will receive an email with the outcome of your application in
              the next few days.
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={getAirtable} style={styles.buttonTouch}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Check vetting status</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={logoutPress} style={styles.buttonTouch}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Log Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  //   return (
  //     // on_g1.png

  //     <View style={styles.contentWrapper}>
  //       <View style={styles.arrowView}>
  //         <NavigateBack
  //           onButtonPress={() => {
  //             props.navigation.navigate('ReviewYourInfo');
  //           }}
  //           color='#FFF'
  //         />
  //       </View>
  //       <View style={styles.obBody}>
  //         <Text style={styles.obTitle}>
  //           Thanks for submitting your application!
  //         </Text>
  //         <Text style={styles.obText}>
  //           You will receive an email with the outcome of your application in the
  //           next few days.
  //         </Text>

  //         <TouchableOpacity onPress={getAirtable} style={styles.greenButton}>
  //           <View style={styles.buttons}>
  //             <Text style={styles.greenText}>Check vetting status</Text>
  //           </View>
  //         </TouchableOpacity>
  //         <View style={styles.spacer}></View>
  //         <TouchableOpacity onPress={logoutPress} style={styles.obFwdContainer}>
  //           <View style={styles.buttons}>
  //             <Text style={styles.obFwdBtnText}>Log Out</Text>
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   );
}

export default connect(null, { postUser })(VettingCheck);
