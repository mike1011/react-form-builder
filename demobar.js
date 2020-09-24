import React from "react";
import store from "./src/stores/store";
import ReactFormGenerator from "./src/form";

const answers = {};
// const answers = {
//   'dropdown_38716F53-51AA-4A53-9A9B-367603D82548': 'd2',
//   'checkboxes_8D6BDC45-76A3-4157-9D62-94B6B24BB833': [
//     'checkboxes_option_8657F4A6-AA5A-41E2-A44A-3E4F43BFC4A6',
//     'checkboxes_option_1D674F07-9E9F-4143-9D9C-D002B29BA9E4',
//   ],
//   'radio_buttons_F79ACC6B-7EBA-429E-870C-124F4F0DA90B': [
//     'radiobuttons_option_553B2710-AD7C-46B4-9F47-B2BD5942E0C7',
//   ],
//   'rating_3B3491B3-71AC-4A68-AB8C-A2B5009346CB': 4,
// };

const testData = [
  {
    id: "vqTk0Ub-k",
    element: "Header",
    text: "Header Text",
    static: true,
    required: false,
    bold: false,
    italic: false,
    content: "<h3><strong>This is a Test Page</strong></h3>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    dirty: false,
  },
  {
    id: "EnoCITGU-",
    element: "Paragraph",
    text: "Paragraph",
    static: true,
    required: false,
    bold: false,
    italic: false,
    content:
      "<p>I have this react code where i am using new Date().getTime() as react key props on some Input components.This is probably an antipattern because keys need to be stable. But i want to understand why is this so buggy. And why newDate().getTime() as key behaves worse than Math.random() as key.Please check these 2 examples out to see what i mean:</p>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    dirty: false,
  },
  {
    id: "fMXIL0Xn-",
    element: "Thumbnail",
    text: "Thumbnail",
    required: false,
    content: "<h3><strong>Goa</strong></h3>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    src: "https://s3-ap-southeast-1.amazonaws.com/hallpro/banner/hero_4.jpg",
    wrapper_name: "wrapper",
    field_name: "thumbnail_3FZZ2RuEaF",
    dirty: false,
  },
  {
    id: "esAdOnYUD6",
    element: "Thumbnail",
    text: "Thumbnail",
    required: false,
    content: "<h3>Manali</h3>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    src: "https://s3-ap-southeast-1.amazonaws.com/hallpro/banner/hero_1.jpg",
    wrapper_name: "wrapper",
    field_name: "thumbnail_zwTSTwBxjV",
    dirty: false,
  },
  {
    id: "2H2u4N5amQ",
    element: "Thumbnail",
    text: "Thumbnail",
    required: false,
    content: "<h3><strong>Pune</strong></h3>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    src: "https://s3-ap-southeast-1.amazonaws.com/hallpro/banner/hero_3.jpg",
    wrapper_name: "wrapper",
    field_name: "thumbnail_Fj_ixX8i75",
    dirty: false,
  },
  {
    id: "f0EV83RuC",
    element: "Header",
    text: "Header Text",
    static: true,
    required: false,
    bold: false,
    italic: false,
    content: "<h4><strong>More cheap packages for you - </strong></h4>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    dirty: false,
  },
  {
    id: "4DX2JNc_c",
    element: "Thumbnail",
    text: "Thumbnail",
    required: false,
    content: "<h3><strong>Dehradun</strong></h3>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    src: "https://s3-ap-southeast-1.amazonaws.com/hallpro/banner/hero_4.jpg",
    wrapper_name: "qqq",
    field_name: "thumbnail_bJ3bVvIt2-",
    dirty: false,
  },
  {
    id: "O8mx1s4szY",
    element: "Thumbnail",
    text: "Thumbnail",
    required: false,
    content: "<h3><strong>Agra</strong></h3>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    src: "https://s3-ap-southeast-1.amazonaws.com/hallpro/banner/hero_1.jpg",
    wrapper_name: "qqq",
    field_name: "thumbnail_YIMvbuAUcU",
    dirty: false,
  },
  {
    id: "RY8m9yMcxh",
    element: "Thumbnail",
    text: "Thumbnail",
    required: false,
    content: "<h3><strong>Shimla</strong></h3>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    src: "https://s3-ap-southeast-1.amazonaws.com/hallpro/banner/hero_4.jpg",
    wrapper_name: "test",
    field_name: "thumbnail_EYpXWS8r8k",
    dirty: false,
  },
  {
    id: "RY8m9yMabc",
    element: "Thumbnail",
    text: "Thumbnail",
    required: false,
    content: "<h3><strong>Jodhpur</strong></h3>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    src: "https://s3-ap-southeast-1.amazonaws.com/hallpro/banner/hero_4.jpg",
    wrapper_name: "test",
    field_name: "thumbnail_EYpXWS5768",
    dirty: false,
  },
  {
    id: "abcm9yMcxh",
    element: "Thumbnail",
    text: "Thumbnail",
    required: false,
    content: "<h3><strong>Mumbai</strong></h3>\n",
    canHavePageBreakBefore: true,
    canHaveAlternateForm: true,
    canHaveDisplayHorizontal: true,
    canHaveOptionCorrect: true,
    canHaveOptionValue: true,
    canPopulateFromApi: true,
    src: "https://s3-ap-southeast-1.amazonaws.com/hallpro/banner/hero_4.jpg",
    wrapper_name: "test",
    field_name: "thumbnail_EYpXWS093f",
    dirty: false,
  },
];

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };

    const update = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);

    store.subscribe((state) => update(state.data));
  }

  getFormStates = (states) => {
    console.log("======getstates====", states);
  };

  showPreview() {
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  // only to test preloaded json array
  // componentDidMount() {
  //   this.setState({ data: testData });
  // }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(data) {
    this.setState({
      data,
    });
  }

  // eslint-disable-next-line no-unused-vars
  _onSubmit(data) {
    // console.log('onSubmit', data);
    // Place code to post json data to server here
  }

  render() {
    let modalClass = "modal";
    if (this.state.previewVisible) {
      modalClass += " show d-block";
    }

    let shortModalClass = "modal short-modal";
    if (this.state.shortPreviewVisible) {
      shortModalClass += " show d-block";
    }

    let roModalClass = "modal ro-modal";
    if (this.state.roPreviewVisible) {
      roModalClass += " show d-block";
    }

    return (
      <div className="clearfix" style={{ margin: "10px", width: "70%" }}>
        <h4 className="float-left">Preview</h4>
        <button
          className="btn btn-primary float-right"
          style={{ marginRight: "10px" }}
          onClick={() => this.showPreview()}
        >
          Preview Form
        </button>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: "10px" }}
          onClick={() => this.showShortPreview()}
        >
          Alternate/Short Form
        </button>
        <button
          className="btn btn-default float-right"
          style={{ marginRight: "10px" }}
          onClick={() => this.showRoPreview()}
        >
          Read Only Form
        </button>

        {this.state.previewVisible && (
          <div className={modalClass} role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={answers}
                  action_name="Save"
                  form_action="/api/form"
                  form_method="POST"
                  // skip_validations={true}
                  // onSubmit={this._onSubmit}
                  variables={this.props.variables}
                  data={this.state.data}
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.roPreviewVisible && (
          <div className={roModalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={answers}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  read_only={true}
                  variables={this.props.variables}
                  hide_actions={true}
                  data={this.state.data}
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {this.state.shortPreviewVisible && (
          <div className={shortModalClass}>
            <div className="modal-dialog">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action=""
                  answer_data={answers}
                  form_action="/"
                  form_method="POST"
                  data={this.state.data}
                  display_short={true}
                  variables={this.props.variables}
                  hide_actions={false}
                />

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-default"
                    data-dismiss="modal"
                    onClick={this.closePreview.bind(this)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
