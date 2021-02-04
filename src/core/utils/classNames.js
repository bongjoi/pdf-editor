const classNames = (classes) => {
  const result = [];

  Object.keys(classes).forEach((cls) => {
    if (cls && classes[cls]) {
      result.push(cls);
    }
  });

  return result.join(' ');
};

export default classNames;
