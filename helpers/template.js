module.exports = {
  evalTemplate(s, params) {
    return Function(...Object.keys(params), "return " + s)
      (...Object.values(params));
  }
}

