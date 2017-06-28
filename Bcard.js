import React from 'react';
import {
  View,
	StyleSheet,
  Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
  Modal,
  Animated,
  DatePickerIOS,
  TextInput,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
	Dimensions,
  DatePickerAndroid,
	TimePickerAndroid,
	ToastAndroid,
	BackAndroid,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import Push from './Push';
import PassState from './PassState';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import Picker from 'react-native-picker';
import Toast from '@remobile/react-native-toast';
import SelectPoeple from './SelectPoeple';
var array = [];
var aa=[];
var daka=[];
var qj_cates=null;
export default class Bcard extends React.Component {

    constructor(props) {
        super(props);
		    this._pressButton = this._pressButton.bind(this);
			  BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
    		this.state = {
          ckname:'请选择类型',
          shows:false,
          result: '请选择(必填)',
          result1: '请选择(必填)',
          fadeAnim: new Animated.Value(0),
    			bottom:new Animated.Value(-260),
    			bottom1:new Animated.Value(-260),
          date:new Date(),
          timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
          add:false,
          results:'',
          results1:'',
          textaera:'',
          textaerax:'',
          text:'',
          modalpoeple:false,
          poepleName:'请选择审核人',
          domain:'',
          uid:'',
          cid:'',
          token:'',
          id:'',
          shDatas:[],
          shNames:[''],
          shUID:'',
          showsx:true,
          statua:false,
          dakas:[''],
          timesshow:false,
    	  };
    }

    _pressButton() {
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
			      return true;
        }
		        return false;
    }
    componentDidMount() {
        daka = [];
        this.setState({domain:data.data.domain,uid:data.data.uid,cid:data.data.cid,token:data.data.token,})
        this.timer = setTimeout(() => {this.GetSh();this.Getstatu()},800);
    }

    _shuax(){
      this.setState({showsx:true,statua:false,})
      this.GetSh();
      this.Getstatu();
    }

    GetSh(){
      var that = this;
      aa = [];
      fetch('' + this.state.domain + '/index.php?app=Account&m=ExpenseApi&a=select_auditlist&apps=Account&ms=Expense&as=auditqx&access_token=' + this.state.token + '', {
       method: 'POST',
       headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: this.toQueryString({
          'apps':'Kaoqin',
          'ms':'Jilu',
          'as':'person_shenh'
       })
     })
     .then(function (response) {
       return response.json();
     })
     .then(function (result) {
       console.log(result)
       result.forEach((data,i)=>{
         aa.push(data.name);
         that.setState({shNames:aa});
       })
      that.setState({shDatas:result,showsx:false,});
     })
     .catch((error) => {
       that.setState({showsx:false,statua:true,})
       console.log(error);
     })
    }

    Getstatu(){
      daka = [];
      var that = this;
      fetch('' + this.state.domain + '/index.php?app=Kaoqin&m=KaoqinReportApi&a=get_my_set&access_token=' + this.state.token + '', {
       method: 'POST',
       headers: {
       'Content-Type': 'application/x-www-form-urlencoded',
       },
       body: this.toQueryString({
          'uid':'this.state.uid',
          'cid':'this.state.cid',
       })
     })
     .then(function (response) {
       return response.json();
     })
     .then(function (result) {
        console.log(result);
        that.setState({showsx:false,})
        if(result.data.is_sw_star == 1){
          daka.push('上午上班打卡');
          that.setState({dakas:daka,});
        }if(result.data.is_sw_end == 1){
          daka.push('上午下班打卡');
          that.setState({dakas:daka,});
        }if(result.data.is_xw_star == 1){
          daka.push('下午上班打卡');
          that.setState({dakas:daka,});
        }if(result.data.is_xw_end == 1){
          daka.push('下午下班打卡');
          that.setState({dakas:daka,});
        }if(result.data.is_ws_star == 1){
          daka.push('晚上上班打卡');
          that.setState({dakas:daka,});
        }if(result.data.is_ws_end == 1){
          daka.push('晚上下班打卡');
          that.setState({dakas:daka,});
        }


     })
     .catch((error) => {
       that.setState({showsx:false,statua:true,})
       console.log(error);
     })
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

	componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
	}


  _onPressHandle(){
    this.setState({shows:true});
    this.pickerb.toggle();
  }



  Gdate(n){
		if(n<10){
			 return '0'+n;
		}
		 else{
		     return ''+n;
		}
	}

  onDateChange(date) {

      this.setState({date: date});
  }

  _startTime(){
    Animated.timing(
    this.state.bottom,
    {
      toValue: 0,
      duration: 200,
    },

    ).start();
    this.setState({
         add:!this.state.add,
         timesshow:true,
    });
    }

    _cancle(){

    	    Animated.timing(
 				this.state.bottom,
 				{
 				  toValue: -260,
 				  duration: 200,
 				},

 			  ).start();
    	    Animated.timing(
 				this.state.bottom1,
 				{
 				  toValue: -260,
 				  duration: 200,
 				},

 			  ).start();
    	    this.setState({
       	     add:!this.state.add,
         });
    }


    _finish(){

       this.setState({
       	 result: this.state.date.getFullYear()+'-'+this.Gdate((this.state.date.getMonth()+1))+'-'+this.Gdate(this.state.date.getDate())+' '+this.Gdate(this.state.date.getHours())+':'+this.Gdate(this.state.date.getMinutes()),
          date:new Date(),
          add:false,
         });
        Animated.timing(
 				this.state.bottom,
 				{
 				  toValue: -260,
 				  duration: 200,
 				},

 			  ).start();
    }




    _adds(){
 		this.setState({add:false,})
 		 Animated.timing(
 				this.state.bottom1,
 				{
 				  toValue: -260,
 				  duration: 200,
 				},

 			  ).start();

 		 Animated.timing(
 				this.state.bottom,
 				{
 				  toValue: -260,
 				  duration: 200,
 				},

 			  ).start();
 	}

    _selectPeople(){
      this.pickera.toggle();
      this.setState({shows:true});
    }

    _select(data){
  		this.setState({
        poepledata:data,
  			modalpoeple: false,
  		});

  	}

    _lmodalpoeple(visible){
  		 this.setState({modalpoeple: visible,});
  	}

    trim(str) {
  		 return str.replace(/(^\s*)|(\s*$)/g, ""); 		　　
  	}
    _submit(){
      var that = this;
      if(this.state.ckname == '请选择类型'){
        Toast.showShortBottom("请选择请假类型")
        return false;
      }else if(this.state.result == '请选择(必填)'){
        Toast.showShortBottom("补卡时间未选")
  			return false;
  		}else if(this.state.poepleName == '请选择审核人'){
        Toast.showShortBottom("请选择审核人")
  			return false;
      }else if(this.trim(this.state.textaera) == ''){
        Toast.showShortBottom("请填写补卡原因")
  			return false;
      }else{
        fetch('' + this.state.domain + '/index.php?app=Kaoqin&m=KaoqinReportApi&a=add_kaoqin_record&access_token=' + this.state.token + '', {
         method: 'POST',
         headers: {
         'Content-Type': 'application/x-www-form-urlencoded',
         },
         body: this.toQueryString({
              'uid': this.state.uid,
              'cid': this.state.cid,
              'to_time': this.state.result,
              'grade_id': this.state.shUID,
              'jilu_cate':6,
              'qj_cate':qj_cates,
              'reason':this.state.textaera
         })
       })
       .then(function (response) {
         return response.json();
       })
       .then(function (result) {
         if(result.status == 1){
           Toast.showShortBottom("提交成功")
           that._pressButton();
         }else{
           Toast.showShortBottom("提交失败")
         }
        console.log(result);

       })
       .catch((error) => {
         console.log(error);
         Toast.showShortBottom("提交失败")
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
    												<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false} adjustsFontSizeToFit={false}>返回</Text>
    										  </View>
    									</TouchableOpacity>
    						  </View>
    						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
    									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
    												<Text style={{color:'white',fontSize:18}} allowFontScaling={false} adjustsFontSizeToFit={false}>补卡申请</Text>
    									</View>
    						  </View>
    						  <View style={{flex:1,justifyContent:'center'}}>
                    <TouchableOpacity onPress={this._submit.bind(this)}>
                       <View style={{justifyContent:'flex-end',flexDirection:'row',alignItems:'center',}}>
                         <Text style={{color:'white',fontSize:16,marginRight:10,}} allowFontScaling={false} adjustsFontSizeToFit={false}>提交</Text>
                       </View>
                   </TouchableOpacity>
    						  </View>
					    </View>

    					<ScrollView style={{flexDirection:'column',backgroundColor:'#ececec',flex:1}}>
                <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                       补卡类型
                   </Text>
                   <TouchableOpacity activeOpacity={0.8} onPress={this._onPressHandle.bind(this)}  style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                     <View style={{flex:1,}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                           {this.state.ckname}
                         </Text>
                     </View>
                     <Icon name="ios-arrow-forward" color="#999"size={27}  />
                   </TouchableOpacity>
                </View>
                <View  style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',paddingLeft:10,marginTop:15,}}>
                  <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>补卡时间</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={this._startTime.bind(this)} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                      <View style={{flex:1,}}>
                          <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                              {this.state.result}
                          </Text>
                      </View>
                      <Icon name="ios-arrow-forward" color="#999"size={27}  />
                    </TouchableOpacity>
                </View>


                <View style={{flexDirection:'row',height:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',borderBottomWidth:1,borderColor:'#dcdcdc',paddingLeft:10,marginTop:15}}>
                   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{color:'#333',fontSize:14}}>
                       审核人
                   </Text>
                   <TouchableOpacity activeOpacity={0.8} onPress={this._selectPeople.bind(this)} style={{flex:1,marginLeft:15,flexDirection:'row',alignItems:'center',paddingRight:10,height:50,}}>
                     <View style={{flex:1,}}>
                         <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,textAlign:'right',paddingRight:15, alignItems:'center'}}>
                           {this.state.poepleName}
                         </Text>
                     </View>
                     <Icon name="ios-arrow-forward" color="#999"size={27}  />
                   </TouchableOpacity>
                </View>

                <View style={{flexDirection:'row',backgroundColor:'#fff',alignItems:'flex-start',justifyContent:'center',borderTopWidth:1,borderBottomWidth:1,borderColor:'#dcdcdc',marginTop:15,paddingLeft:10,}}>
                   <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:14,color:'#333', paddingTop:5,}}>理由</Text>
                   <View style={{flex:1,marginLeft:15,}}>
                     <TextInput
                       onChangeText={(textaera) => this.setState({textaera})}
                       multiline={true}
                       numberOfLines={5}
                       placeholderTextColor={'#ccc'}
                       style={{ color:'#666',fontSize:14,textAlignVertical:'top',paddingTop:0,height:120}}
                       placeholder='原因(必填)'
                       underlineColorAndroid={'transparent'}
                     />
                   </View>
               </View>

    					</ScrollView>

              {this.state.add ? <TouchableOpacity onPress={this._adds.bind(this)}  style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-65,position:'absolute',top:65,left:0,backgroundColor:'rgba(130, 130, 130, 0.37)'}}>
              <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-65,backgroundColor:'rgba(61, 61, 62, 0)',position:'absolute',top:0,left:0,}}></View>
              </TouchableOpacity> : <View></View>}
              {this.state.timesshow ? <Animated.View style={{flexDirection:'column',height:260,position:'absolute',bottom:this.state.bottom,left:0,width:Dimensions.get('window').width,backgroundColor:'#eee'}}>
                  <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height:45,paddingRight:10,paddingLeft:10,backgroundColor:'#fff'}}>
                      <TouchableOpacity activeOpacity={0.8}  onPress={this._cancle.bind(this)}><Text style={{fontSize:16,}}allowFontScaling={false}>取消</Text></TouchableOpacity>
                      <TouchableOpacity activeOpacity={0.8}  onPress={this._finish.bind(this)}><Text style={{fontSize:16,}}allowFontScaling={false}>完成</Text></TouchableOpacity>
                  </View>
                  <View style={{flex:1,}}>
                       <DatePickerIOS
                  date={this.state.date}
                  mode="datetime"
                  timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                  onDateChange={this.onDateChange.bind(this)}
                />
                  </View>
              </Animated.View> : null}

              {this.state.shows ? <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height,backgroundColor:'rgba(107, 107, 107, 0.43)',position:'absolute',top:0,left:0}}></View> : null}
              {this.state.showsx ? <View style={{justifyContent: 'center',alignItems: 'center', height:Dimensions.get('window').height-50,width:Dimensions.get('window').width,overflow:'hidden',position:'absolute',top:0,left:0}}>
                <View style={styles.loading}>
                        <ActivityIndicator color="#fff"/>
                        <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={styles.loadingTitle}>加载中……</Text>
                    </View>
              </View> : null}
              {this.state.statua ? <View style={{padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
               <TouchableOpacity activeOpacity={1}  style={{justifyContent:'flex-start',alignItems:'center',}} onPress={this._shuax.bind(this)} >
                <Icon name="ios-refresh-outline" color="#fff"size={36}  />
                <Text allowFontScaling={false} adjustsFontSizeToFit={false} style={{fontSize:16,color:'#fff',marginTop:20,}}>加载失败，请点击重试。</Text>
                       </TouchableOpacity>
                   </View> : <View></View>}

                   <Picker
                    ref={picker => this.pickera = picker}
                    style={{height: 250,backgroundColor:'#fff',}}
                    pickerToolBarStyle={{height:45,}}
                    pickerBtnStyle ={{fontSize:16,color:'#000',}}
                    showDuration={300}
                    pickerBtnText='确定'
                    pickerCancelBtnText='取消'
                    selectedValue={this.state.shNames[0]}
                    pickerData={this.state.shNames}
                    onPickerCancel={()=>{this.setState({shows:false});}}
                    onPickerDone={(pickedValue) => {
                      this.setState({poepleName:pickedValue,shows:false});
                      this.state.shDatas.forEach((data,i)=>{
                        if(pickedValue == data.name){
                          this.setState({shUID:data.uid});
                        }
                      })
                    }}
                    />

                    <Picker
                     ref={picker => this.pickerb = picker}
                     style={{height: 250,backgroundColor:'#fff',}}
                     pickerToolBarStyle={{height:45,}}
                     pickerBtnStyle ={{fontSize:16,color:'#000',}}
                     showDuration={300}
                     pickerBtnText='确定'
                     pickerCancelBtnText='取消'
                     selectedValue={this.state.dakas[0]}
                     pickerData={this.state.dakas}
                     onPickerCancel={()=>{this.setState({shows:false});}}
                     onPickerDone={(pickedValue) => {
                       this.setState({ckname:pickedValue,shows:false});
                       if(pickedValue == '上午上班打卡'){
                         qj_cates=1;
                       }if(pickedValue == '上午下班打卡'){
                         qj_cates=2;
                       }if(pickedValue == '下午上班打卡'){
                         qj_cates=3;
                       }if(pickedValue == '下午下班打卡'){
                         qj_cates=4;
                       }if(pickedValue == '晚上上班打卡'){
                         qj_cates=5;
                       }if(pickedValue == '晚上下班打卡'){
                         qj_cates=6;
                       }
                     }}
                     />
                     <Push navigator = {this.props.navigator} {...this.props}/>
                     <PassState navigator = {this.props.navigator} {...this.props}/>
             </View>
           	)
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
	footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
    },

    footerTitle: {
        marginLeft: 10,
        fontSize: 15,
        color: 'gray'
    },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
