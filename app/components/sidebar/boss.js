
import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';

import style from '../../support/styles/components/sidebar';

class Boss extends Component {
  constructor(props) {
    super(props);
    const { name, selectBoss } = props;
    this.state = {
      name
    };
    this.selectBoss = () => selectBoss(props);
  }

  render() {
    const { name } = this.props;

    return (
      <ListItem
        title={name}
        onPress={this.selectBoss}
        style={style.listItem}
      />
    );
  }
}

export default Boss;
