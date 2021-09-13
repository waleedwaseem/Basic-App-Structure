const axios = require("axios");
module.exports = {
  getUserCompany: async (username) => {
    return await axios.get(`https://api.github.com/users/${username}`);
  },
};
