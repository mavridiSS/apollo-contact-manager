import React, { ReactChild } from "react";
import { Grid } from "@material-ui/core";
import "./Layout.css";
import { NavLink } from "react-router-dom";
import "./Layout.css";

const Layout: React.FC<ReactChild> = props => {
  return (
    <React.Fragment>
      <header className="header">
        <Grid container justify="flex-start" direction="column">
          <Grid container justify="center">
            <h1>Contacts</h1>
          </Grid>
          <Grid container justify="flex-start" spacing={8}>
            <div className="nav-container">
              <NavLink to="/" className="navlink">
                Home
              </NavLink>
            </div>
          </Grid>
        </Grid>
      </header>
      <main>
        <Grid container justify="center">
          <Grid item xs={6}>
            {props.children}
          </Grid>
        </Grid>
      </main>
    </React.Fragment>
  );
};

export default Layout;
