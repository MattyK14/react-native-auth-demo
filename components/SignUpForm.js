import React, { Component } from 'react';
import { View } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = 'https://us-central1-react-native-auth-demo-11461.cloudfunctions.net/';

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      phoneNumber: '',
    };
  }

  onSubmit = async () => {
    try {
      await axios.post(`${ROOT_URL}/createUser/`, {
        phoneNumber: this.state.phoneNumber
      });

      await axios.post(`${ROOT_URL}/requestOneTimePassword/`, {
        phoneNumber: this.state.phoneNumber
      });
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
        <Button title="Submit" onPress={this.onSubmit} />
      </View>
    );
  }
}

export default SignUpForm;
