import chalk from 'chalk';

const error = chalk.bold.red;
const success = chalk.bold.green;
const warning = chalk.bold.yellow;

const logger = {
  error: (err: string) => {
    console.log(error(err));
  },

  success: (msg: string) => {
    console.log(success(msg));
  },

  warning: (msg: string) => {
    console.log(warning(msg));
  },
};

export default logger;
