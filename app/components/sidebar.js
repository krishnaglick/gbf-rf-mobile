
import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import { List } from 'react-native-elements';
import Boss from './sidebar/boss';
import BossList from './boss/bossList';
import _ from 'lodash';

import style from '../support/styles/components/sidebar';
const actions = require('../actions/sidebar');

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bosses: [],
      activeBoss: null
    };
    _.forEach(Object.keys(actions), key => this[key] = actions[key].bind(this));
    const ws = new WebSocket('ws://gbf-raidfinder.aikats.us/ws/raids?keepAlive=true', 'json');
    this.getBosses(ws);
  }

  render() {
    const { bosses, activeBoss } = this.state;

    const Menu = (
      <List containerStyle={style.list}>
        {
          _.map(bosses, (boss, i) =>
            <Boss {...boss} selectBoss={this.selectBoss} key={i} />
          )
        }
      </List>
    );

    if(!bosses.length)
      return <Text>Loading Bosses</Text>;

    let _scrollView = new ScrollView();

    return (
      <ScrollView
        ref={(scrollView) => { _scrollView = scrollView; }}
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={200}>
          {
            activeBoss ?
              <BossList {...activeBoss} selectBoss={this.selectBoss} /> :
              Menu
          }
      </ScrollView>
    );
  }
}

export default Sidebar;
