import database from '../../models/index';
const User = database.user;
const getAllUser = async (req, res, next) => {
    const users = await User.findAll();
    res.send(users);
}

const authRepository = {
    getAllUser
}

export default authRepository;


