import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");
                                                                                     
export const UserSpec = Joi.object()
  .keys({
    firstName: Joi.string().example("Homer").required(),
    lastName: Joi.string().example("Simpson").required(),
    email: Joi.string().email().example("homer@simpson.com").required(),
    password: Joi.string().example("secret").required(),
    _id: IdSpec,
    __v: Joi.number(),
  })
  .label("UserDetails");

export const UserArray = Joi.array().items(UserSpec).label("UserArray");

export const UserCredentialsSpec = {
  email: Joi.string().email().required(),
  password: Joi.string().required(),
};

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
      ).example("Woodland/Forest").required(),

    format: Joi.string().example("Loop").required(),
    difficulty: Joi.string().example("Easy").required(),
    location: Joi.string().example("Sligo").required(),

    latitude: Joi.number().example(54.25).required(),
    longitude: Joi.number().example(-8.59).required(),
    distance: Joi.number().min(0).example(5.5).required(),
    duration: Joi.number().min(0).example(90).required(),

    _id: IdSpec,
    userid: IdSpec,
    __v: Joi.number(),
  })
  .label("TrailDetails");

export const TrailArray = Joi.array().items(TrailSpec).label("TrailArray");