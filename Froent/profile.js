import React, { useState, useEffect } from "react";
import axios from "axios";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Form from "react-bootstrap/Form";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
 
  rootcard: {
    marginTop: "100px",
  },
  root: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  inputRoot: {
    color: "inherit",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
    marginLeft: theme.spacing(140),
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

let datasetvalue = localStorage.getItem("loginJPID");

const Profile = () => {
  const [formData, setFormData] = useState([]);
  const [description, setdescription] = useState("");
  const [company_size, setcompany_size] = useState("");
  const [company_type, setcompany_type] = useState("");
  const [company_domain, setcompany_domain] = useState("");

  //const res = axios.get("routes/api/email?email=" + email);
  const fetchData = () => {
    axios.get("/api/v1/company?_id=" + datasetvalue).then((response) => {
      console.log(response.data.data);
      setFormData(response.data.data);
      setdescription(response.data.data[0].description);
      setcompany_size(response.data.data[0].company_size);
      setcompany_type(response.data.data[0].company_type);
      setcompany_domain(response.data.data[0].company_domain);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    const updateCompany = {
      description,
      company_size,
      company_type,
      company_domain,
    };

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(updateCompany);
      const res = await axios.put(
        "/api/v1/company/" + datasetvalue,
        body,
        config
      );
      console.log(res.data.data);
      window.location = "/dashboard/job_provider/profile";
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    window.location = "/dashboard/job_provider/profile";
    setAnchorEl(null);
  };

  const handleDashboard = () => {
    window.location = "/dashboard/job_provider";
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("loginJPID");
    window.location = "/";
  };

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Follow Your Vocation
          </Typography>
          <div className={classes.sectionDesktop}>
            <NotificationsIcon />
          </div>
          <div>
            <Button onClick={handleClick}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                style={{ color: "white" }}
              >
                <AccountCircle />
              </IconButton>
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleDashboard}>Dashboard</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>

      {/* CARD START */}
      {/* console.log(response.data.data); */}
      {formData.map((data) => (
        <Container>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card className={classes.rootcard} variant="outlined">
                  <CardContent>
                    <Typography variant="h4" color="textSecondary" gutterBottom>
                      {data.company_name}
                    </Typography>
                    <Typography variant="subtitle1" component="h2">
                      {data.description}
                    </Typography>
                    <Typography variant="overline" component="h2">
                      {data.website}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                      Company Headquarters & Location
                    </Typography>
                    <Typography variant="overline" component="h2">
                      {data.headquarters}
                    </Typography>
                    <Typography variant="overline" component="h2">
                      {data.company_location}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" color="textSecondary" gutterBottom>
                      Company Domain & Size
                    </Typography>
                    <Typography variant="overline" component="h2">
                      {data.company_domain}
                    </Typography>
                    <Typography variant="overline" component="h2">
                      {data.company_size}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </div>
        </Container>
      ))}
      {/* CARD ENDS */}

      {/* ROW STARTS */}

      <Form onSubmit={(e) => onSubmit(e)}>
        <Container>
          <div className={classes.root}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  label="Company Description"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  label="Company Size"
                  type="number"
                  value={company_size}
                  onChange={(e) => setcompany_size(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  label="Company Type"
                  value={company_type}
                  onChange={(e) => setcompany_type(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="filled"
                  fullWidth
                  label="Company Domain"
                  value={company_domain}
                  onChange={(e) => setcompany_domain(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: "10px" }}
            >
              UPDATE
            </Button>
          </div>
        </Container>
      </Form>

      {/* ROW ENDS */}
      
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main>
    </div>
  );
};
export default Profile;
