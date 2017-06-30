var React = require('react');
var ReactDOM = require('react-dom');
var MediaQuery = require('react-responsive');
import {BrowserRouter,Route,Switch,HashRouter} from 'react-router-dom';
import 'antd/dist/antd.css'; 
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';
import MobileNewsDetails from './components/mobile_news_details';
import PCNewsDetails from './components/pc_news_details';
export default class Root extends React.Component{
	render() {
		return(
			<div>
			<MediaQuery query='(min-device-width: 1224px)'>
				<BrowserRouter>
					<Switch>
						<Route exact path='/' component={PCIndex}></Route>
						<Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
					</Switch>
				</BrowserRouter>
          	</MediaQuery>
			<MediaQuery query='(max-device-width: 1224px)'>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={MobileIndex}></Route>
						<Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>

					</Switch>
				</BrowserRouter>
          	</MediaQuery>	
          	</div>		
		)
	}
}
ReactDOM.render(<Root/>,document.getElementById('mainContainer'));
