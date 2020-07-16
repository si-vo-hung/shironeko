import React from "react";
import LuckyDraw from "react-luckydraw";
import "react-luckydraw/lib/LuckyDraw.css";

export default class LuckyDrawComponent extends React.Component {
  render() {
    const { candidates, handleFinished, drawLimit } = this.props;
    return (
      <LuckyDraw
        width={1200}
        height={700}
        wheelSize={1100}
        range={candidates.length}
        innerRadius={250}
        outerRadius={550}
        showInnerLabels
        drawLimitSwitch
        drawLimit={drawLimit}
        fontColor={"#000"}
        fontSize={"20px"}
        writingModel={"tb"}
        drawButtonLabel={"Lucky Draw!"}
        textArray={candidates}
        onSuccessDrawReturn={handleFinished}
        onOutLimitAlert={limit => {
          if (limit) {
            window.alert("Out of turns");
          }
        }}
        style={{
          margin: 'auto',
        }}
      />
    );
  }
}
