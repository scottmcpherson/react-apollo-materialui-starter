const fetch = require('node-fetch')

const user = {
  user: {
    id: 1,
    firstName: 'John',
    lastName: 'Doe'
  },
  find() {
    return this.user
  }
}

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

const resolvers = {
  Query: {
    user() {
      return user.find()
    },
    sportMatches(root, { sportName }) {
      console.log('sportName:: ', sportName)

      return sports.getMatches(sportName)
    },
    sports(root, { limit }) {
      return sports.findAll().slice(0, limit)
    }
  },
  Sport: {
    matches(sport) {
      console.log('sport!!', sport)
      return sports.getMatches(sport.name)
    }
  },
  Match: {
    sport(match) {
      console.log('match:: ', match)
      const { sport } = match
      return sports.getSport(sport.sport)
    }
  }
}

export default resolvers
