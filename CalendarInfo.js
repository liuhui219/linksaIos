import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
	TextInput,
	ScrollView,
	Dimensions,
	BackAndroid,
	Image
} from 'react-native';
import PassState from './PassState';
import Push from './Push';
import Toast from '@remobile/react-native-toast';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';
import Token from './Token';
export default class CalendarInfo extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {id: '',uid:'',datas:{},dataA:[],imgs:[],textaera:'',loaded: false,};
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            //很熟悉吧，入栈出栈~ 把当前的页面pop掉，这里就返回到了上一个页面了
            navigator.pop();
			return true;
        }
		return false;
    }
    componentDidMount() {
        //这里获取传递过来的参数: name

        this.setState({
            id: this.props.id,
			uid: this.props.uid,
        });
		this.timer = setTimeout(
		() => { this.fetchData('' + data.data.domain + '/index.php?app=Calendar2&m=CalendarApi&a=Calendar_list&uid='+this.props.uid+'&id='+this.props.id+'&access_token=' + data.data.token + ''); },
		  800
		);
    }

	componentWillUnmount() {
	     this.timer && clearTimeout(this.timer);
    }
	fetchData(url) {
		fetch(url)
		  .then((response) => response.json())
		  .then((responseData) => {

				this.setState({
					datas: responseData.array,
					dataA : responseData.list,
                    loaded: true,
				});
               var aa=[];
			   var that=this;
			   if(responseData.list != null){
				responseData.list.forEach((img, i) => {
					key={i}
					var IMG =  {uri:data.data.domain.slice(0,-6) + img.src.slice(1)}
					aa.push(IMG)
					that.setState({
						imgs: aa,

					});
				})
			   }

		  })
		  .done(

		  );
    }
	toQueryString(obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];
			if (Array.isArray(val)) {
				return val.sort().map(function (val2) {
					return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
				}).join('&');
			}

			return encodeURIComponent(key) + '=' + encodeURIComponent(val);
		}).join('&') : '';
	}

	trim(str)
	   {
		 return str.replace(/(^\s*)|(\s*$)/g, ""); 		　　
	   }

	_send(){
    Keyboard.dismiss();

	    var that = this
		if(this.trim(this.state.textaera) == ''){
      Toast.showShortBottom("评论内容不能为空")
			return false;
		}else{
      this.setState({
  			loaded: false,
  		});
		fetch('' + data.data.domain + '/index.php?app=Calendar2&m=CalendarApi&a=answer&access_token=' + data.data.token + '', {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			  },
			 body: this.toQueryString({
				'id': this.props.id,
				'uid':this.props.uid,
        'comment':this.state.textaera
			})

			})
			.then(function (response) {
				return response.json();
			})
			.then(function (result) {
				console.log(result);
				if(result.statu == 1){
					that.setState({
						textaera: '',
                        loaded: true,
					});
					that.fetchData('' + data.data.domain + '/index.php?app=Calendar2&m=CalendarApi&a=Calendar_list&uid='+that.props.uid+'&id='+that.props.id+'&access_token=' + data.data.token + '');
				}
			})
		}
	}

    render() {
    return (
	   <View style={{flex:1,flexDirection:'column',}}>
           <View style={styles.card}>
				  <View style={{flex:1,justifyContent:'center'}}>
							 <TouchableOpacity onPress={this._pressButton.bind(this)}>
								  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
								        <Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
										<Text style={{color:'white',fontSize:16,marginLeft:-5,}}allowFontScaling={false}>返回</Text>
								  </View>
							</TouchableOpacity>
				  </View>
				  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
							<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
										<Text style={{color:'white',fontSize:16}}allowFontScaling={false}>日程详情</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
			</View>
			<ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='never' style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>
			    <View style={{backgroundColor:'#fff',flexDirection:'column',}}>
			      <View style={{borderBottomWidth:0.5,borderColor:'#bbb',flexDirection:'row',height:50,alignItems:'center',paddingLeft:15,flex:1, }}>
				     <Icon name="calendar" color="#666"size={20}  />
				     <Text style={{fontSize:16,paddingLeft:5,}}allowFontScaling={false}>{this.state.datas.type}</Text>
				  </View>
				  <View style={{borderBottomWidth:0.5,borderColor:'#bbb',flexDirection:'column',height:60,marginLeft:15,justifyContent:'center', }}>
				     <Text style={{fontSize:14,}}allowFontScaling={false}>
					    {this.state.datas.title}
					 </Text>
					 <Text style={{fontSize:14,color:'#aaa',paddingTop:5,}}allowFontScaling={false}>
					    {this.state.datas.start}——{this.state.datas.end}
					 </Text>
				  </View>
				  <View style={{marginLeft:15,flexDirection:'row',borderBottomWidth:0.5,borderColor:'#bbb',alignItems:'center',justifyContent:'space-between',height:50,paddingRight:15,}}>
				     <Text allowFontScaling={false}>优先等级</Text>
					 <Text allowFontScaling={false}> {this.state.datas.important_name}</Text>
				  </View>
				  <View style={{marginLeft:15,flexDirection:'row',borderBottomWidth:0.5,borderColor:'#bbb',alignItems:'center',justifyContent:'space-between',height:50,paddingRight:15,}}>
				     <Text allowFontScaling={false}>提前通知</Text>
					 <Text allowFontScaling={false}>{this.state.datas.tixintime}</Text>
				  </View>
				  <View style={{flexDirection:'row',borderBottomWidth:1,borderColor:'#bbb',alignItems:'center',paddingRight:15,paddingTop:15,paddingBottom:15,}}>
				     <Text style={{width:80,marginLeft:15,alignSelf:'flex-start',}}allowFontScaling={false}>内        容</Text>
					 <Text style={{flexWrap:'wrap',flex:1,fontSize:14}} allowFontScaling={false}>{this.state.datas.contents}</Text>
				  </View>
				</View>
				<View style={{height:15,backgroundColor:'#ececec'}}></View>
                <View style={{backgroundColor:'#fff',flexDirection:'column',flex:1,}}>
				  <View style={{borderBottomWidth:0.5,borderColor:'#bbb',flexDirection:'row',height:50,alignItems:'center',paddingLeft:15,paddingRight:15,}}>
				     <Icon name="comments-o" color="#666"size={20}  />
				     <Text style={{fontSize:16,paddingLeft:5,}} allowFontScaling={false}>评论</Text>
					 <Text style={{fontSize:14,paddingLeft:5,paddingLeft:10,color:'#bbb',flex:1,textAlign:'right',}} allowFontScaling={false}>共有{this.state.dataA == null ? 0 : this.state.dataA.length}条回复</Text>
				  </View>
				  {this.state.dataA == null ? <View style={{height:100,alignItems:'center', justifyContent:'center'}}>
				          <Text style={{fontSize:18,}} allowFontScaling={false}>暂无评论</Text>
				    </View> : this.state.dataA.map((tab, i) => {
					return  <View key={i} style={{flexDirection:'row',paddingTop:15,paddingLeft:15,}}>
								<View style={{width: 40, height: 40,borderRadius:20,backgroundColor:'#718DC1',alignItems:'center', justifyContent:'center'}}>
								   <Image source={this.state.imgs[i]} style={{width: 40, height: 40,borderRadius:20,}} />
								</View>
								<View style={{flexDirection:'column',marginLeft:15,flex:1, borderBottomWidth:0.5,borderColor:'#aaa',paddingBottom:15,paddingRight:15,}}>
								   <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
									  <Text allowFontScaling={false}>{tab.u_name}</Text>
									  <Text allowFontScaling={false}>{tab.time}</Text>
								   </View>
								   <Text style={{color:'#aaa',fontSize:14,flexWrap:'wrap',flex:1,paddingTop:5,}} allowFontScaling={false}>{tab.comment}
								   </Text>
								</View>
							  </View>
				  })}
				</View>



			</ScrollView>
			{!this.state.loaded ? <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height,overflow:'hidden',position:'absolute',top:0,left:0,width:Dimensions.get('window').width,}}>
					<View style={styles.loading}>
						<ActivityIndicator color="white"/>
						<Text style={styles.loadingTitle} allowFontScaling={false}>加载中……</Text>
					</View>
				</View> : <View></View>}
      <KeyboardAvoidingView behavior='padding'>
			<View style={{height:60,flexDirection:'row',paddingLeft:10,paddingRight:10, backgroundColor:'#ededed',justifyContent:'center',paddingTop:10,paddingBottom:10,}}>
			   <View  style={{flex:1,borderWidth:1,borderColor:'#4385f4',borderRadius:3,justifyContent:'center',height:40,}}>
			       <TextInput
				      onChangeText={(textaera) => this.setState({textaera})}
					  placeholderTextColor={'#999'}
					  style={{ color:'#666',fontSize:14,height:40,paddingLeft:10,}}
					  placeholder='评论内容(必填)'
					  value={this.state.textaera}
					  underlineColorAndroid={'transparent'}
				   />
			   </View>
			   <TouchableOpacity onPress={this._send.bind(this)} style={{backgroundColor:'#4385f4',height:40,width:70,borderRadius:3,marginLeft:10,alignItems:'center',justifyContent:'center',}}>
			       <Text style={{color:'#fff',fontSize:16,}} allowFontScaling={false}>发送</Text>
			   </TouchableOpacity>
			</View>
      </KeyboardAvoidingView>
      <Push navigator = {this.props.navigator} {...this.props}/>
      <PassState navigator = {this.props.navigator} {...this.props}/>
	  </View>
    );
    }
}
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    flexDirection: 'column',
	backgroundColor:'#fafafa',
  },
  card: {
    height:65,
    paddingTop:20,
	backgroundColor:'#4385f4',
	flexDirection:'row'
  },
  loading: {
        backgroundColor: 'gray',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

    },

    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
