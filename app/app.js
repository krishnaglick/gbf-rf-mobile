
import React, { Component } from 'react';
import { View } from 'react-native';
import Sidebar from './components/sidebar';
import styles from './support/styles/app';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Sidebar />
      </View>
    );
  }
}

export default App;
