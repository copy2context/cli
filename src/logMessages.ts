const chalk = require('chalk');

const error = chalk.bold.red;
const success = chalk.bold.green;
const warning = chalk.bold.orange;

const logger = {
  error: (msg: String) => {
    console.log(error(msg));
  },

  success: (msg: String) => {
    console.log(success(msg));
  },

  warning: (msg: String) => {
    console.log(warning(msg));
  },
};

export default logger;
