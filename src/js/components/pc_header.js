var React = require('react');
import {Router, Route, Link} from 'react-router-dom';
import { Menu, Icon,Button,Modal,Row,Col,Tabs,message,
          Form,Checkbox,Input
      } from 'antd';
const FormItem = Form.Item;

class PCHeader extends React.Component{
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
    handelClick(e){
      if(e.key=="register"){
        this.setState({current:"register"});
        this.setModalVisible(true);

      }
      else{
        this.setState({current:e.key})
      }
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
        localStorage.userId= json.UserId;
        localStorage.userName = json.NickUserName;
      }
        );

      if(this.state.action=="login"){
        this.setState({hasLogined:true});
      }
      message.success('请求成功');
      this.setModalVisible(false);
    };
    callback(key){
        if(key==1){
          this.setState({action:'login'});
        }
        else if(key==2){
          this.setState({action:'register'});
        }
    };
    logout(){
      localStorage.userId= '';
      localStorage.userName = '';
      this.setState({hasLogined:false});
    };
    componentWillMount(){
    if (localStorage.userid!='') {
      this.setState({hasLogined:true});
      this.setState({userName:localStorage.userNickName,userId:localStorage.userid});
    }
    };
	render() {
    const TabPane = Tabs.TabPane;
    const {getFieldDecorator} = this.props.form;
    const userShow=this.state.hasLogined
    ?<Menu.Item key="loginout" class="register">
      <Button size="small" type="primary">{this.state.userName} 

      </Button>
     &nbsp;&nbsp;
      <Button onClick={this.logout.bind(this)} size="small">退出</Button>      
    </Menu.Item>
    :<Menu.Item key="register">
      <Icon/>注册|登陆
    </Menu.Item>

		return(
			<header class="pcheader">
			<Row >
				<Col span={2}></Col>
				<Col span={4}>
					<a href='/' class='pclogo'>
					<img src="../src/images/logo.png" />
					<span >EasyNews</span>
					</a>
				</Col>
				<Col span={16} class='pcmenu'>
					<Menu
        				mode="horizontal"
        				selectedKeys={[this.state.current]}
                onClick={this.handelClick.bind(this)}

      				>
      				<Menu.Item key="nav_one">
          				<Icon type="appstore" />头条
        			</Menu.Item>
        			<Menu.Item key="nav_two">
          				<Icon type="appstore" />国内
        			</Menu.Item>
        			<Menu.Item key="nav_three">
          				<Icon type="appstore" />国际
        			</Menu.Item>
        			<Menu.Item key="nav_four">
          				<Icon type="appstore" />科技
        			</Menu.Item>
        			<Menu.Item key="nav_five">
          				<Icon type="appstore" />娱乐
        			</Menu.Item>
        			<Menu.Item key="nav_six">
          				<Icon type="appstore" />体育
        			</Menu.Item>
        			<Menu.Item key="nav_seven">
          				<Icon type="appstore" />生活
        			</Menu.Item>
        			<Menu.Item key="nav_eight">
          				<Icon type="appstore" />社会
        			</Menu.Item>
              {userShow}
        			</Menu>
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
                <Tabs type="card" onChange={this.callback.bind(this)}>
                <TabPane tab="登陆" key="1">
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
                  <TabPane tab="注册" key="2" >
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
				</Col>
				<Col span={2}></Col>
			</Row>
			</header>
			)
	};
};
export default PCHeader=Form.create()(PCHeader); 