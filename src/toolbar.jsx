/**
 * <Toolbar />
 */

import React from "react";
import ToolbarItem from "./toolbar-draggable-item";
import ID from "./UUID";
const shortid = require("shortid");
import store from "./stores/store";

export default class Toolbar extends React.Component {
  constructor(props) {
    super(props);

    const items = this.props.items ? this.props.items : this._defaultItems();
    this.state = {
      items,
    };
    store.subscribe((state) => this.setState({ store: state }));
    this.create = this.create.bind(this);
  }

  static _defaultItemOptions(element) {
    switch (element) {
      case "Dropdown":
        return [
          {
            value: "option_1",
            text: "option 1",
            key: `dropdown_option_${shortid.generate()}`,
          },
          {
            value: "option_2",
            text: "option 2",
            key: `dropdown_option_${shortid.generate()}`,
          },
          {
            value: "option_3",
            text: "option 3",
            key: `dropdown_option_${shortid.generate()}`,
          },
        ];
      case "Tags":
        return [
          {
            value: "tag_1",
            text: "tag 1",
            key: `tags_option_${shortid.generate()}`,
          },
          {
            value: "tag_2",
            text: "tag 2",
            key: `tags_option_${shortid.generate()}`,
          },
          {
            value: "tag_3",
            text: "tag 3",
            key: `tags_option_${shortid.generate()}`,
          },
        ];
      case "Checkboxes":
        return [
          {
            value: "option_1",
            text: "option 1",
            key: `checkboxes_option_${shortid.generate()}`,
          },
          {
            value: "option_2",
            text: "option 2",
            key: `checkboxes_option_${shortid.generate()}`,
          },
          {
            value: "option_3",
            text: "option 3",
            key: `checkboxes_option_${shortid.generate()}`,
          },
        ];
      case "RadioButtons":
        return [
          {
            value: "option_1",
            text: "option 1",
            key: `radiobuttons_option_${shortid.generate()}`,
          },
          {
            value: "option_2",
            text: "option 2",
            key: `radiobuttons_option_${shortid.generate()}`,
          },
          {
            value: "option_3",
            text: "option 3",
            key: `radiobuttons_option_${shortid.generate()}`,
          },
        ];
      default:
        return [];
    }
  }

  _defaultItems() {
    return [
      {
        key: "Header",
        name: "Header Text",
        icon: "fas fa-heading",
        static: true,
        content: "Add Title Text",
      },
      {
        key: "Label",
        name: "Label",
        static: true,
        icon: "fas fa-font",
        content: "Edit Label",
      },
      {
        key: "Paragraph",
        name: "Paragraph",
        static: true,
        icon: "fas fa-paragraph",
        content: "Add Text",
      },
      {
        key: "LineBreak",
        name: "Line Break",
        static: true,
        icon: "fas fa-arrows-alt-h",
      },
      {
        key: "Dropdown",
        canHaveAnswer: true,
        name: "Dropdown",
        icon: "far fa-caret-square-down",
        label: "Edit Label",
        field_name: "dropdown_",
        options: [],
      },
      {
        key: "Tags",
        canHaveAnswer: true,
        name: "Tags",
        icon: "fas fa-tags",
        label: "Edit Label",
        field_name: "tags_",
        options: [],
      },
      {
        key: "Checkboxes",
        canHaveAnswer: true,
        name: "Checkboxes",
        icon: "far fa-check-square",
        label: "Edit Label",
        field_name: "checkboxes_",
        options: [],
      },
      {
        key: "RadioButtons",
        canHaveAnswer: true,
        name: "Multiple Choice",
        icon: "far fa-dot-circle",
        label: "Edit Label",
        field_name: "radiobuttons_",
        options: [],
      },
      {
        key: "TextInput",
        canHaveAnswer: true,
        name: "Text Input",
        label: "Edit Label",
        icon: "fas fa-font",
        field_name: "text_input_",
      },
      {
        key: "NumberInput",
        canHaveAnswer: true,
        name: "Number Input",
        label: "Edit Label",
        icon: "fas fa-plus",
        field_name: "number_input_",
      },
      {
        key: "TextArea",
        canHaveAnswer: true,
        name: "Multi-line Input",
        label: "Edit Label",
        icon: "fas fa-text-height",
        field_name: "text_area_",
      },
      {
        key: "Image",
        name: "Image",
        label: "",
        icon: "far fa-image",
        field_name: "image_",
        src: "",
      },
      {
        key: "Rating",
        canHaveAnswer: true,
        name: "Rating",
        label: "Edit Label",
        icon: "fas fa-star",
        field_name: "rating_",
      },
      {
        key: "DatePicker",
        canDefaultToday: true,
        canReadOnly: true,
        dateFormat: "MM/dd/yyyy",
        timeFormat: "hh:mm aa",
        showTimeSelect: false,
        showTimeSelectOnly: false,
        name: "Date",
        icon: "far fa-calendar-alt",
        label: "Edit Datepicker",
        field_name: "date_picker_",
      },
      {
        key: "Signature",
        canReadOnly: true,
        name: "Signature",
        icon: "fas fa-pen-square",
        label: "Add Signature",
        field_name: "signature_",
      },
      {
        key: "HyperLink",
        name: "Web site",
        icon: "fas fa-link",
        static: true,
        content: "Add a Website Link",
        href: "http://www.example.com",
      },
      {
        key: "Download",
        name: "File Attachment",
        icon: "fas fa-file",
        static: true,
        content: "Add Attachment Name",
        field_name: "download_",
        file_path: "",
        _href: "",
      },
      {
        key: "Range",
        name: "Range",
        icon: "fas fa-sliders-h",
        label: "Edit Label",
        field_name: "range_",
        step: 1,
        default_value: 3,
        min_value: 1,
        max_value: 5,
        min_label: "Minimum",
        max_label: "Maximum",
      },
      {
        key: "Camera",
        name: "Camera",
        icon: "fas fa-camera",
        label: "Edit Label",
        field_name: "camera_",
      },
    ];
  }

  create(item) {
    const elementOptions = {
      id: shortid.generate(),
      element: item.element || item.key,
      text: item.name,
      static: item.static,
      required: false,
      showDescription: item.showDescription,
    };

    if (this.props.showDescription === true && !item.static) {
      elementOptions.showDescription = true;
    }

    if (item.static) {
      elementOptions.bold = false;
      elementOptions.italic = false;
    }

    if (item.canHaveAnswer) {
      elementOptions.canHaveAnswer = item.canHaveAnswer;
    }

    if (item.canReadOnly) {
      elementOptions.readOnly = false;
    }

    if (item.canDefaultToday) {
      elementOptions.defaultToday = false;
    }

    if (item.content) {
      elementOptions.content = item.content;
    }

    if (item.href) {
      elementOptions.href = item.href;
    }

    elementOptions.canHavePageBreakBefore =
      item.canHavePageBreakBefore !== false;
    elementOptions.canHaveAlternateForm = item.canHaveAlternateForm !== false;
    elementOptions.canHaveDisplayHorizontal =
      item.canHaveDisplayHorizontal !== false;
    elementOptions.canHaveOptionCorrect = item.canHaveOptionCorrect !== false;
    elementOptions.canHaveOptionValue = item.canHaveOptionValue !== false;
    elementOptions.canPopulateFromApi = item.canPopulateFromApi !== false;

    if (item.key === "Image") {
      elementOptions.src = item.src;
    }

    if (item.key === "DatePicker") {
      elementOptions.dateFormat = item.dateFormat;
      elementOptions.timeFormat = item.timeFormat;
      elementOptions.showTimeSelect = item.showTimeSelect;
      elementOptions.showTimeSelectOnly = item.showTimeSelectOnly;
    }

    if (item.key === "Download") {
      elementOptions._href = item._href;
      elementOptions.file_path = item.file_path;
    }

    if (item.key === "Range") {
      elementOptions.step = item.step;
      elementOptions.default_value = item.default_value;
      elementOptions.min_value = item.min_value;
      elementOptions.max_value = item.max_value;
      elementOptions.min_label = item.min_label;
      elementOptions.max_label = item.max_label;
    }

    if (item.defaultValue) {
      elementOptions.defaultValue = item.defaultValue;
    }

    if (item.field_name) {
      elementOptions.field_name = item.field_name + shortid.generate();
    }

    if (item.label) {
      elementOptions.label = item.label;
    }

    if (item.options) {
      if (item.options.length > 0) {
        elementOptions.options = item.options;
      } else {
        elementOptions.options = Toolbar._defaultItemOptions(
          elementOptions.element
        );
      }
    }

    return elementOptions;
  }

  _onClick(item) {
    // ElementActions.createElement(this.create(item));
    store.dispatch("create", this.create(item));
  }

  render() {
    return (
      <div className="react-form-builder-toolbar float-right">
        <h4>Toolbox</h4>
        <ul>
          {this.state.items.map((item) => (
            <ToolbarItem
              data={item}
              key={item.key}
              onClick={this._onClick.bind(this, item)}
              onCreate={this.create}
            />
          ))}
        </ul>
      </div>
    );
  }
}
