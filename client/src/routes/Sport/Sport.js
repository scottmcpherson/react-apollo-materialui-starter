import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Typography from 'material-ui/Typography'
import Grid from 'material-ui/Grid'
const Fragment = React.Fragment

const styles = theme => ({
  card: {
    display: 'flex'
  },
  details: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column'
  },
  content: {
    flexGrow: 1
  },
  cover: {
    width: 151,
    height: 151
  },
  headLine: {
    fontSize: '16px',
    marginTop: '8px',
    marginBottom: '16px'
  }
})

const SportCardContent = ({ sportMatch, classes, theme }) => {
  return (
    <Fragment>
      <Card className={classes.card}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={4}>
                <Typography type="subheading" color="secondary" />
                <Typography type="title" className={classes.headLine}>
                  {sportMatch.homeTeam}
                </Typography>
                <Typography type="title" className={classes.headLine}>
                  {sportMatch.awayTeam}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </div>
      </Card>
    </Fragment>
  )
}

SportCardContent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

const SportCard = withStyles(styles, { withTheme: true })(SportCardContent)

const SportCardContainer = ({ sportMatches }) => (
  <Fragment>
    {sportMatches.map(match => {
      return <SportCard key={match.id} sportMatch={match} />
    })}
  </Fragment>
)

const sportStyles = theme => ({
  header: {
    textTransform: 'capitalize'
  }
})
const Sport = ({
  data: { sportMatches },
  match: { params: { sportName } }
}) => {
  return (
    <div>
      <Typography type="display1" gutterBottom>
        {sportName}
      </Typography>

      <SportCardContainer sportMatches={sportMatches} />
    </div>
  )
}

export default withStyles(sportStyles, { withTheme: true })(Sport)
