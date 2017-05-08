import Li from './comm/Li.js';
import Footer from './comm/Footer.js';
import React,{Component} from 'react';
import ReactDOM from 'react-dom';
require('../css/base.css');
require('../css/index.css');
let data = {
  arr:[]
}
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      arr : this.props.arr,
      val : '',
      view: 'all'
    }
    this.onchanged = this.onchanged.bind(this);
    this.keydown = this.keydown.bind(this);
    this.toggleCheck = this.toggleCheck.bind(this);
    this.deletFn = this.deletFn.bind(this);
    this.allFn = this.allFn.bind(this);
    this.changeView = this.changeView.bind(this);
   	this.clearFn = this.clearFn.bind(this);
   	this.changeTodo = this.changeTodo.bind(this);
  }
  onchanged(ev){
    this.setState({
      val:ev.target.value
    })
  }
  keydown(ev){
    let val = ev.target.value.trim();
    if(ev.keyCode!=13 ||!val)return
    let newData = {
      id:new Date().getTime(),
      labelval:val,
      inputchecked:false
    }
    let newArr = Object.assign([],this.state.arr);
    newArr.unshift(newData);
    this.setState({
      arr:newArr,
      val:''
    });
  }
  toggleCheck(todo){
    let newArr = Object.assign([],this.state.arr)
    let datas = newArr.map((ele)=>{
      if(ele.id == todo.id){
        ele.inputchecked = !ele.inputchecked
      }
      return ele;
    })
    this.setState({
      arr:datas,
      val:''
    })
  }
  
  deletFn(todo){
      let newArr = Object.assign([],this.state.arr)
      let datas = newArr.filter((ele)=>{
        return ele.id != todo.id
      })
      this.setState({
        arr:datas
      })
  }
  
  allFn(ev){
    let {checked} = ev.target
    let newArr = Object.assign([],this.state.arr)
    let datas = newArr.map((ele)=>{
      ele.inputchecked = checked;
      return ele
    })
    this.setState({
      arr:datas
    })
  }
  
  changeView(view){
  	this.setState({
      view:view
    })
  }
  
  clearFn(){
  	let newArr = Object.assign([],this.state.arr);
  	newArr = newArr.filter((ele)=>{
  		return !ele.inputchecked
  	})
  	console.log(newArr);
  	this.setState({
      arr:newArr
    })
  }
  
changeTodo(todo){
	let newArr = Object.assign([],this.state.arr);
    newArr = newArr.map((ele,i)=>{
      if(ele.id ===  todo.id){
        ele.labelval = todo.labelval
      }
      return ele;
    })
    this.setState({
      arr:newArr
    })
}

  
  
  
  

  render(){
     
    // let list = null;
    
   
    
  	//let arr = Object.assign([],this.state.arr);
    let {arr,view} = this.state;
    let list = null;
    let num = arr.length
    let footer = null;
    let listBox = null;
    
    let listshai = arr.filter((ele,i)=>{
    	if(ele.inputchecked)num--
    	switch (view){
    		case 'active': return !ele.inputchecked;
    			break;
    		case 'completed':return ele.inputchecked;
    			break;
    		default: return true;
    			break;
    	}
    })
//  console.log(listshai)
    
    
    list = listshai.map((ele,i)=>{
      let datas = {
        id:ele.id,
        labelval:ele.labelval,
        inputchecked:ele.inputchecked,
        key:ele.id,
        todo:ele,
        toggleCheck:this.toggleCheck,
        deletFn:this.deletFn,
        changeTodo:this.changeTodo
      }
      return <Li {...datas}/>
    })
    
    
    
    if(arr.length){
    	listBox = (
    		<section className="main">
          <input className="toggle-all" type="checkbox" checked={num===0&&arr.length} onChange={this.allFn}/>
          <ul className="todo-list">
              {list}
          </ul>
      	</section>
    	)
    	let footerDate = {
        num:num,
        changeView:this.changeView,
        view:view,
        bol:(arr.length != num),
        clearFn:this.clearFn
      }
    	footer = (<Footer {...footerDate}/>)
    }
    

    return(
      <div>
          <header className="header" >
              <h1>todos</h1>
              <input className="new-todo" placeholder="请输入内容" value={this.state.val} onChange={this.onchanged} onKeyDown={this.keydown}/>
          </header>
          {listBox}
          {footer}
          
      </div>
    )
  }
}


ReactDOM.render(
  <App {...data}/>,
  document.getElementById('box')
)
