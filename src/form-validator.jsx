/**
 * <FormValidator />
 */

import React from "react";
import xss from "xss";

const myxss = new xss.FilterXSS({
  whiteList: {
    u: [],
    br: [],
    b: [],
    i: [],
    ol: ["style"],
    ul: ["style"],
    li: [],
    p: ["style"],
    sub: [],
    sup: [],
    div: ["style"],
    em: [],
    strong: [],
    span: ["style"],
  },
});

export default class FormValidator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
    };
  }

  componentWillMount() {
    this.subscription = this.props.emitter.addListener(
      "formValidation",
      (errors) => {
        this.setState({ errors });
      }
    );
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  dismissModal(e) {
    e.preventDefault();
    this.setState({ errors: [] });
  }

  render() {
    //remove html tags..p tag
    const regex = /(<([^>]+)>)/gi;
    const errors = this.state.errors.map((error, index) => {
      let updatedError = error.replace(regex, "");
      return (
        <li
          key={`error_${index}`}
          dangerouslySetInnerHTML={{ __html: myxss.process(updatedError) }}
        />
      );
    });

    return (
      <div>
        {this.state.errors.length > 0 && (
          <div className="alert alert-danger validation-error">
            <div className="clearfix">
              <i className="fas fa-exclamation-triangle float-left"></i>
              <ul className="float-left">{errors}</ul>
            </div>
            <div className="clearfix">
              <a
                className="float-right btn btn-default btn-sm btn-danger"
                onClick={this.dismissModal.bind(this)}
              >
                Dismiss
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}
