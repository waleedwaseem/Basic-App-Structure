const axios = require("axios");
module.exports = {
  getUserCompany: (username) => {
    return axios.get(`https://api.github.com/users/${username}`);
  },
};
