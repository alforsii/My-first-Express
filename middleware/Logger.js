const moment = require('moment');
const logger = (req, res, next) => {
  // console.log(`${req.protocol}://${req.get('host')}${req.url}`);
  // console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
  //we can add date and time also by installing moment, lets bring it over
  console.log(
    `${req.protocol}://${req.get('host')}${
      req.originalUrl
    }: ${moment().format()}`
  );

  next();
};

module.exports = logger;
