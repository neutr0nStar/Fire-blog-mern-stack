/*
Main entry point for app containing routes
*/
import React from "react";
import { CssBaseline } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CreateBlog from "./components/CreateBlog";
import Footer from "./components/Footer";
import ViewBlog from "./components/ViewBlog";
import EditBlog from "./components/EditBlog";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <nav>
          <Navbar />
        </nav>
        <Switch>
          {/* Homepage */}
          <Route exact path="/" component={Home} />
          {/* New blog */}
          <Route path="/create" component={CreateBlog} />
          {/* Show the contents of blog */}
          <Route path="/blog/:id" component={ViewBlog} />
          {/* Edit the blog */}
          <Route path="/edit/:id" component={EditBlog} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
