var React = require('React');

var TabSet = React.createClass({
	clickHandle: function(it){
		this.setState({idx: it});
	},
	getInitialState: function(){
		let index = 0;
		React.Children.forEach(this.props.children,(c,idx) => {
			if(c.props.className === 'show'){
				index = idx;
			}
		});
		return {idx: index};
	},
	render:function(){
		let children = [],head = [];
		React.Children.forEach(this.props.children,(c,idx) => {
			if(c.type && c.type.displayName ==='Tab'){
				this.state.idx === idx  && children.push(c);
				head.push(<li className={'tab-head-item '+ (this.state.idx === idx ? 'on' : '')} onClick={this.clickHandle.bind(this,idx)} key={idx}>{c.props.heading}</li>);
			}
		});
		return (
			<div className={'tab' + " " + (this.props.className || '')}>
				<ul className='tab-head'>
					{head}
				</ul>
				<div className='tab-cont'>
					{children}
				</div>
			</div>
		)	
	}
});
var Tab = React.createClass({
	render: function(){
		var childs = React.Children.map(this.props.children,function(c){
			if(c.type && c.type.displayName === 'TabSet'){
				return (<TabSet className = {c.props.className}>{c.props.children}</TabSet>)
			}else{
				return c;
			}
		},this);
		return (
			<div className='tab-panel'>
				{childs}
			</div>
		);
	}
});
module.exports = TabSet;