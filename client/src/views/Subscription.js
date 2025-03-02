import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

var stripe = window.Stripe('pk_test_EAXk2U8zR7fVlKNW9sUoACCl006fPFA1kk');


function Subscription(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Subscription © "}
      <Link color="inherit" href="https://material-ui.com/">
Teach.Leave.Live      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none"
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  toolbar: {
    flexWrap: "wrap"
  },
  toolbarTitle: {
    flexGrow: 1
  },
  link: {
    margin: theme.spacing(1, 1.5)
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6)
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700]
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(3),


  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6)
    }
  }
}));

const tiers = [
  {
    title: "Free",
    price: "0",
    description: [
      "Blog access",
      "Interact with other users on the blog",
      "Access to our social event calendar",
      "Limited access to free courses"
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
    disabled: true,
    onClick:  () => {
      //This is where you implement what happens when "Sign up for free" is clicked
    }
  },
  {
    title: "Premium",
    price: "19.99",
    description: [
      "Blog access",
      "Interact with other users on the blog",
      "Access to our social event calendar",
      "Unlimited access to free courses"
    ],
    buttonText: "Get Premium",
    buttonVariant: "contained",
    disabled: false,
    onClick:  () => {
      fetch('/stripe')
          .then(r => r.json())
          .then(d => {
              stripe.redirectToCheckout({
                  sessionId: d.id,
              }).then(function (result) {
                  console.log(result);
              })
          })

    }
  }
];
const footers = [
  {
    title: "",
    description: ["", "", "", ""]
  },
  {
    title: "",
    description: [

    ]

  }
];

export default function Pricing() {
  const classes = useStyles();
  console.log(tiers);
  return (
    <React.Fragment>
      <CssBaseline />
  
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >

        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="center">
          {tiers.map(tier => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={6}
              md={6}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Premium" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="textSecondary">
                      /yr
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map(line => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    disabled = {tier.disabled}
                    fullWidth
                    variant={tier.buttonVariant}
                    color="primary"
                    onClick={tier.onClick}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
