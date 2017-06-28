import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	ScrollView,
	ActivityIndicator,
	InteractionManager,
	Dimensions,
	ToastAndroid,
    Modal,
    Animated,
	BackAndroid,
    ActionSheetIOS,
    CameraRoll,
	Image,
	RefreshControl,
	ListView,
} from 'react-native';
import PassState from './PassState';
import Toast from '@remobile/react-native-toast';
import Token from './Token';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
var array = [];
var aa=[];
var BUTTONS = [
  '保存到相册',
  '取消',
];
var images = [];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;
export default class YTjinfoa extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
			BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
		this.state = {
		    tp:false,
            infos:'',
            statu:false,
            bcimg:'',
	  };
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

    }



	tup(){
        var ims={url:this.props.imgs.uri};
        images=[];
        images.push(ims)
        this.setState({tp:true,bcimg:this.props.imgs.uri})
    }

	showActionSheet() {
    var that=this;
    ActionSheetIOS.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
    },
    (buttonIndex) => {
      if(buttonIndex == 0){
          CameraRoll.saveToCameraRoll(this.state.bcimg);
          that.setState({
            statu:true,
            infos:'保存成功'
          })
          that.timerx = setTimeout(() => {
                      that.setState({
                         statu:false,
                    })
                  },1000)
      }else{
        console.log(1)
      }
    });
  }

    render() {
           return (
                <View style={{flex:1,flexDirection:'column',}}>
		           <View style={styles.card}>
						  <View style={{flex:1,justifyContent:'center'}}>
									 <TouchableOpacity onPress={this._pressButton.bind(this)}>
										  <View style={{justifyContent:'flex-start',flexDirection:'row',alignItems:'center',}}>
												<Image source={require('./imgs/back.png')} style={{width: 25, height: 25,marginLeft:5,}} />
												<Text style={{color:'white',fontSize:16,marginLeft:-5,}} allowFontScaling={false}>返回</Text>
										  </View>
									</TouchableOpacity>
						  </View>
						  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
									<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
												<Text style={{color:'white',fontSize:18}} allowFontScaling={false}> 详情</Text>
									</View>
						  </View>
						  <View style={{flex:1,justifyContent:'center'}}>

						  </View>
					</View>

					<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
						  <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                    <Icon name="ios-time-outline" color="#999"size={20}  />
                                    <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>签到时间:</Text>
                                    <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>{this.props.data.time}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'flex-start',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                <Icon name="ios-locate-outline" color="#aaa"size={20}  />
                                <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>签到地点:</Text>
                                <Text style={{paddingLeft:10,flex:1,paddingRight:5,fontSize:14,}} allowFontScaling={false}>{this.props.data.address}</Text>
                          </View>
                          <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                <Icon name="ios-contact-outline" color="#999"size={20}  />
                                <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>客户名称:</Text>
                                <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>{this.props.data.gsy_id}</Text>
                          </View>
                          {this.props.data.contacts_id ? <View style={{flexDirection:'row',height:50,alignItems:'center',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                <Icon name="ios-contact" color="#999"size={20}  />
                                <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>联系人:</Text>
                                <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>{this.props.data.contacts_id}</Text>
                          </View> : null}
                          <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'flex-start',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                <Icon name="ios-alert-outline" color="#aaa"size={20}  />
                                <Text style={{paddingLeft:10,fontSize:14,lineHeight:20}} allowFontScaling={false}>备注:</Text>
                                <Text style={{paddingLeft:10,flex:1,paddingRight:5,fontSize:14,lineHeight:20}} allowFontScaling={false}>{this.props.data.mark}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'flex-start',borderBottomWidth:1,borderColor:'#ececec',paddingLeft:10,}}>
                                    <Icon name="ios-images-outline" color="#999"size={20}  />
                                    <Text style={{paddingLeft:10,fontSize:14,}} allowFontScaling={false}>图片附件:</Text>
                                    <TouchableOpacity onPress={this.tup.bind(this)} style={{width: 60, height: 60,alignItems:'center', justifyContent:'center',marginLeft:15}}>
                                        <View style={{width: 60, height: 60,alignItems:'center', justifyContent:'center',marginLeft:15}}>
                                           <Image source={this.props.imgs} style={{width: 60, height: 60,}} />
                                        </View>
                                    </TouchableOpacity>
                          </View>
                      <Modal visible={this.state.tp}
                          animationType={"fade"}
                          onRequestClose={() => {console.log("Modal has been closed.")}}
                           transparent={false}>

                                <ImageViewer saveToLocalByLongPress={false} onClick={(close)=>{this.setState({tp:false})}} imageUrls={images}/>
                                <TouchableOpacity onPress={this.showActionSheet.bind(this)} style={{position:'absolute',bottom:0,right:30}}>
                                <View style={{backgroundColor:'transparent'}}><Icon name="ios-list-outline" color="#fff"size={50}  /></View>
                                </TouchableOpacity>
                                {this.state.statu ? <Animated.View style={{ padding:10,width:200,backgroundColor:'rgba(23, 22, 22, 0.7)',justifyContent:'flex-start',alignItems:'center',position:'absolute',top:(Dimensions.get('window').height-150)/2,left:(Dimensions.get('window').width-200)/2,}}>
                                  <Icon name="ios-checkmark-outline" color="#fff"size={50}  />
                                  <Text style={{fontSize:16,color:'#fff',marginTop:20,}} allowFontScaling={false}>{this.state.infos}</Text>
                                </Animated.View> : null}
                    </Modal>
					</View>
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
