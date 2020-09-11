import React from "react";
import PropTypes from "prop-types";

const PLACE_HOLDER = "form-place-holder";

export default class PlaceHolder extends React.Component {
  render() {
    return (
      this.props.show && (
        <div className={PLACE_HOLDER}>
          <div>{this.props.text}</div>
          <div style={{ color: "#bbb", paddingTop: "30px" }}>
            {this.props.subtext}
          </div>
        </div>
      )
    );
  }
}

PlaceHolder.propTypes = {
  text: PropTypes.string,
  show: PropTypes.bool,
};

PlaceHolder.defaultProps = {
  text: "Get Started",
  subtext: "Drag and Drop items here...",
  show: false,
};
