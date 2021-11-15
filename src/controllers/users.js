const ApiError = require('../utils/ApiError');

const { User } = require('../database/models');
const UserSerializer = require('../serializers/UserSerializer');

const findUser = async (where) => {
  Object.assign(where, { active: true });

  const user = await User.findOne({ where });
  if (!user) {
    throw new ApiError('User not found', 400);
  }

  return user;
};

const createUser = async (req, res, next) => {
  try {
    const { body } = req;
    let myError = '';
    let myErrorCode = '';

    if (body.password !== body.passwordConfirmation) {
      myError = 'Passwords do not match';
      myErrorCode = 400;
    }
    if (!body.name || !body.username || !body.email || !body.password) {
      myError = 'Payload must contain name, username, email and password';
      myErrorCode = 400;
    }
    if (body.active === false) {
      myError = 'User not found';
      myErrorCode = 400;
    }

    if (myError !== '') {
      throw new ApiError(myError, myErrorCode);
    }

    const user = await User.create({
      username: body.username,
      email: body.email,
      name: body.name,
      password: body.password,
    });

    res.json(new UserSerializer(user));
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  let myError = '';
  let myErrorCode = '';

  try {
    const { body } = req;
    const { params } = req;
    const user = await findUser({ id: params.id });

    const keysFieldsUser = ['name', 'username', 'email'];
    const keysFieldsBody = Object.keys(body);

    keysFieldsBody.forEach((element) => {
      if (!keysFieldsUser.includes(element)) {
        myError = 'Payload can only contain username, email or name';
        myErrorCode = 400;
      }
    });

    if (!user || user.active === false) {
      myError = 'User not found';
      myErrorCode = 400;
    }

    if (myError !== '') {
      throw new ApiError(myError, myErrorCode);
    }

    Object.assign(user, body);

    await user.save();

    res.json(new UserSerializer(user));
  } catch (err) {
    next(err);
  }
};

const deactivateUser = async (req, res, next) => {
  let myError = '';
  let myErrorCode = '';

  try {
    const { params } = req;
    const user = await findUser({ id: params.id });

    if (!user || user.active === false) {
      myError = 'User not found';
      myErrorCode = 400;
      throw new ApiError(myError, myErrorCode);
    }

    Object.assign(user, { active: false });

    await user.save();
    res.json(new UserSerializer(null));
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { params } = req;
    let myError = '';
    let myErrorCode = '';

    const user = await findUser({ id: params.id });

    if (!user || user.active === false) {
      myError = 'User not found';
      myErrorCode = 400;
    }

    if (myError !== '') {
      throw new ApiError(myError, myErrorCode);
    }

    res.json(new UserSerializer(user));
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUserById,
  updateUser,
  deactivateUser,
};
