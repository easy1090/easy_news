var React = require('react');
import { Menu, Icon,Button,Modal,Row,Col,Tabs,
          Form,Checkbox,Input
      } from 'antd';
import {Router, Route, Link} from 'react-router-dom';
const FormItem = Form.Item;
class MobileHeader extends React.Component{
	constructor(props) {
			super(props),
			this.state={
        current:"nav_one",
        modalVisible:false,
        userName:'',
        userId:'',
        hasLogined:false,
        action:"login"
      	}
	};
  setModalVisible(value){
    this.setState({modalVisible:value});
  };

  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions={
      method:'GET'
    };
    var formData = this.props.form.getFieldsValue();
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action="+this.state.action
      +"&username="+formData.userName
      +"&password="+formData.password
      +"&r_userName="+formData.r_name
      +"&r_password="+formData.r_password
      +"&r_confirmpassword="+formData.r_confirmPassword,myFetchOptions).
    then(response=>response.json()).then(json=>{
      this.setState({userName:json.NickUserName,userId:json.userId});
      localStorage.userid= json.UserId;
      localStorage.userNickName = json.NickUserName;
    }
      );

    if(this.state.action=="login"){
      this.setState({hasLogined:true});
    }
    this.setModalVisible(false);
  };
  logout(){
    localStorage.userid= '';
    localStorage.userNickName = '';
    this.setState({hasLogined:false});
  };
  callback(key){
    if(key==1){
      this.setState({action:'login'});
    }
    else if(key==2){
      this.setState({action:'register'});
    }
  }
  login(){
  	this.setModalVisible(true);
  };
  componentWillMount(){
    if (localStorage.userid!='') {
      this.setState({hasLogined:true});
      this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
    }
  };
	render() {
		const TabPane = Tabs.TabPane;
    const {getFieldDecorator} = this.props.form;
		const userShow = this.state.hasLogined?

			<Icon type="inbox" />

		:<Icon type="setting" onClick={this.login.bind(this)}/>
		return(
			<header id="mobileheader">
				<img src="../src/images/logo.png" />
				<span >EasyNews</span>
				{userShow}
				<Modal
                visible={this.state.modalVisible}
                onOk={()=>this.setModalVisible(false)}
                onCancel={()=>this.setModalVisible(false)}
                footer={[
                  <Button key="submit" type="primary" size="large" onClick={this.handleSubmit.bind(this)} >
                   提交
                  </Button>,
                  <Button key="back" size="large" onClick={()=>this.setModalVisible(false)}>取消</Button>
                  
                ]}
              >
                <Tabs type="card">
                <TabPane tab="登陆" key="1" onChange={this.callback.bind(this)}>
                    <Form horizontal  className="login-form" >
                      <FormItem label="账户">
                        {getFieldDecorator('userName', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                      </FormItem>
                      <FormItem label="密码">
                        {getFieldDecorator('password', {
                          rules: [{ required: true, message: 'Please input your password!' }],
                        })(
                          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Userpassword" />
                        )}
                      </FormItem>
                     
                    </Form>
                  </TabPane>
                  <TabPane tab="注册" key="2">
                    <Form horizontal  className="login-form">
                      <FormItem label="账户">
                        {getFieldDecorator('r_name', {
                          rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                          <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" />
                        )}
                      </FormItem>
                      <FormItem label="密码">
                        {getFieldDecorator('r_password', {
                          rules: [{ required: true, message: 'Please input your password!' }],
                        })(
                          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Userpassword" />
                        )}
                      </FormItem>
                      <FormItem label="确认密码">
                        {getFieldDecorator('r_confirmpassword', {
                          rules: [{ required: true, message: 'Please input your password again!' }],
                        })(
                          <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Confirm Userpassword" />
                        )}
                      </FormItem>
                    </Form>
                  </TabPane>
                </Tabs>
              </Modal>
			</header>
			)
	}
}
export default MobileHeader=Form.create({})(MobileHeader); 