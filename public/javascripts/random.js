module.exports = {
  getRandomNumber(Number) {
    const possible = "abcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";

    for (let i = 0; i < Number; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
};
