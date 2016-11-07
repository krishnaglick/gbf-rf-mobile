
export function getBossList(ws) {
  const bossName = this.state.translatedName;
  ws.onopen = () => {
    const msg = { followMessage: { bossNames: [ bossName ] } };
    ws.send(JSON.stringify(msg));
  };
  ws.onmessage = (e) => {
    const { raidTweetMessage } = JSON.parse(e.data);
    if(!raidTweetMessage) return;
    console.log({raidTweetMessage}, this.state.bosses);
    const newBossList = [].concat(this.state.bosses, (raidTweetMessage));
    this.setState({ bosses: newBossList });
  };
}
