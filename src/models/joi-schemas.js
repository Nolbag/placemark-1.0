import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
  .keys({
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
  })
  .label("UserCredentials");

export const UserSpec = UserCredentialsSpec.keys({
  firstName: Joi.string().example("Homer").required(),
  lastName: Joi.string().example("Simpson").required(),
}).label("UserDetails");

export const UserSpecPlus = UserSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");

export const TrailSpec = Joi.object()
  .keys({
    name: Joi.string().example("Warren Way").required(),

    category: Joi.string()
      .valid(
        "Woodland/Forest",
        "Hill/Mountain",
        "Lakeside/Riverside",
        "Bog/Moorland",
        "Countryside/Farmland",
        "Urban/Park",
        "Mixed/Other",
      )
      .example("Woodland/Forest")
      .required(),

    format: Joi.string().example("Loop").required(),
    difficulty: Joi.string().example("Easy").required(),
    location: Joi.string().example("Sligo").required(),

    latitude: Joi.number().example(54.25).required(),
    longitude: Joi.number().example(-8.59).required(),
    distance: Joi.number().min(0).example(5.5).required(),
    duration: Joi.number().min(0).example(90).required(),

    userid: IdSpec,
  })
  .label("Trail");

export const TrailSpecPlus = TrailSpec.keys({
  _id: IdSpec,
  __v: Joi.number(),
}).label("TrailPlus");

export const TrailArraySpec = Joi.array().items(TrailSpecPlus).label("TrailArray");

export const JwtAuth = Joi.object()
  .keys({
    success: Joi.boolean().example(true).required(),
    token: Joi.string().required(),
  })
  .label("JwtAuth");