import React, { Component } from "react";
import Confetti from "react-dom-confetti";
import TextLoop from "react-text-loop";
import { Button, Grid } from "tabler-react";

import "./App.css";
import DrawForm from "./components/DrawForm";
import PreviouslyDrawnItemsBlock from "./components/PreviouslyDrawnItemsBlock";
import SiteWrapper from "./SiteWrapper";
import "tabler-react/dist/Tabler.css";

const style = {
  drawForm: {
    paddingTop: "64px",
    paddingBottom: "64px",
    width: "100%",
  },
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      drawItems: [],
      currentItems: [],
      pastDrawnItems: [],
      result: "",
      showTextAnimation: true,
      removeDrawnItem: false,
      animationInterval: 150,
      showResult: false,
      disableDrawButton: false,
      value: "",
      placeholder: "Please enter the draw items here. One item per line.",
      valid: false,
      touched: false,
      validationRules: {
        minLength: 3,
        isRequired: true,
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSkipAnimationChange = this.handleSkipAnimationChange.bind(this);
    this.handleRemoveDrawnItemChange = this.handleRemoveDrawnItemChange.bind(
      this
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.drawItems.length > 2) {
      let formInputItems = this.state.drawItems;
      let itemList = formInputItems.split("\n");
      this.setState({
        ...this.state,
        items: itemList,
        currentItems: itemList,
      });
    }
  }

  handleChange(e) {
    console.log(e.name, e.value);
    this.setState({ [e.name]: e.value });
  }

  handleSkipAnimationChange = () => {
    this.setState({ showTextAnimation: !this.state.showTextAnimation });
  };

  handleRemoveDrawnItemChange = () => {
    this.setState({ removeDrawnItem: !this.state.removeDrawnItem });
  };

  sleep = time => {
    return new Promise(resolve => setTimeout(resolve, time));
  };

  randomDrawItem = () => {
    const { currentItems, showTextAnimation, removeDrawnItem } = this.state;
    this.setState({
      ...this.state,
      showResult: false,
      disableDrawButton: true,
    });

    let maxItemIndex = currentItems.length;
    const randomIndex = Math.floor(Math.random() * maxItemIndex);
    this.sleep(showTextAnimation ? 3000 : 0).then(() => {
      this.setState({
        ...this.state,
        result: currentItems[randomIndex],
        pastDrawnItems: [
          ...this.state.pastDrawnItems,
          currentItems[randomIndex],
        ],
        showResult: true,
        disableDrawButton: false,
      });
    });
    if (removeDrawnItem) {
      const copyCurrentItems = [...this.state.currentItems];
      copyCurrentItems.splice(randomIndex, 1);
      this.setState({
        currentItems: copyCurrentItems,
      });
    }
  };

  render() {
    const {
      items,
      drawItems,
      currentItems,
      result,
      disableDrawButton,
      pastDrawnItems,
      placeholder,
      showResult,
    } = this.state;
    return (
      <SiteWrapper>
        <div className="container" style={{ minHeight: "600px" }}>
          {items.length !== 0 && (
            <div className="draw-block">
              <Grid.Row>
                <Grid.Col md={3} xs={0} />
                <Grid.Col md={5} xs={12}>
                  <Confetti active={this.state.showResult} />
                  <div className="draw-section">
                    {!showResult &&
                    items && (
                      <TextLoop
                        interval={100}
                        springConfig={{ stiffness: 180, damping: 8 }}
                        children={items}
                      />
                    )}
                    {showResult && result}
                  </div>
                  <Button
                    name="drawButton"
                    color="primary"
                    onClick={this.randomDrawItem}
                    disabled={disableDrawButton || currentItems.length <= 1}
                  >
                    {disableDrawButton ? "Drawing..." : "Draw"}
                  </Button>
                </Grid.Col>
                <Grid.Col md={4} xs={12}>
                  <PreviouslyDrawnItemsBlock pastDrawnItems={pastDrawnItems} />
                </Grid.Col>
              </Grid.Row>
            </div>
          )}
          <Grid.Row>
            <Grid.Col xs={12} md={8}>
              <DrawForm
                drawItems={drawItems}
                onSubmit={this.handleSubmit}
                handleSkipAnimationChange={this.handleSkipAnimationChange}
                handleRemoveDrawnItemChange={this.handleRemoveDrawnItemChange}
                onChange={this.handleChange}
                placeholder={placeholder}
                style={style.drawForm}
              />
            </Grid.Col>
          </Grid.Row>
        </div>
      </SiteWrapper>
    );
  }
}

export default App;
