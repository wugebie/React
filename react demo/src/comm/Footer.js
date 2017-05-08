import React,{Component} from 'react';
export default class Footer extends Component{
	constructor(props){
		super(props)
		this.changeView = this.changeView.bind(this);
		this.clearFn = this.clearFn.bind(this);
	}
	
	changeView(ev){
		//console.log(this.props.changeView)
		this.props.changeView(ev.target.dataset.view);
	}
	clearFn(){
		this.props.clearFn()
	}
	
	
	
  render(){
  	let btn = null
  	if(this.props.bol){
  		btn=(
  			<button className="clear-completed" onClick = {this.clearFn}>清除完成项</button>
  		)
  	}
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{this.props.num}</strong>
          <span>条未选中</span>
        </span>
        <ul className="filters">
        	<li><a href="#/all" data-view="all" className="all" onClick = {this.changeView}>全部</a></li>
        	<li><a href="#/active" data-view="active" className="active" onClick = {this.changeView}>未完成</a></li>
        	<li><a href="#/completed" data-view="completed" className="completed" onClick = {this.changeView}>已完成</a></li>
        </ul>
        {btn}
        
      </footer>
    )
  }
}