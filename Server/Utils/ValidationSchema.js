import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const signUpBodyValidator = (body) => {
  const schema = Joi.object({
    username: Joi.string().required().label("User Name"),
    email: Joi.string().required().email().label("Email"),
    password: passwordComplexity().required().label("Password"),
  });
  return schema.validate(body);
};

const loginBodyValidator = (body) => {
  const schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(body);
};

const refreshTokenBodyValidator = (body) => {
  const schema = Joi.object({
    token: Joi.string().required().label("refresh token"),
  });
  return schema.validate(body);
};

export { signUpBodyValidator, loginBodyValidator, refreshTokenBodyValidator };
