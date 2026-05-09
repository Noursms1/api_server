const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "users.json");
const PAYMENTS_FILE = path.join(__dirname, "payments.json");

function read(file, fallback) {
  if (!fs.existsSync(file)) return fallback;
  return JSON.parse(fs.readFileSync(file));
}

function write(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

module.exports = {
  getUsers: () => read(USERS_FILE, []),
  saveUsers: (data) => write(USERS_FILE, data),

  getPayments: () => read(PAYMENTS_FILE, []),
  savePayments: (data) => write(PAYMENTS_FILE, data),
};
