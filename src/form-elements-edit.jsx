import React from "react";
import TextAreaAutosize from "react-textarea-autosize";
import {
  ContentState,
  EditorState,
  convertFromHTML,
  convertToRaw,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import DynamicOptionList from "./dynamic-option-list";
import { get } from "./stores/requests";
import ID from "./UUID";
const shortid = require("shortid");
import Switch from "react-switch";

const toolbar = {
  options: [
    "inline",
    "blockType",
    "fontSize",
    "fontFamily",
    "list",
    "textAlign",
    "colorPicker",
    "link",
    // "embedded",
    "emoji",
    // "image",
    // "remove",
    "history",
  ],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript",
    ],
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  fontFamily: {
    options: [
      "Arial",
      "Georgia",
      "Impact",
      "Tahoma",
      "Times New Roman",
      "Verdana",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered", "indent", "outdent"],
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["left", "center", "right", "justify"],
  },
  colorPicker: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(71,85,119)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)",
    ],
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link", "unlink"],
    linkCallback: undefined,
  },
  emoji: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      "😀",
      "😁",
      "😂",
      "😃",
      "😉",
      "😋",
      "😎",
      "😍",
      "😗",
      "🤗",
      "🤔",
      "😣",
      "😫",
      "😴",
      "😌",
      "🤓",
      "😛",
      "😜",
      "😠",
      "😇",
      "😷",
      "😈",
      "👻",
      "😺",
      "😸",
      "😹",
      "😻",
      "😼",
      "😽",
      "🙀",
      "🙈",
      "🙉",
      "🙊",
      "👼",
      "👮",
      "🕵",
      "💂",
      "👳",
      "🎅",
      "👸",
      "👰",
      "👲",
      "🙍",
      "🙇",
      "🚶",
      "🏃",
      "💃",
      "⛷",
      "🏂",
      "🏌",
      "🏄",
      "🚣",
      "🏊",
      "⛹",
      "🏋",
      "🚴",
      "👫",
      "💪",
      "👈",
      "👉",
      "👉",
      "👆",
      "🖕",
      "👇",
      "🖖",
      "🤘",
      "🖐",
      "👌",
      "👍",
      "👎",
      "✊",
      "👊",
      "👏",
      "🙌",
      "🙏",
      "🐵",
      "🐶",
      "🐇",
      "🐥",
      "🐸",
      "🐌",
      "🐛",
      "🐜",
      "🐝",
      "🍉",
      "🍄",
      "🍔",
      "🍤",
      "🍨",
      "🍪",
      "🎂",
      "🍰",
      "🍾",
      "🍷",
      "🍸",
      "🍺",
      "🌍",
      "🚑",
      "⏰",
      "🌙",
      "🌝",
      "🌞",
      "⭐",
      "🌟",
      "🌠",
      "🌨",
      "🌩",
      "⛄",
      "🔥",
      "🎄",
      "🎈",
      "🎉",
      "🎊",
      "🎁",
      "🎗",
      "🏀",
      "🏈",
      "🎲",
      "🔇",
      "🔈",
      "📣",
      "🔔",
      "🎵",
      "🎷",
      "💰",
      "🖊",
      "📅",
      "✅",
      "❎",
      "💯",
    ],
  },
  // embedded: {
  //   className: undefined,
  //   component: undefined,
  //   popupClassName: undefined,
  //   embedCallback: undefined,
  //   defaultSize: {
  //     height: "auto",
  //     width: "auto",
  //   },
  // },
  // image: {
  //   className: undefined,
  //   component: undefined,
  //   popupClassName: undefined,
  //   urlEnabled: true,
  //   uploadEnabled: true,
  //   alignmentEnabled: true,
  //   uploadCallback: undefined,
  //   previewImage: false,
  //   inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
  //   alt: { present: false, mandatory: false },
  //   defaultSize: {
  //     height: "auto",
  //     width: "auto",
  //   },
  // },
  // remove: { className: undefined, component: undefined },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["undo", "redo"],
  },
};

export default class FormElementsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      element: this.props.element,
      data: this.props.data,
      dirty: false,
      img: null,
      toggleChecked: false,
      existingThumbnailImageUrl: "",
      imgThumbnailUrl: "",
      //for element Image
      imgForImageElement: "",
    };
  }

  toggleRequired() {
    // const this_element = this.state.element;
  }

  componentDidMount() {
    if (this.props.element.src && this.props.element.element == "Thumbnail") {
      let existingSrc = this.props.element.src;
      this.setState({
        imgThumbnailUrl: existingSrc,
      });
    }
    if (this.props.element.src && this.props.element.element == "Image") {
      let existingSrc = this.props.element.src;
      this.setState({
        imgForImageElement: existingSrc,
      });
    }
  }

  handleToggleChange = () => {
    let currentState = this.state.toggleChecked;

    if (document.getElementById("input_thumbnail_url") !== null) {
      const tempImgUrl = document.getElementById("input_thumbnail_url").value;
      const existingUrl = this.state.existingThumbnailImageUrl;
      if (tempImgUrl !== existingUrl) {
        this.setState({
          existingThumbnailImageUrl: tempImgUrl,
        });
      }
    }
    this.setState({
      toggleChecked: !currentState,
    });
  };

  editElementProp(elemProperty, targProperty, e) {
    // elemProperty could be content or label
    // targProperty could be value or checked
    const this_element = this.state.element;
    this_element[elemProperty] = e.target[targProperty];
    // console.log("===what====", elemProperty, targProperty);
    // console.log(this_element);
    // console.log(this_element[elemProperty]);
    //update the image preview too
    //for THUMBNAIL ELEMENT
    if (e.target.id === "input_thumbnail_url") {
      this.setState({
        imgThumbnailUrl: e.target[targProperty],
      });
    }
    //for IMAGE element
    if (e.target.id === "srcInput") {
      this.setState({
        imgForImageElement: e.target[targProperty],
      });
    }

    this.setState(
      {
        element: this_element,
        dirty: true,
      },
      () => {
        if (targProperty === "checked") {
          this.updateElement();
        }
      }
    );
  }

  onEditorStateChange(index, property, editorContent) {
    const html = draftToHtml(convertToRaw(editorContent.getCurrentContent()));
    // .replace(/<p>/g, "")
    // .replace(/<\/p>/g, "")
    // .replace(/(?:\r\n|\r|\n)/g, " ");
    const this_element = this.state.element;
    this_element[property] = html;

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  updateElement() {
    const this_element = this.state.element;
    // to prevent ajax calls with no change
    if (this.state.dirty) {
      this.props.updateElement.call(this.props.preview, this_element);
      this.setState({ dirty: false });
    }
  }

  convertFromHTML(content) {
    const newContent = convertFromHTML(content);
    if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
      // to prevent crash when no contents in editor
      return EditorState.createEmpty();
    }
    const contentState = ContentState.createFromBlockArray(newContent);
    return EditorState.createWithContent(contentState);
  }

  addOptions() {
    const optionsApiUrl = document.getElementById("optionsApiUrl").value;
    if (optionsApiUrl) {
      get(optionsApiUrl).then((data) => {
        this.props.element.options = [];
        const { options } = this.props.element;
        data.forEach((x) => {
          // eslint-disable-next-line no-param-reassign
          x.key = shortid.generate();
          options.push(x);
        });
        const this_element = this.state.element;
        this.setState({
          element: this_element,
          dirty: true,
        });
      });
    }
  }

  clearInputThumbnailUrlImage = () => {
    if (document.getElementById("input_thumbnail_url") !== null) {
      document.getElementById("input_thumbnail_url").value = null;
      this.setState({ imgThumbnailUrl: "" });
    }
  };

  validateThumbnailImageSize(file, limitSize = 1) {
    let fileSize = file.size / 1024 / 1024; // in MB
    if (fileSize > limitSize) {
      alert("File size exceeds 1 MB");
      return false;
    } else {
      return true;
    }
  }

  displayThumbnailImage = (e) => {
    // const self = this;
    const target = e.target;
    let file;
    let reader;

    if (
      target.files &&
      target.files.length &&
      this.validateThumbnailImageSize(target.files[0])
    ) {
      file = target.files[0];
      // eslint-disable-next-line no-undef
      reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        this.setState(
          {
            img: reader.result,
          },
          function () {
            const this_element = this.state.element;
            this_element["src"] = this.state.img; //e.target["value"];
            // console.log("==========", file);
            // console.log("uploaded");
            this.setState(
              {
                element: this_element,
                dirty: true,
                existingThumbnailImageUrl: "",
              },
              () => {
                this.updateElement();
                console.log("element updated");
              }
            );
          }
        );
      };
    }
  };

  clearThumbnailImage = () => {
    this.setState({
      img: null,
    });
  };

  render() {
    if (this.state.dirty) {
      this.props.element.dirty = true;
    }

    const this_checked = this.props.element.hasOwnProperty("required")
      ? this.props.element.required
      : false;
    const this_read_only = this.props.element.hasOwnProperty("readOnly")
      ? this.props.element.readOnly
      : false;
    const this_default_today = this.props.element.hasOwnProperty("defaultToday")
      ? this.props.element.defaultToday
      : false;
    const this_show_time_select = this.props.element.hasOwnProperty(
      "showTimeSelect"
    )
      ? this.props.element.showTimeSelect
      : false;
    const this_show_time_select_only = this.props.element.hasOwnProperty(
      "showTimeSelectOnly"
    )
      ? this.props.element.showTimeSelectOnly
      : false;
    const this_checked_inline = this.props.element.hasOwnProperty("inline")
      ? this.props.element.inline
      : false;
    const this_checked_bold = this.props.element.hasOwnProperty("bold")
      ? this.props.element.bold
      : false;
    const this_checked_italic = this.props.element.hasOwnProperty("italic")
      ? this.props.element.italic
      : false;
    const this_checked_center = this.props.element.hasOwnProperty("center")
      ? this.props.element.center
      : false;
    const this_checked_page_break = this.props.element.hasOwnProperty(
      "pageBreakBefore"
    )
      ? this.props.element.pageBreakBefore
      : false;
    const this_checked_alternate_form = this.props.element.hasOwnProperty(
      "alternateForm"
    )
      ? this.props.element.alternateForm
      : false;

    const {
      canHavePageBreakBefore,
      canHaveAlternateForm,
      canHaveDisplayHorizontal,
      canHaveOptionCorrect,
      canHaveOptionValue,
    } = this.props.element;

    let temp_file_data = { id: 1, file_name: "Just a Test file" };
    const this_files = this.props.files.length
      ? this.props.files
      : [temp_file_data];
    if (
      this_files.length < 1 ||
      (this_files.length > 0 && this_files[0].id !== "")
    ) {
      this_files.unshift({ id: "", file_name: "" });
    }

    let editorState;
    if (this.props.element.hasOwnProperty("content")) {
      editorState = this.convertFromHTML(this.props.element.content);
    }
    if (this.props.element.hasOwnProperty("label")) {
      editorState = this.convertFromHTML(this.props.element.label);
    }

    return (
      <div className="edit-container">
        <div className="header-container">
          <div className="clearfix">
            <h4 className="float-left">{this.props.element.text}</h4>
            <i
              className="float-right fas fa-times dismiss-edit"
              onClick={this.props.manualEditModeOff}
            ></i>
          </div>
        </div>
        <div className="body-container">
          {this.props.element.hasOwnProperty("content") && (
            <div className="form-group">
              <label className="control-label control-edit">
                Text to display:
              </label>
              <Editor
                toolbar={toolbar}
                defaultEditorState={editorState}
                onBlur={this.updateElement.bind(this)}
                onEditorStateChange={this.onEditorStateChange.bind(
                  this,
                  0,
                  "content"
                )}
                stripPastedStyles={true}
              />
            </div>
          )}
          {this.props.element.hasOwnProperty("file_path") && (
            <div className="form-group">
              <label
                className="control-label control-edit"
                htmlFor="fileSelect"
              >
                Choose file:
              </label>
              <select
                id="fileSelect"
                className="form-control"
                defaultValue={this.props.element.file_path}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, "file_path", "value")}
              >
                {this_files.map((file) => {
                  const this_key = `file_${file.id}`;
                  return (
                    <option value={file.id} key={this_key}>
                      {file.file_name}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
          {this.props.element.hasOwnProperty("href") && (
            <div className="form-group">
              <TextAreaAutosize
                type="text"
                className="form-control"
                defaultValue={this.props.element.href}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(this, "href", "value")}
              />
            </div>
          )}
          {this.props.element.hasOwnProperty("src") &&
            this.state.element.element !== "Thumbnail" && (
              <div>
                <div className="form-group">
                  <label
                    className="control-label control-edit"
                    htmlFor="srcInput"
                  >
                    Link to:
                  </label>
                  <input
                    id="srcInput"
                    type="text"
                    className="form-control"
                    defaultValue={this.props.element.src}
                    onBlur={this.updateElement.bind(this)}
                    onChange={this.editElementProp.bind(this, "src", "value")}
                  />
                </div>
                <div className="form-group">
                  <div className="custom-control custom-checkbox">
                    <input
                      id="do-center"
                      className="custom-control-input"
                      type="checkbox"
                      checked={this_checked_center}
                      value={true}
                      onChange={this.editElementProp.bind(
                        this,
                        "center",
                        "checked"
                      )}
                    />
                    {this.state.imgForImageElement && (
                      <div>
                        <img
                          src={this.state.imgForImageElement}
                          height="220"
                          className="image-upload-preview img-responsive"
                        />
                      </div>
                    )}
                    <label
                      className="custom-control-label control-edit"
                      htmlFor="do-center"
                    >
                      Center?
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-3">
                      <label
                        className="control-label control-edit"
                        htmlFor="elementWidth"
                      >
                        Width:
                      </label>
                      <input
                        id="elementWidth"
                        type="text"
                        className="form-control"
                        defaultValue={this.props.element.width}
                        onBlur={this.updateElement.bind(this)}
                        onChange={this.editElementProp.bind(
                          this,
                          "width",
                          "value"
                        )}
                      />
                    </div>
                    <div className="col-sm-3">
                      <label
                        className="control-label control-edit"
                        htmlFor="elementHeight"
                      >
                        Height:
                      </label>
                      <input
                        id="elementHeight"
                        type="text"
                        className="form-control"
                        defaultValue={this.props.element.height}
                        onBlur={this.updateElement.bind(this)}
                        onChange={this.editElementProp.bind(
                          this,
                          "height",
                          "value"
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

          {this.state.element.element === "Thumbnail" && (
            <div className="thumbnail-edit-form">
              <div className="toggleSwitchThumbnail">
                <div className="left">Add Image URL</div>
                <Switch
                  onChange={this.handleToggleChange}
                  checked={this.state.toggleChecked}
                  className="middle"
                  onColor="#008800"
                  offColor="#008800"
                  uncheckedIcon={false}
                  checkedIcon={false}
                />
                <div className="right">Upload Image</div>
              </div>
              <div>
                <div className="thumbnail-container-edit">
                  <div className="well">
                    {!this.state.toggleChecked ? (
                      <div className="add-image-url-container">
                        <h4> Add Image URL </h4>
                        <div className="form-group">
                          <label
                            className="control-label control-edit"
                            htmlFor="input_thumbnail_url"
                          >
                            Link to:
                            {this.state.imgThumbnailUrl && (
                              <span
                                className="float-right clear-input-image-url-btn"
                                onClick={this.clearInputThumbnailUrlImage}
                              >
                                x clear
                              </span>
                            )}
                          </label>
                          <input
                            id="input_thumbnail_url"
                            type="text"
                            className="form-control"
                            defaultValue={this.props.element.src}
                            onBlur={this.updateElement.bind(this)}
                            onChange={this.editElementProp.bind(
                              this,
                              "src",
                              "value"
                            )}
                          />
                          {this.state.imgThumbnailUrl && (
                            <div>
                              <img
                                src={this.state.imgThumbnailUrl}
                                height="220"
                                className="image-upload-preview img-responsive"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="add-local-image-container">
                        <h4> Add Image from your Computer or Local Drive</h4>
                        <div className="form-group">
                          <div className="image-upload-container">
                            {!this.state.img && (
                              <div>
                                <input
                                  name={name}
                                  type="file"
                                  accept="image/*"
                                  id="input_thumbnail"
                                  capture="camera"
                                  className="image-upload"
                                  onChange={this.displayThumbnailImage}
                                />
                                <div className="image-upload-control">
                                  <div className="btn btn-default btn-school">
                                    <i className="fas fa-plus-circle"></i> Add
                                    Image
                                  </div>
                                  <p className="text-info">
                                    Note: Size must not exceed 1 MB
                                  </p>
                                </div>
                              </div>
                            )}
                            {this.state.img && (
                              <div>
                                <img
                                  src={this.state.img}
                                  height="220"
                                  className="image-upload-preview img-responsive"
                                />
                                <br />
                                <div
                                  className="btn-thumbnail-image-clear"
                                  onClick={this.clearThumbnailImage}
                                >
                                  <i className="fas fa-times"></i> Clear
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-12">
                          <label
                            className="control-label control-edit"
                            htmlFor="elementWrapper"
                          >
                            Add Wrapper:
                          </label>
                          <p className="text-muted">
                            <span className="fa fa-info-circle"></span> Note:
                            Wrappers will group all Thumbnails.So use the same
                            wrapper name if you want to group them in one.
                          </p>
                          <input
                            id="elementWrapper"
                            type="text"
                            className="form-control"
                            defaultValue={this.props.element.wrapper_name}
                            onBlur={this.updateElement.bind(this)}
                            onChange={this.editElementProp.bind(
                              this,
                              "wrapper_name",
                              "value"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-12">
                          <label
                            className="control-label control-edit"
                            htmlFor="elementWrapper"
                          >
                            Add Description:
                          </label>
                          <TextAreaAutosize
                            type="text"
                            minRows={5}
                            maxRows={5}
                            className="form-control"
                            id="thumbnailDescription"
                            defaultValue={this.props.element.description}
                            onBlur={this.updateElement.bind(this)}
                            onChange={this.editElementProp.bind(
                              this,
                              "description",
                              "value"
                            )}
                            style={{ height: "auto" }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="custom-control custom-checkbox">
                        <input
                          id="do-center"
                          className="custom-control-input"
                          type="checkbox"
                          checked={this_checked_center}
                          value={true}
                          onChange={this.editElementProp.bind(
                            this,
                            "center",
                            "checked"
                          )}
                        />
                        <label
                          className="custom-control-label control-edit"
                          htmlFor="do-center"
                        >
                          Center?
                        </label>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-sm-3">
                          <label
                            className="control-label control-edit"
                            htmlFor="elementWidth"
                          >
                            Width:
                          </label>
                          <input
                            id="elementWidth"
                            type="text"
                            className="form-control"
                            defaultValue={this.props.element.width}
                            onBlur={this.updateElement.bind(this)}
                            onChange={this.editElementProp.bind(
                              this,
                              "width",
                              "value"
                            )}
                          />
                        </div>
                        <div className="col-sm-3">
                          <label
                            className="control-label control-edit"
                            htmlFor="elementHeight"
                          >
                            Height:
                          </label>
                          <input
                            id="elementHeight"
                            type="text"
                            className="form-control"
                            defaultValue={this.props.element.height}
                            onBlur={this.updateElement.bind(this)}
                            onChange={this.editElementProp.bind(
                              this,
                              "height",
                              "value"
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {this.props.element.hasOwnProperty("label") && (
            <div className="form-group">
              <label className="control-edit">Display Label</label>
              <Editor
                toolbar={toolbar}
                defaultEditorState={editorState}
                onBlur={this.updateElement.bind(this)}
                onEditorStateChange={this.onEditorStateChange.bind(
                  this,
                  0,
                  "label"
                )}
                stripPastedStyles={true}
              />
              <br />
              <div className="custom-control custom-checkbox">
                <input
                  id="is-required"
                  className="custom-control-input"
                  type="checkbox"
                  checked={this_checked}
                  value={true}
                  onChange={this.editElementProp.bind(
                    this,
                    "required",
                    "checked"
                  )}
                />
                <label className="custom-control-label" htmlFor="is-required">
                  Required
                </label>
              </div>
              {this.props.element.hasOwnProperty("readOnly") && (
                <div className="custom-control custom-checkbox">
                  <input
                    id="is-read-only"
                    className="custom-control-input"
                    type="checkbox"
                    checked={this_read_only}
                    value={true}
                    onChange={this.editElementProp.bind(
                      this,
                      "readOnly",
                      "checked"
                    )}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="is-read-only"
                  >
                    Read only
                  </label>
                </div>
              )}
              {this.props.element.hasOwnProperty("defaultToday") && (
                <div className="custom-control custom-checkbox">
                  <input
                    id="is-default-to-today"
                    className="custom-control-input"
                    type="checkbox"
                    checked={this_default_today}
                    value={true}
                    onChange={this.editElementProp.bind(
                      this,
                      "defaultToday",
                      "checked"
                    )}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="is-default-to-today"
                  >
                    Default to Today?
                  </label>
                </div>
              )}
              {this.props.element.hasOwnProperty("showTimeSelect") && (
                <div className="custom-control custom-checkbox">
                  <input
                    id="show-time-select"
                    className="custom-control-input"
                    type="checkbox"
                    checked={this_show_time_select}
                    value={true}
                    onChange={this.editElementProp.bind(
                      this,
                      "showTimeSelect",
                      "checked"
                    )}
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="show-time-select"
                  >
                    Show Time Select?
                  </label>
                </div>
              )}
              {this_show_time_select &&
                this.props.element.hasOwnProperty("showTimeSelectOnly") && (
                  <div className="custom-control custom-checkbox">
                    <input
                      id="show-time-select-only"
                      className="custom-control-input"
                      type="checkbox"
                      checked={this_show_time_select_only}
                      value={true}
                      onChange={this.editElementProp.bind(
                        this,
                        "showTimeSelectOnly",
                        "checked"
                      )}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="show-time-select-only"
                    >
                      Show Time Select Only?
                    </label>
                  </div>
                )}
              {(this.state.element.element === "RadioButtons" ||
                this.state.element.element === "Checkboxes") &&
                canHaveDisplayHorizontal && (
                  <div className="custom-control custom-checkbox">
                    <input
                      id="display-horizontal"
                      className="custom-control-input"
                      type="checkbox"
                      checked={this_checked_inline}
                      value={true}
                      onChange={this.editElementProp.bind(
                        this,
                        "inline",
                        "checked"
                      )}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="display-horizontal"
                    >
                      Display horizonal
                    </label>
                  </div>
                )}
            </div>
          )}

          {this.state.element.element === "Signature" &&
          this.props.element.readOnly ? (
            <div className="form-group">
              <label
                className="control-label control-edit"
                htmlFor="variableKey"
              >
                Variable Key:
              </label>
              <input
                id="variableKey"
                type="text"
                className="form-control"
                defaultValue={this.props.element.variableKey}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(
                  this,
                  "variableKey",
                  "value"
                )}
              />
              <p className="help-block">
                This will give the element a key that can be used to replace the
                content with a runtime value.
              </p>
            </div>
          ) : (
            <div />
          )}

          {canHavePageBreakBefore && (
            <div className="form-group">
              <label className="control-label control-edit">
                Print Options
              </label>
              <div className="custom-control custom-checkbox">
                <input
                  id="page-break-before-element"
                  className="custom-control-input"
                  type="checkbox"
                  checked={this_checked_page_break}
                  value={true}
                  onChange={this.editElementProp.bind(
                    this,
                    "pageBreakBefore",
                    "checked"
                  )}
                />
                <label
                  className="custom-control-label"
                  htmlFor="page-break-before-element"
                >
                  Page Break Before Element?
                </label>
              </div>
            </div>
          )}

          {canHaveAlternateForm && (
            <div className="form-group">
              <label className="control-label control-edit">
                Alternate/Signature Page
              </label>
              <div className="custom-control custom-checkbox">
                <input
                  id="display-on-alternate"
                  className="custom-control-input"
                  type="checkbox"
                  checked={this_checked_alternate_form}
                  value={true}
                  onChange={this.editElementProp.bind(
                    this,
                    "alternateForm",
                    "checked"
                  )}
                />
                <label
                  className="custom-control-label"
                  htmlFor="display-on-alternate"
                >
                  Display on alternate/signature Page?
                </label>
              </div>
            </div>
          )}

          {this.props.element.hasOwnProperty("step") && (
            <div className="form-group">
              <div className="form-group-range">
                <label
                  className="control-label control-edit"
                  htmlFor="rangeStep"
                >
                  Step
                </label>
                <input
                  id="rangeStep"
                  type="number"
                  className="form-control"
                  defaultValue={this.props.element.step}
                  onBlur={this.updateElement.bind(this)}
                  onChange={this.editElementProp.bind(this, "step", "value")}
                />
              </div>
            </div>
          )}
          {this.props.element.hasOwnProperty("min_value") && (
            <div className="form-group">
              <div className="form-group-range">
                <label
                  className="control-label control-edit"
                  htmlFor="rangeMin"
                >
                  Min
                </label>
                <input
                  id="rangeMin"
                  type="number"
                  className="form-control"
                  defaultValue={this.props.element.min_value}
                  onBlur={this.updateElement.bind(this)}
                  onChange={this.editElementProp.bind(
                    this,
                    "min_value",
                    "value"
                  )}
                />
                <input
                  type="text"
                  className="form-control"
                  defaultValue={this.props.element.min_label}
                  onBlur={this.updateElement.bind(this)}
                  onChange={this.editElementProp.bind(
                    this,
                    "min_label",
                    "value"
                  )}
                />
              </div>
            </div>
          )}
          {this.props.element.hasOwnProperty("max_value") && (
            <div className="form-group">
              <div className="form-group-range">
                <label
                  className="control-label control-edit"
                  htmlFor="rangeMax"
                >
                  Max
                </label>
                <input
                  id="rangeMax"
                  type="number"
                  className="form-control"
                  defaultValue={this.props.element.max_value}
                  onBlur={this.updateElement.bind(this)}
                  onChange={this.editElementProp.bind(
                    this,
                    "max_value",
                    "value"
                  )}
                />
                <input
                  type="text"
                  className="form-control"
                  defaultValue={this.props.element.max_label}
                  onBlur={this.updateElement.bind(this)}
                  onChange={this.editElementProp.bind(
                    this,
                    "max_label",
                    "value"
                  )}
                />
              </div>
            </div>
          )}
          {this.props.element.hasOwnProperty("default_value") && (
            <div className="form-group">
              <div className="form-group-range">
                <label
                  className="control-label control-edit"
                  htmlFor="defaultSelected"
                >
                  Default Selected
                </label>
                <input
                  id="defaultSelected"
                  type="number"
                  className="form-control"
                  defaultValue={this.props.element.default_value}
                  onBlur={this.updateElement.bind(this)}
                  onChange={this.editElementProp.bind(
                    this,
                    "default_value",
                    "value"
                  )}
                />
              </div>
            </div>
          )}
          {this.props.element.hasOwnProperty("static") &&
            this.props.element.static && (
              <div className="form-group">
                <label className="control-label control-edit">Text Style</label>
                <div className="custom-control custom-checkbox">
                  <input
                    id="do-bold"
                    className="custom-control-input"
                    type="checkbox"
                    checked={this_checked_bold}
                    value={true}
                    onChange={this.editElementProp.bind(
                      this,
                      "bold",
                      "checked"
                    )}
                  />
                  <label className="custom-control-label" htmlFor="do-bold">
                    Bold
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    id="do-italic"
                    className="custom-control-input"
                    type="checkbox"
                    checked={this_checked_italic}
                    value={true}
                    onChange={this.editElementProp.bind(
                      this,
                      "italic",
                      "checked"
                    )}
                  />
                  <label className="custom-control-label" htmlFor="do-italic">
                    Italic
                  </label>
                </div>
              </div>
            )}
          {this.props.element.showDescription && (
            <div className="form-group">
              <label
                className="control-label control-edit"
                htmlFor="questionDescription"
              >
                Description
              </label>
              <TextAreaAutosize
                type="text"
                className="form-control"
                id="questionDescription"
                defaultValue={this.props.element.description}
                onBlur={this.updateElement.bind(this)}
                onChange={this.editElementProp.bind(
                  this,
                  "description",
                  "value"
                )}
              />
            </div>
          )}
          {this.props.showCorrectColumn &&
            this.props.element.canHaveAnswer &&
            !this.props.element.hasOwnProperty("options") && (
              <div className="form-group">
                <label
                  className="control-label control-edit"
                  htmlFor="correctAnswer"
                >
                  Correct Answer
                </label>
                <input
                  id="correctAnswer"
                  type="text"
                  className="form-control"
                  defaultValue={this.props.element.correct}
                  onBlur={this.updateElement.bind(this)}
                  onChange={this.editElementProp.bind(this, "correct", "value")}
                />
              </div>
            )}
          {this.props.element.canPopulateFromApi &&
            this.props.element.hasOwnProperty("options") && (
              <div className="form-group">
                <label
                  className="control-label control-edit"
                  htmlFor="optionsApiUrl"
                >
                  Populate Options from API
                </label>
                <div className="row">
                  <div className="col-sm-6">
                    <input
                      className="form-control"
                      style={{ width: "100%" }}
                      type="text"
                      id="optionsApiUrl"
                      placeholder="http://localhost:8080/api/optionsdata"
                    />
                  </div>
                  <div className="col-sm-6">
                    <button
                      onClick={this.addOptions.bind(this)}
                      className="btn btn-success"
                    >
                      Populate
                    </button>
                  </div>
                </div>
              </div>
            )}
          {this.props.element.hasOwnProperty("options") && (
            <DynamicOptionList
              showCorrectColumn={this.props.showCorrectColumn}
              canHaveOptionCorrect={canHaveOptionCorrect}
              canHaveOptionValue={canHaveOptionValue}
              data={this.props.preview.state.data}
              updateElement={this.props.updateElement}
              preview={this.props.preview}
              element={this.props.element}
              key={this.props.element.options.length}
            />
          )}
        </div>
      </div>
    );
  }
}
FormElementsEdit.defaultProps = { className: "edit-element-fields" };
