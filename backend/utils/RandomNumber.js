import crypto from "crypto";

const generateRequestNo = () => {
  // Create a random alphanumeric string of length 8
  const randomString = crypto.randomBytes(4).toString("hex").toUpperCase(); // Generates 8 characters (16-bit hex)

  // Optionally, you can append a timestamp or prefix
  const timestamp = Date.now().toString().slice(-6); // Last 6 digits of timestamp

  return `REQ-${timestamp}-${randomString}`;
};

export default generateRequestNo;
