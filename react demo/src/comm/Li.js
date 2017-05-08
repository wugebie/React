import React,{Component} from 'react';
export default class Li extends Component{
  constructor(props){
    super(props)
    this.state = {
      double:false,
      val:''
    }
    this.toggle = this.toggle.bind(this);
    this.deleFn = this.deleFn.bind(this);
    this.doubleFn = this.doubleFn.bind(this);
    this.changeVal = this.changeVal.bind(this);
    this.blurFn = this.blurFn.bind(this);
    this.changTodo = this.changTodo.bind(this);
    this.keyDown = this.keyDown.bind(this);
    
  }
  toggle(){
    this.props.toggleCheck(this.props.todo);
  }
  deleFn(){
    this.props.deletFn(this.props.todo);
  }


  doubleFn(){
  	this.setState({
      double:true,
      val:this.props.labelval
    },()=>{
      this.refs.change.focus();
    })
  }
changeVal(){
    this.setState({
      val:this.refs.change.value
    })
}
blurFn(){
    this.setState({
      double:false
    },()=>{
      this.changTodo()
    })
    //更新总的数据
  } 
changTodo(){
	this.props.todo.labelval = this.state.val;
	this.props.changeTodo(this.props.todo);
}

keyDown(ev){
	if(ev.keyCode !== 13)return;
	this.blurFn();	
}

  render(){
  	
    let sClass = this.props.inputchecked?"completed":"";
    if(this.state.double) sClass += ' editing';
    return (
      <li className={sClass}>
          <div className="view">
              <input
                className="toggle"
                type="checkbox"
                checked={this.props.inputchecked}
                onChange={this.toggle}
              />
              <label onDoubleClick={this.doubleFn}>{this.props.labelval}</label>
              <button className="destroy" onClick={this.deleFn}></button>
          </div>
          <input
          	type = 'text'
            className="edit"
            value={this.state.val}
            onChange = {this.changeVal}
            onBlur = {this.blurFn}
            onKeyDown={this.keyDown}
            ref="change"
          />
      </li>
    )
  }
}