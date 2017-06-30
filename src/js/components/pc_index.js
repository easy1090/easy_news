var React = require('react');
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_newscontainer';
import {BrowserRouter,Route,Switch,Link} from 'react-router-dom';
export default class PCIndex extends React.Component{
	render() {
		return(
			<div>
			<PCHeader/>
			<PCNewsContainer/>
			<PCFooter/>
			</div>
			);
	};
}