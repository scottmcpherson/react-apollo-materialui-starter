import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import asyncValidate from './asyncValidate'
import { withStyles } from 'material-ui/styles'
import Card, { CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Typography from 'material-ui/Typography'
import { Link } from 'react-router-dom'

const styles = (theme, two) => {
  return {
    card: {
      marginTop: '100px',
      padding: '24px'
    },
    headline: {
      margin: theme.spacing.unit,
      textAlign: 'center'
    },
    button: {
      margin: theme.spacing.unit,
      marginLeft: 0,
      marginRight: 0,
      width: '100%'
    },
    input: {
      margin: theme.spacing.unit
    },
    link: {
      color: '#1976d2',
      textDecoration: 'none'
    }
  }
}

const validate = values => {
  const errors = {}
  const requiredFields = ['username', 'email', 'password']
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (
    values.email &&
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address'
  }
  return errors
}

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => (
  <TextField
    required
    fullWidth
    label={label}
    margin="normal"
    error={touched && !!error}
    {...input}
    {...custom}
  />
)

const Login = props => {
  const { handleSubmit, pristine, submitting, classes } = props
  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={4}>
        <Card className={classes.card}>
          <Typography
            type="headline"
            component="h2"
            className={classes.headline}
          >
            Forgot Password
          </Typography>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="email" component={renderTextField} label="Email" />
              </div>
              <div>
                <Button
                  raised
                  type="submit"
                  color="primary"
                  className={classes.button}
                  disabled={pristine || submitting}
                >
                  Submit
                </Button>

                <Link to="/login" className={classes.link}>
                  Cancel
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default reduxForm({
  form: 'ForgotPassword', // a unique identifier for this form
  validate,
  asyncValidate
})(withStyles(styles)(Login))
