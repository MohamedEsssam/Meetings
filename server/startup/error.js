module.exports = {
  set: (name, httpCode, description, timeStamp = new Date()) => {
    return {
      name: name,
      httpCode: httpCode,
      description: description,
      timeStamp: timeStamp,
    };
  },
};
