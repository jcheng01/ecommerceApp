import jwt from "jsonwebtoken";

const jwtHandler = (user) => {
  const accessToken = jwt.sign(
    //once they are loggedin, we need jwt to have access for protected routes, gives id card and name
    {
      _id: user._id,
      name: user.name,
    },
    process.env.jwtKEY
  );
  return accessToken;
};

export default jwtHandler;
