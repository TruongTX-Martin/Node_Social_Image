import database from '../../models/index';
const User = database.users;

const signIn = async (req, res, next) => {
}

const userRepository = {
    signIn,
}

export default userRepository;


