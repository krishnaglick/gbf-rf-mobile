
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { List } from 'react-native-elements';
import Boss from './boss';
import _ from 'lodash';

import style from '../../support/styles/components/boss';

const actions = require('../../actions/boss/bossList');

class BossList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bosses: props.bosses || [],
      name: props.name || 'No name available',
      translatedName: props.translatedName.value
    };
    this.selectBoss = () => props.selectBoss(null);
    _.forEach(Object.keys(actions), key => this[key] = actions[key].bind(this));
    this.ws = new WebSocket('ws://gbf-raidfinder.aikats.us/ws/raids?keepAlive=true', 'json');
    this.getBossList(this.ws);
  }

  componentWillUnmount() {
    this.ws.close();
  }

  toggleFollow() {

  }

  toggleSubscribe() {

  }

  clear() {
    this.setState({
      bosses: []
    });
  }

  render() {
    const { bosses, name } = this.state;
    const { selectBoss } = this;

    const sortedBosses = _.orderBy(bosses, b => b.createdAt, ['desc']);
    const bossElems = _.map(sortedBosses, (boss) => <Boss {...boss} bossName={name} key={boss.raidId} />);

    let _scrollView = new ScrollView();

    return (
      <ScrollView
        ref={(scrollView) => { _scrollView = scrollView; }}
        automaticallyAdjustContentInsets={false}
        scrollEventThrottle={200}>
          <Button title={name} style={style.header} onPress={selectBoss} />
          <List containerStyle={style.list}>
            {bossElems}
          </List>
      </ScrollView>
    );
  }
}

export default BossList;
