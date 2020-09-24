/**
 * <Form />
 */

import React, { createRef } from "react";
import ReactDOM from "react-dom";
import { EventEmitter } from "fbemitter";
import FormValidator from "./form-validator";
import FormElements from "./form-elements";
//dont remove it..its used as legacy methods, like - _.keys
import { mapKeys, mapValues, groupBy, pickBy, identity, isEmpty } from "lodash";

const {
  Image,
  Checkboxes,
  Signature,
  Download,
  Camera,
  Thumbnail,
} = FormElements;

export default class ReactForm extends React.Component {
  form;

  inputs = {};

  answerData;

  constructor(props) {
    super(props);
    this.wrapper = createRef();
    this.answerData = this._convert(props.answer_data);
    this.emitter = new EventEmitter();
    //to keep a track of which thumbnail wrapper class is rendered
    this.state = {
      thumbnailWrapperElements: {},
    };
  }

  _convert(answers) {
    if (Array.isArray(answers)) {
      const result = {};
      answers.forEach((x) => {
        if (x.name.indexOf("tags_") > -1) {
          result[x.name] = x.value.map((y) => y.value);
        } else {
          result[x.name] = x.value;
        }
      });
      return result;
    }
    return answers;
  }

  _getDefaultValue(item) {
    return this.answerData[item.field_name];
  }

  getValues = (id, values) => {
    let stateCopy = Object.assign({}, { [id]: values });
    this.setState(stateCopy);
    if (typeof this.props.getStates === "function") {
      this.props.getStates(stateCopy);
    }
  };

  _optionsDefaultValue(item) {
    const defaultValue = this._getDefaultValue(item);
    if (defaultValue) {
      return defaultValue;
    }

    const defaultChecked = [];
    item.options.forEach((option) => {
      if (this.answerData[`option_${option.key}`]) {
        defaultChecked.push(option.key);
      }
    });
    return defaultChecked;
  }

  _getItemValue(item, ref) {
    let $item = {
      element: item.element,
      value: "",
    };
    if (item.element === "Rating") {
      $item.value = ref.inputField.current.state.rating;
    } else if (item.element === "Tags") {
      $item.value = ref.inputField.current.state.value;
    } else if (item.element === "DatePicker") {
      $item.value = ref.state.value;
    } else if (item.element === "Camera") {
      $item.value = ref.state.img
        ? ref.state.img.replace("data:image/png;base64,", "")
        : "";
    } else if (ref && ref.inputField) {
      $item = ReactDOM.findDOMNode(ref.inputField.current);
      if (typeof $item.value === "string") {
        $item.value = $item.value.trim();
      }
    }
    return $item;
  }

  _isIncorrect(item) {
    let incorrect = false;
    if (item.canHaveAnswer) {
      const ref = this.inputs[item.field_name];
      if (item.element === "Checkboxes" || item.element === "RadioButtons") {
        item.options.forEach((option) => {
          const $option = ReactDOM.findDOMNode(
            ref.options[`child_ref_${option.key}`]
          );
          if (
            (option.hasOwnProperty("correct") && !$option.checked) ||
            (!option.hasOwnProperty("correct") && $option.checked)
          ) {
            incorrect = true;
          }
        });
      } else {
        const $item = this._getItemValue(item, ref);
        if (item.element === "Rating") {
          if ($item.value.toString() !== item.correct) {
            incorrect = true;
          }
        } else if (
          $item.value.toLowerCase() !== item.correct.trim().toLowerCase()
        ) {
          incorrect = true;
        }
      }
    }
    return incorrect;
  }

  _isInvalid(item) {
    let invalid = false;
    if (item.required === true) {
      const ref = this.inputs[item.field_name];
      if (item.element === "Checkboxes" || item.element === "RadioButtons") {
        let checked_options = 0;
        item.options.forEach((option) => {
          const $option = ReactDOM.findDOMNode(
            ref.options[`child_ref_${option.key}`]
          );
          if ($option.checked) {
            checked_options += 1;
          }
        });
        if (checked_options < 1) {
          // errors.push(item.label + ' is required!');
          invalid = true;
        }
      } else {
        const $item = this._getItemValue(item, ref);
        if (item.element === "Rating") {
          if ($item.value === 0) {
            invalid = true;
          }
        } else if ($item.value === undefined || $item.value.length < 1) {
          invalid = true;
        }
      }
    }
    return invalid;
  }

  _collect(item) {
    const itemData = { name: item.field_name };
    const ref = this.inputs[item.field_name];
    if (item.element === "Checkboxes" || item.element === "RadioButtons") {
      const checked_options = [];
      item.options.forEach((option) => {
        const $option = ReactDOM.findDOMNode(
          ref.options[`child_ref_${option.key}`]
        );
        if ($option.checked) {
          checked_options.push(option.key);
        }
      });
      itemData.value = checked_options;
    } else {
      if (!ref) return null;
      itemData.value = this._getItemValue(item, ref).value;
    }
    return itemData;
  }

  _collectFormData(data) {
    const formData = [];
    data.forEach((item) => {
      const item_data = this._collect(item);
      if (item_data) {
        formData.push(item_data);
      }
    });
    return formData;
  }

  _getSignatureImg(item) {
    const ref = this.inputs[item.field_name];
    const $canvas_sig = ref.canvas.current;
    if ($canvas_sig) {
      const base64 = $canvas_sig
        .toDataURL()
        .replace("data:image/png;base64,", "");
      const isEmpty = $canvas_sig.isEmpty();
      const $input_sig = ReactDOM.findDOMNode(ref.inputField.current);
      if (isEmpty) {
        $input_sig.value = "";
      } else {
        $input_sig.value = base64;
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    let errors = [];
    if (!this.props.skip_validations) {
      errors = this.validateForm();
      // Publish errors, if any.
      this.emitter.emit("formValidation", errors);
    }

    // Only submit if there are no errors.
    if (errors.length < 1) {
      const { onSubmit } = this.props;
      if (onSubmit) {
        const data = this._collectFormData(this.props.data);
        onSubmit(data);
      } else {
        const $form = ReactDOM.findDOMNode(this.form);
        $form.submit();
      }
    }
  }

  validateForm() {
    const errors = [];
    let data_items = this.props.data;

    if (this.props.display_short) {
      data_items = this.props.data.filter((i) => i.alternateForm === true);
    }

    data_items.forEach((item) => {
      if (item.element === "Signature") {
        this._getSignatureImg(item);
      }

      if (this._isInvalid(item)) {
        errors.push(`${item.label} is required!`);
      }

      if (this.props.validateForCorrectness && this._isIncorrect(item)) {
        errors.push(`${item.label} was answered incorrectly!`);
      }
    });

    return errors;
  }

  getInputElement(item) {
    const Input = FormElements[item.element];
    return (
      <Input
        handleChange={this.handleChange}
        ref={(c) => (this.inputs[item.field_name] = c)}
        mutable={true}
        key={`form_${item.id}`}
        data={item}
        read_only={this.props.read_only}
        defaultValue={this._getDefaultValue(item)}
        getValues={this.getValues}
      />
    );
  }

  getSimpleElement(item) {
    const Element = FormElements[item.element];
    return <Element mutable={true} key={`form_${item.id}`} data={item} />;
  }

  //use like - console.log(this.groupBy(['one', 'two', 'three'], 'length'));
  groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  //this will stop rendering multiple thumbnails and will render their array once if found for first time
  setWrapperActive = (wrapper_name) => {
    this.setState({ [wrapper_name]: true });
  };

  renderThumbnailWrapper = (wrapper_name) => {
    // this.setWrapperActive(wrapper_name);
    // this.setState({ [wrapper_name]: true })
    return (
      <div className="test">
        {this.state.thumbnailWrapperElements[wrapper_name]}
      </div>
    );
  };

  getThumbnailsFromItems = (items) => {
    let path = "props.data.wrapper_name";
    //get all elements with key(wrapper_name) => item, without undefined keys(must have wrapper_name)
    const wrapperElements = _(items)
      .filter((item) => _.has(item, path))
      .groupBy(path)
      .value();

    const wrapperKeys = _.keys(wrapperElements);
    return wrapperElements;

    // if (!isEmpty(wrapperKeys) && wrapperElements) {
    //   //set wrappers
    //   this.setState({
    //     thumbnailWrapperElements: wrapperElements,
    //   });

    //   // //set states of all wrapper classes as true, unless called
    //   // this.wrapperKeys.map((key) => {
    //   //   this.setState({
    //   //     [key]: true,
    //   //   });
    //   // });
    // }
  };

  render() {
    let data_items = this.props.data;

    if (this.props.display_short) {
      data_items = this.props.data.filter((i) => i.alternateForm === true);
    }

    data_items.forEach((item) => {
      if (
        item &&
        item.readOnly &&
        item.variableKey &&
        this.props.variables[item.variableKey]
      ) {
        this.answerData[item.field_name] = this.props.variables[
          item.variableKey
        ];
      }
    });

    const items = data_items.map((item) => {
      if (!item) return null;
      switch (item.element) {
        case "TextInput":
        case "NumberInput":
        case "TextArea":
        case "Dropdown":
        case "DatePicker":
        case "RadioButtons":
        case "Rating":
        case "Tags":
        case "Range":
          return this.getInputElement(item);
        case "Signature":
          return (
            <Signature
              ref={(c) => (this.inputs[item.field_name] = c)}
              read_only={this.props.read_only || item.readOnly}
              mutable={true}
              key={`form_${item.id}`}
              data={item}
              defaultValue={this._getDefaultValue(item)}
            />
          );
        case "Checkboxes":
          return (
            <Checkboxes
              ref={(c) => (this.inputs[item.field_name] = c)}
              read_only={this.props.read_only}
              handleChange={this.handleChange}
              mutable={true}
              key={`form_${item.id}`}
              data={item}
              defaultValue={this._optionsDefaultValue(item)}
              getValues={this.getValues}
            />
          );
        case "Image":
          return (
            <Image
              ref={(c) => (this.inputs[item.field_name] = c)}
              handleChange={this.handleChange}
              mutable={true}
              key={`form_${item.id}`}
              data={item}
              defaultValue={this._getDefaultValue(item)}
              getValues={this.getValues}
            />
          );
        case "Download":
          return (
            <Download
              download_path={this.props.download_path}
              mutable={true}
              key={`form_${item.id}`}
              data={item}
            />
          );
        case "Camera":
          return (
            <Camera
              ref={(c) => (this.inputs[item.field_name] = c)}
              read_only={this.props.read_only || item.readOnly}
              mutable={true}
              key={`form_${item.id}`}
              data={item}
              defaultValue={this._getDefaultValue(item)}
              getValues={this.getValues}
            />
          );
        case "Thumbnail":
          return (
            <Thumbnail
              ref={(c) => (this.inputs[item.field_name] = c)}
              read_only={this.props.read_only || item.readOnly}
              mutable={true}
              key={`form_${item.id}`}
              data={item}
              defaultValue={this._getDefaultValue(item)}
              getValues={this.getValues}
            />
          );
        default:
          return this.getSimpleElement(item);
      }
    });

    // if (items) {
    //   this.getThumbnailsFromItems(items);
    // }
    const wrapper_path = "props.data.wrapper_name";
    const getWrappers = _(items)
      .filter((item) => _.has(item, wrapper_path))
      .groupBy(wrapper_path)
      .value();

    // console.log("==========>>>>>", _.uniqBy(items, "key"));
    // console.log("----all items---", getWrappers);

    const formTokenStyle = {
      display: "none",
    };

    const actionName = this.props.action_name
      ? this.props.action_name
      : "Submit";
    const backName = this.props.back_name ? this.props.back_name : "Cancel";

    var tempArray = [];

    return (
      <div>
        <FormValidator emitter={this.emitter} />
        <div className="react-form-builder-form">
          <form
            encType="multipart/form-data"
            ref={(c) => (this.form = c)}
            action={this.props.form_action}
            onSubmit={this.handleSubmit.bind(this)}
            method={this.props.form_method}
          >
            {this.props.authenticity_token && (
              <div style={formTokenStyle}>
                <input name="utf8" type="hidden" value="&#x2713;" />
                <input
                  name="authenticity_token"
                  type="hidden"
                  value={this.props.authenticity_token}
                />
                <input
                  name="task_id"
                  type="hidden"
                  value={this.props.task_id}
                />
              </div>
            )}
            {_.uniqBy(items, "key").map((item, index) => {
              if (item.props.data.element === "Thumbnail") {
                let dataCopy = item.props.data;
                if (
                  dataCopy.wrapper_name !== "" &&
                  dataCopy.wrapper_name !== undefined
                  // &&
                  // getWrappers[dataCopy.wrapper_name].length > 1
                ) {
                  tempArray.push(item);
                  if (
                    tempArray.length ==
                    getWrappers[dataCopy.wrapper_name].length
                  ) {
                    tempArray = [];
                    return (
                      <div
                        ref={this.wrapper}
                        className={`thumbnail-wrapper-container ${dataCopy.wrapper_name.toLowerCase()}`}
                        key={item.props.data.id}
                      >
                        {getWrappers[dataCopy.wrapper_name].map((item) => {
                          return (
                            <div
                              className="thumbnail-wrapper-item col-md-4"
                              key={item.props.data.id}
                            >
                              {item}
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                  // {
                  //   _.remove(items, { "props.data.id": item.id });
                  // }
                } else {
                  return item;
                }
              } else {
                return item;
              }
              // return (
              //   <div className="test" key={item.field_name}>
              //     <Thumbnail
              //       ref={(c) => (this.inputs[item.field_name] = c)}
              //       read_only={this.props.read_only || item.readOnly}
              //       mutable={true}
              //       key={`form_${item.id}`}
              //       data={item}
              //       defaultValue={this._getDefaultValue(item)}
              //       getValues={this.getValues}
              //     />
              //   </div>
              // );
            })}

            <br></br>
            <div className="btn-toolbar">
              {!this.props.hide_actions && (
                <input
                  type="submit"
                  className="btn btn-school btn-big"
                  value={actionName}
                />
              )}
              {!this.props.hide_actions && this.props.back_action && (
                <a
                  href={this.props.back_action}
                  className="btn btn-default btn-cancel btn-big"
                >
                  {backName}
                </a>
              )}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

ReactForm.defaultProps = { validateForCorrectness: false };
