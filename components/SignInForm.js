import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = 'https://us-central1-react-native-auth-demo-11461.cloudfunctions.net/';

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
      code: '',
    };
  }

  onSubmit = async () => {
    const { phoneNumber, code } = this.state;

    try {
      let { data } = await axios.post(`${ROOT_URL}/verifyOneTimePassword/`, {
        phoneNumber,
        code
      });
      firebase.auth().signInWithCustomToken(data.token);
    }

    catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View>
        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
          />
        </View>

        <View style={{ marginBottom: 10 }}>
          <FormLabel>Enter Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({ code })}
          />
        </View>
        <Button title="Submit" onPress={this.onSubmit} />
      </View>
    );
  }
}

export default SignInForm;
