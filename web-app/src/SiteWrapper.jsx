// @flow

import * as React from "react";
import { Site, Nav, Grid, List, Button } from "tabler-react";

const navBarItems = [
  {
    value: "Home",
    to: "/",
    icon: "home",
    useExact: true
  },
  {
    value: "Lucky Draw",
    icon: "box",
    to: "/"
  }
];

class SiteWrapper extends React.Component {
  render() {
    return (
      <Site.Wrapper
        headerProps={{
          href: "/",
          alt: "Random Draw",
          imageURL: "images/shibazono.png",
          headerStyle: {
            padding: '0 !important',
          },
          navItems: (
            <Nav.Item type="div" className="d-none d-md-flex">
              <Button
                href=""
                target="_blank"
                outline
                size="sm"
                RootComponent="a"
                color="primary"
              >
                Register
              </Button>
            </Nav.Item>
          )
        }}
        navProps={{ itemsObjects: navBarItems }}
        footerProps={{
          links: [],
          note: "Finding the winners.",
          copyright: (
            <React.Fragment>
              Copyright © 2019
              <a href="/"> Random Draw</a>. Powered by
              <a
                href=""
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Jasys Technologies
              </a>{" "}
              All rights reserved.
            </React.Fragment>
          ),
          nav: (
            <React.Fragment>
              <Grid.Col auto={true}>
                <List className="list-inline list-inline-dots mb-0">
                  <List.Item className="list-inline-item">
                    <a href="./docs/index.html">Documentation</a>
                  </List.Item>
                  <List.Item className="list-inline-item">
                    <a href="./faq.html">FAQ</a>
                  </List.Item>
                </List>
              </Grid.Col>
              <Grid.Col auto={true}>
              </Grid.Col>
            </React.Fragment>
          )
        }}
      >
        {this.props.children}
      </Site.Wrapper>
    );
  }
}

export default SiteWrapper;
