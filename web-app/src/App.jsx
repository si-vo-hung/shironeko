import React from "react";
import LuckyDrawComponent from "./LuckyDrawComponent";
import InputPopup from "./InputPopup";
import showCongratulation from "./Congratulation";
import ListCandidates from "./ListCandidates";

import "antd/dist/antd.css";
import "./App.scss";
import "./firework.scss";

export default class App extends React.Component {
  state = {
    luckyDrawTitle: "Lucky Draw",
    candidates: [],
    selectedCandidates: [],
    isConfigPopupOpen: true,
    isFiring: false,
    drawLimit: 100,
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      form.resetFields();
      const { luckyDrawTitle, candidates, drawLimit } = values;
      this.setState({
        luckyDrawTitle,
        candidates: candidates.split(","),
        isConfigPopupOpen: false,
        drawLimit: parseInt(drawLimit)
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  onStopFiring = (candidate) => {
    const candidates = this.state.candidates.filter(item => item !== candidate);
    this.setState({
      isFiring: false,
      candidates,
    });
  };

  onDrawingCompleted = candidateId => {
    const selectedCandidate = this.state.candidates[candidateId];
    const selectedCandidates = [...this.state.selectedCandidates, selectedCandidate];
    this.setState(
      {
        isFiring: true,
        selectedCandidates,
      },
      () =>
        showCongratulation(
          this.state.luckyDrawTitle,
          selectedCandidate,
          this.onStopFiring
        )
    );
  };

  render() {
    return (
      <div className="main-app">
        {this.state.isFiring && (
          <div className="pyro">
            <div className="before" />
            <div className="after" />
          </div>
        )}
        {this.state.isConfigPopupOpen && (
          <InputPopup
            wrappedComponentRef={this.saveFormRef}
            onCreate={this.handleCreate}
          />
        )}
        <h1 style={{ color: 'white' }}>{this.state.luckyDrawTitle}</h1>
        <LuckyDrawComponent
          candidates={this.state.candidates}
          handleFinished={this.onDrawingCompleted}
          drawLimit={this.state.drawLimit}
        />
        <ListCandidates selectedCandidates={this.state.selectedCandidates} />
      </div>
    );
  }
}
