
import React, { Component } from 'react';
import { ListItem } from 'react-native-elements';
import _ from 'lodash';
import moment from 'moment';
import style from '../../support/styles/components/boss';

const actions = require('../../actions/boss/boss');

class Boss extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
      now: moment()
    };
    //console.log(props);
    _.forEach(Object.keys(actions), key => this[key] = actions[key].bind(this));
  }

  render() {
    const { raidId, screenName, createdAt } = this.state;
    const whenPosted = moment(createdAt).fromNow();

    return (
      <ListItem
        title={`${screenName} - ${whenPosted}`}
        onPress={() => this.copyID(raidId)}
        style={style.listItem}
      />
    );
  }
}

export default Boss;
