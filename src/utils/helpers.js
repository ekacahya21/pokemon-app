export const toTitlecase = (str) =>
  str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });

export const normalize = (str) => str.replace(/[^\w\s]/gi, ' ');
