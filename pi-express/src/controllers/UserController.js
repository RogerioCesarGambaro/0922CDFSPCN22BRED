const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')

const users = require('../database/users.json')

const UserController = {
  // Create form user - View
  createFormEJS: (req, res) => {
    res.render('user-create-form')
  },
  // Create user
  createEJS: (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        res.render('user-create-form', { errors: errors.mapped() }) // ou array()

    const user = users.find(user => user.email === req.body.email) // encontra o usuário através do e-mail - e retorna o objeto

    if (!user) {
        let newUser = {
          id: users.length > 0 ? Number(users[users.length - 1].id) + 1 : 1,
          ...req.body
        }
        // delete newUser.pwdConfirm // remove propriedade pwdConfirm - porque não é necessário gravar no banco

        const hash = bcrypt.hashSync(newUser.pwd, 10) // gera o hash da senha
        newUser.pwd = hash // salva na propriedade senha

        users.push(newUser)
        
        res.redirect('/')
    } else res.render('user-create-form', { errors: [{ msg: "Usuário já cadastrado!" }] })
  },
  // Login form user - View
  loginFormEJS: (req, res) => {
    res.render('login')
  },
  // Login
  loginEJS: (req, res) => {
  }
}
module.exports = UserController