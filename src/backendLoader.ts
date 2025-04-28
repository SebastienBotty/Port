export const pingNotMessenger = () => {
  const url = process.env.REACT_APP_NOT_MESSENGER_BACKEND_URL || "";
  const response = fetch(url);
  console.log("notMessenger pinged");
};
