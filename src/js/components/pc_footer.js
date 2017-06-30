var React = require('react');
import { Row, Col } from 'antd';
export default class PCFooter extends React.Component{
	render() {
		return(
    	<Row>
				<Col span={2}></Col>
				<Col span={20} class='footer'>
					&copy;&nbsp;2016 EasyNews. All Rights Reserved.
				</Col>
				<Col span={2}></Col>
			</Row>
	
			)
	};
}
			