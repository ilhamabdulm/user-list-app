export const joinClassnames = (classes) => {
  return classes.filter(Boolean).join(" ");
};

export const copyToClipboard = (value) => {
  return navigator?.clipboard.writeText(value);
};

export const handleInfiniteScroll = (hasMore, callback) => {
  const scrollTop =
    (document.documentElement && document.documentElement.scrollTop) ||
    document.body.scrollTop;
  const scrollHeight =
    (document.documentElement && document.documentElement.scrollHeight) ||
    document.body.scrollHeight;
  const clientHeight = window.innerHeight;
  const scrolledToBottom =
    Math.ceil(scrollTop + clientHeight) >= scrollHeight - 60;

  if (scrolledToBottom && hasMore) {
    return callback();
  }
};

export const checkEmptyObjectValue = (object, name) => {
  return Object.keys(object).some(
    (key) =>
      !object[key] || object[key] === "undefined" || object[key]?.length === 0
  );
};
