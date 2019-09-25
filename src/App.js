import React from 'react';
import './App.css';
import * as Quill from 'quill'
import QuillBetterTable from 'quill-better-table'
import ReactModal from 'react-modal'
import CodeMirror from 'react-codemirror';
import 'codemirror/lib/codemirror.css';

Quill.register({
  'modules/better-table': QuillBetterTable
}, true)

ReactModal.setAppElement('#root')
// ReactModal.defaultStyles.overlay.backgroundColor = '#d9d9d9';
class App extends React.Component {
  constructor(){
    super();
    this.state={
       showModal: false,
       obj:JSON.stringify({})
    }
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
  componentDidMount(){
    var toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];


var quill = new Quill('#editor-container', {
  modules: {
    toolbar: toolbarOptions
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
});
quill.root.innerHTML = "<p><strong><em>[This is sample question]</em></strong></p>";
this.Question=quill
var o1 = new Quill('#o1', {
  placeholder: '[Choice 1]...',
  theme: 'snow'  // or 'bubble'
});
o1.root.innerHTML = "<p><strong>[Choice 1]</strong></p>";
this.option1=o1
var o2 = new Quill('#o2', {
  placeholder: '[Choice 2]...',
  theme: 'snow'  // or 'bubble'
});
o2.root.innerHTML = "<p><strong>[Choice 2]</strong></p>";
this.option2=o2
var o3 = new Quill('#o3', {
  placeholder: '[Choice 3]...',
  theme: 'snow'  // or 'bubble'
});
o3.root.innerHTML = "<p><strong>[Choice 3]</strong></p>";
this.option3=o3
var o4 = new Quill('#o4', {
  placeholder: '[Choice 4]...',
  theme: 'snow'  // or 'bubble'
});
o4.root.innerHTML = "<p><strong>[Choice 4]</strong></p>";
this.option4=o4


}
  
  saveData(){
    //this.handleOpenModal
    // let obj={
    //   type:'mcq-t1',
    //   question:this.Question.getText(),
    //   answers:[this.option1.getText(), this.option2.getText(),this.option3.getText(), this.option4.getText()],
    //   correctAnswer:this.refs.answer.value
    // }
    var ans=''
    let radios = (document.querySelectorAll('input[type="radio"]'))
    radios.forEach(function(r){
        if(r.checked)
        {
          ans = r.value;
        }
      })
    let ob = {
    "options": [{
        "label": this.option1.getText(),
        "value": "0"
    }, {
        "label": this.option2.getText(),
        "value": "1"
    }, {
        "label": this.option3.getText(),
        "value": "2"
    }, {
        "label": this.option4.getText(),
        "value": "3"
    }],
    "stimulus": this.Question.getText(),
    "type": "mcq",
    "validation": {
        "scoring_type": "exactMatch",
        "valid_response": {
            "score": 1,
            "value": [ans]
        }
    },
    "ui_style": {
        "type": "horizontal"
    }
}
  var finalObject = JSON.stringify(ob, null, 4);
  finalObject = finalObject.replace(/\\n/g, '');
  this.setState({obj:finalObject})
  }
  
  
  updateCode(newCode) {
    this.setState({
      obj: newCode,
    });
  }
  saveMarkup(){
    let obj = JSON.parse(this.state.obj)
    this.option1.root.innerHTML = `<p><strong>${obj.options[0].label}</strong></p>`
    this.option2.root.innerHTML = `<p><strong>${obj.options[1].label}</strong></p>`
    this.option3.root.innerHTML = `<p><strong>${obj.options[2].label}</strong></p>`
    this.option4.root.innerHTML = `<p><strong>${obj.options[3].label}</strong></p>`
    this.Question.root.innerHTML= `<p><strong>${obj.stimulus}</strong></p>`
    this.handleCloseModal()
  }
  render(){
    let options = {
      lineNumbers: true,
      lineWrapping:true
    };
    const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
  return (
    
    <div className="App" style={{padding:3+'%', margin:3+'%'}}>
      <label>Sample Testing of MCQ Template</label>
      <div id="editor-container"></div>
      <div ref="op1" id="o1"></div>
      <div id="o2"></div>
      <div id="o3"></div>
      <div id="o4"></div>
      <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Modal #1 Global Style Override Example"
           onRequestClose={this.handleCloseModal}
           style={customStyles}
        >
          <div className="bg-info"><label style={{padding:0.2+'%'}}>Source</label></div>
          <CodeMirror style={{height:'auto'}} value={this.state.obj} onChange={this.updateCode.bind(this)} options={options} />
          <br/><br/>
          
          <div>
          <center>
          <button className="btn btn-success" style={{marginLeft:1+'%'}} onClick={this.saveMarkup.bind(this)}>Apply</button>
          <button className="btn btn-success" style={{marginLeft:1+'%'}} onClick={this.handleCloseModal}>Cancel</button>
          
          </center>
          </div>
        </ReactModal>  

    <div>
    <label>Select correct answer</label>
    <input type="radio" name="ans" ref="answer" value="0"/> A
    <input type="radio" name="ans" ref="answer" value="1"/> B
    <input type="radio" name="ans" ref="answer" value="2"/> C
    <input type="radio" name="ans" ref="answer" value="3"/> D
    </div>
    <br/><br/>
    
    <button value="Save" className="btn btn-success" onClick={()=>{this.saveData();  this.handleOpenModal()}}>Source</button>
    
    <br/><br/>
    
    </div>
  );
}
}

export default App;
