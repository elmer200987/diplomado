import {User} from '../models/user.js'
import {Task} from '../models/task.js'
import logger from '../logs/logger.js';
import { Status } from '../constants/index.js';
import { encriptar } from '../common/bcrypt.js';
import {Op} from 'sequelize'


async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: ['id', 'username', 'password', 'status'],
            order: [ ['id', 'DESC']],
            where: {
                status: Status.ACTIVE,
            },
        });
        res.json(users);
    } catch (error) {
        next(error);
    }
}

async function createUser(req, res) {
    console.log('Entro al controlador');
    const {username, password} = req.body;
    try {
        const  user = await User.create({
            username,
            password,
        })
        res.json(user)
    } catch (error) {
        next(error);
    }
}

async function getUser(req, res, next) {
    const {id} = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username', 'status'],
            where : {
                id: id
            }
        });
if(!user) res.status(404).json({message: 'user not found'});

        res.json(user);
    } catch (error) {
        next(error)
    }
}

async function updateUser(req, res, next) {
    const {id} = req.params;
    const {username, password} = req.body;
    try {
        if(!username && !password) {
            return req.status(400).json({message: 'Username or pass is required'});
        }

        const passEncriptado = await encriptar(password);

        const user = await User.update({
            username, 
            password: passEncriptado,
        }, {
            where: {
                id,
            },
        })
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function deleteUser(req, res, next) {
    const {id} = req.params;
    try {
        await User.destroy({
            where: {
                id,
            }
        });
        res.status(204).json({message: 'user deleted'});
    } catch (error) {
        next(error)
    }
}

async function activateInactivate(req, res, next) {
    const {id} = req.params;
    const {status} = req.body;
    try {
        if(!status)res.status(400).json({ message: 'status is required'});

        const user = await User.findByPk(id);

        if(!user) res.status(404).json({message: 'User not found'});

        if(user.status === status ) res.status(409).json({message: 'same status'});

        user.status = status;
        await user.save();
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function getTasks(req, res, next) {
    const { id } = req.params;
    try {
        const user = await User.findOne({
            attributes: ['username'],
            include: [
                {
                    model: Task,
                    attributes: ['name', 'done'],
                }
            ],
            where: {
                id
            }
        })
        res.json(user);
    } catch (error) {
        next(error);
    }
}

async function getPagination(req, res, next) {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const search = req.query.search || '';
  const orderBy = req.query.orderBy || 'username';
  const orderDir = req.query.orderDir === 'DESC' ? 'DESC' : 'ASC';

  try {
    const { count, rows } = await User.findAndCountAll({
      where: {
        [Op.or]: [
          { username: { [Op.like]: `%${search}%` } }
        ]
      },
      order: [[orderBy, orderDir]],
      limit,
      offset
    });

    res.json({
      total: count,
      page,
      totalPages: Math.ceil(count / limit),
      data: rows
    });
  } catch (error) {
    next(error);
  }
}


export default {
    getUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    activateInactivate,
    getTasks,
    getPagination
};