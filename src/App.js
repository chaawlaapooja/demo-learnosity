import React from 'react';
import './App.css';
import * as Quill from 'quill'
import QuillBetterTable from 'quill-better-table'
import ReactModal from 'react-modal'

Quill.register({
  'modules/better-table': QuillBetterTable
}, true)

ReactModal.setAppElement('#root')

class App extends React.Component {
  constructor(){
    super();
    this.state={
       showModal: false,
       obj:{}
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
quill.root.innerHTML = "<p><strong class=\"ql-size-large\"><em>[This is sample question]<\/em><\/strong><\/p>";
this.Question=quill
var o1 = new Quill('#o1', {
  placeholder: '[Choice 1]...',
  theme: 'snow'  // or 'bubble'
});
o1.root.innerHTML = "<p><strong class=\"ql-size-large\">[Choice 1]<\/strong><\/p>";
this.option1=o1
var o2 = new Quill('#o2', {
  placeholder: '[Choice 2]...',
  theme: 'snow'  // or 'bubble'
});
o2.root.innerHTML = "<p><strong class=\"ql-size-large\">[Choice 2]<\/strong><\/p>";
this.option2=o2
var o3 = new Quill('#o3', {
  placeholder: '[Choice 3]...',
  theme: 'snow'  // or 'bubble'
});
o3.root.innerHTML = "<p><strong class=\"ql-size-large\">[Choice 3]<\/strong><\/p>";
this.option3=o3
var o4 = new Quill('#o4', {
  placeholder: '[Choice 4]...',
  theme: 'snow'  // or 'bubble'
});
o4.root.innerHTML = "<p><strong class=\"ql-size-large\">[Choice 4]<\/strong><\/p>";
this.option4=o4

}
  
  setOption(value){
    if(value==="1")
      document.querySelector('#node1').innerHTML=this.refs.o1.value
    else if(value==="2")
      document.querySelector('#node2').innerHTML=this.refs.o2.value
    else if(value==="3")
      document.querySelector('#Li1').innerHTML=this.refs.o3.value
    else if(value==="4")
      document.querySelector('#Li2').innerHTML=this.refs.o4.value
  }
  saveData(){
    //this.handleOpenModal
    let obj={
      type:'mcq-t1',
      question:this.Question.getText(),
      answers:[this.option1.getText(), this.option2.getText(),this.option3.getText(), this.option4.getText()],
      correctAnswer:this.refs.answer.value
    }
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
            "value": ["0"]
        }
    },
    "ui_style": {
        "type": "horizontal"
    }
}
    this.setState({obj:ob})
    return obj
  }
  
  
  
  render(){
    let ar = Object.entries(this.state.obj);
  return (
    
    <div className="App" style={{padding:5+'%', margin:5+'%'}}>
      <div id="editor-container"></div>
      <div ref="op1" id="o1"></div>
      <div id="o2"></div>
      <div id="o3"></div>
      <div id="o4"></div>
          
      <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="Modal #1 Global Style Override Example"
           onRequestClose={this.handleCloseModal}
        >
          <p>Modal text!</p>
          {JSON.stringify(this.state.obj)}
          {/*ar.map(a=>{
            let k = a[0]
            let v = a[1]
            var fv
            if(typeof(v)==='object'){
              fv = Object.entries(v)
              fv.map(fv=>{
                if(typeof(fv)==='object')
                  fv = (Object.entries(fv))
                else
                  fv = fv
              })
            }
            else
              fv = v
           return(<div><p>{k} : {fv.toString()}</p></div>)
          })*/}
          <br/><br/>
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </ReactModal>  

    <div className="pull-left">
    <label>Select correct answer</label>
    <input type="radio" name="ans" ref="answer" value="A"/> A
    <input type="radio" name="ans" ref="answer" value="B"/> B
    <input type="radio" name="ans" ref="answer" value="C"/> C
    <input type="radio" name="ans" ref="answer" value="D"/> D
    </div>
    <br/><br/>
    
    <button value="Save" className="btn btn-success" onClick={()=>{var ob = this.saveData();  this.handleOpenModal()}}>Save</button>
    </div>
  );
}
}

export default App;
