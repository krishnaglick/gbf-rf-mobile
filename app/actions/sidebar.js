
import _ from 'lodash';

export function toggleSideMenu() {
  this.setState({
    toggled: !this.state.toggled
  });
}

export function selectBoss(boss) {
  this.setState({
    activeBoss: boss
  });
}

export function getBosses(ws) {
  ws.onopen = () => {
    const msg = { allRaidBossesMessage : { } };
    ws.send(JSON.stringify(msg));
  };
  ws.onmessage = (e) => {
    const raidBossesParent = JSON.parse(e.data).raidBossesMessage;
    if(raidBossesParent && typeof raidBossesParent === 'object') {
      const { raidBosses } = raidBossesParent;
      const filteredBossses = _.filter(raidBosses, (raidBoss) => raidBoss.language === 'ENGLISH');
      const bosses = _.sortBy(filteredBossses, b => b.level);
      this.setState({ bosses });
      ws.close();
    }
  };
}
