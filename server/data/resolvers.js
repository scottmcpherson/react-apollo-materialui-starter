const fetch = require('node-fetch')
const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = db.User

const sports = {
  sports: [
    { id: 1, name: 'football' },
    { id: 2, name: 'basketball' },
    { id: 3, name: 'baseball' }
  ],
  matches: [
    { id: 1, sport: 'football', homeTeam: 'Bucs', awayTeam: 'Falcons' },
    { id: 2, sport: 'basketball', homeTeam: 'Nics', awayTeam: 'Heat' },
    { id: 3, sport: 'baseball', homeTeam: 'Braves', awayTeam: 'Yankees' }
  ],
  findAll() {
    return this.sports
  },
  getMatches(sportName) {
    console.log('sportName:::: ', sportName)
    return this.matches.filter(match => match.sport === sportName)
  },
  getSport(sportName) {
    return this.sports.find(sport => sport.Name === sportName)
  }
}

const TEMP_USER = {
  id: '1',
  email: 'scott@test.com'
}

const resolvers = {
  Query: {
    user() {
      return user.find()
    },
    sportMatches(root, { sportName }) {
      return sports.getMatches(sportName)
    },
    sports(root, { limit }, context) {
      console.log('context:: ', context)
      return sports.findAll().slice(0, limit)
    }
  },
  Mutation: {
    login: async (root, { email, password }, { mongo }) => {
      const user = await User.findOne({ where: { email } })
      if (!user) {
        throw new Error('Email not found')
      }

      const validPassword = await bcrypt.compare('password', user.password)

      if (!validPassword) {
        throw new Error('Password is incorrect')
      }

      user.jwt = jwt.sign({ id: user.id }, 'SECRET')

      return user
    },
    signup: async (root, { email, password }, { mongo }) => {
      const existingUser = await User.findOne({ where: { email } })

      if (existingUser) {
        throw new Error('Email already used')
      }
      const hash = await bcrypt.hash(password, 10)

      const newUser = await User.create({
        email,
        password: hash
      })

      return newUser
    }
  },
  Sport: {
    matches(sport) {
      return sports.getMatches(sport.name)
    }
  },
  Match: {
    sport(match) {
      const { sport } = match
      return sports.getSport(sport.sport)
    }
  }
}

export default resolvers
