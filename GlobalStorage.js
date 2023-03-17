class GlobalStore {
  data;

  constructor() {
    this.data = {};
  }

  addItem(key, item) {
    this.data[key] = item;
  }

  getItem(key) {
    return this.data[key];
  }
}

const store = new GlobalStore();
module.exports = store;
