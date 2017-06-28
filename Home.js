import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	StatusBar,
	ScrollView,
  PushNotificationIOS,
	RefreshControl,
	InteractionManager,
	Image
} from 'react-native';
import Toast from '@remobile/react-native-toast';
import News from './News';
import Netinfo from './Netinfo';
import Calendar from './Calendar';
import Approval from './Approval';
import Operation from './Operation';
import Token from './Token';
import scanner from './scanner';
import Icon from 'react-native-vector-icons/Ionicons';
import Personal from './Personal';
export default class Home extends React.Component {

	constructor(props) {
        super(props);
		this.state = {

		  id: '',
		  uid:'',
		  datas:[],
		  imgs:[],
		  loaded: false,
		  isLoadMore:false,
		  p:1,
		  data:'',
		  data_a:'',
		  data_b:'',
		  isReach:false,
		  isRefreshing:false,
		  isNull:0,
		  isNull_a:0,
		  isNull_b:0,
	  };
    }

	  componentDidMount() {

           console.log(data)
	       this.fetchData('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
           this.fetchData_a('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
           this.fetchData_b('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');

    }

    componentWillReceiveProps(nextProps) {
		if(nextProps.bgCount == 0 && nextProps.xxCount == 0 && nextProps.ywCount == 0){
			return false;
		}else if(nextProps.bgCount != undefined && nextProps.xxCount == undefined && nextProps.ywCount == undefined){
			this.setState({
			  isNull_a:nextProps.bgCount,
			  data_a:nextProps.Contents,
			})
		}else if(nextProps.bgCount == undefined && nextProps.xxCount != undefined && nextProps.ywCount == undefined){
			this.setState({
			  isNull: nextProps.xxCount,
			  data:nextProps.Contents,
			})
		}else if(nextProps.bgCount == undefined && nextProps.xxCount == undefined && nextProps.ywCount != undefined){
			this.setState({
			  isNull_b: nextProps.ywCount,
			  data_b:nextProps.Contents,
			})
		}else{
			this.setState({
			  isNull_b: nextProps.ywCount,
			  isNull_a: nextProps.bgCount,
			  isNull: nextProps.xxCount,
			})

		}

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

	fetchData(url) {
		var that=this;

		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'type': 1,
					'status': -1,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {

					 console.log(result)
					  that.setState({
						   isNull:result.count,
						   isRefreshing:false,
                           data:null,
					  })
		              that.props.totalnums.bind(that,result.count,true)();
                      if(result.count>0){
						that.setState({
						   data:result.data[result.data.length-1].content,
						   isRefreshing:false,
					    })
					  }
				})
				.catch((error) => {

							that.setState({
								   isRefreshing:false,
							   })

							Toast.showShortBottom("加载失败，请下拉刷新")
						  });
	}

	fetchData_a(url) {
		var that=this;
		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'type': 3,
					'status': 0,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 console.log(result)
					  that.setState({
						   isNull_a:result.count,
						   data_a:null,
						   isRefreshing:false,
					  })
			          that.props.totalnums_a.bind(that,result.count,true)();
                      if(result.count>0){
						that.setState({
						   data_a:result.data[0].content,
						   isRefreshing:false,
					    })
					  }
				})
	}

	fetchData_b(url) {
		var that=this;
		fetch(url, {
				  method: 'POST',
				  headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				  },
				  body: this.toQueryString({
					'type': 2,
					'status': 0,
				  })
				})
				.then(function (response) {
                    return response.json();
				})
				.then(function (result) {
					 console.log(result)
					  that.setState({
						   isNull_b:result.count,
						   data_b:null,
						   isRefreshing:false,
					  })
			          that.props.totalnums_b.bind(that,result.count,true)();
                      if(result.count>0){
						that.setState({
						   data_b:result.data[0].content,
						   isRefreshing:false,
					    })
					  }
				})
	}




	_newButton(){
		let _this=this;
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'News',
                component: News,

            })
			})
        }
	}

    _pressButton(){
        var { navigator } = this.props;
        if(navigator) {
            InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'Calendar',
                component: Calendar,
            })
            })
        }
    }

    _AppButton(){
    	let _this=this;
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'Approval',
                component: Approval,

            })
			})
        }
	}

	_OperationButton(){
		var _this=this;
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'Operation',
                component: Operation,

            })
			})
        }
	}

	scanner(){
		var _this=this;
		var { navigator } = this.props;
        if(navigator) {
			InteractionManager.runAfterInteractions(() => {
            navigator.push({
                name: 'scanner',
                component: scanner
            })
			})
        }
	}





	render() {
        return (
          <View style={{flex:1,backgroundColor:'#fafafa',}}>
            <View style={styles.card}>
              <View style={{width:50,height:20,}}></View>
			  <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
					<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
						<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>{data.data.companyName}</Text>
					</View>
			  </View>
			  <TouchableHighlight  activeOpacity={1} >
				  <View style={{width:50,alignItems:'center',justifyContent:'center'}}>

				  </View>
			  </TouchableHighlight>
			</View>
			<Netinfo  {...this.props}/>
		    <ScrollView style={{flex:1,flexDirection:'column',}} automaticallyAdjustContentInsets={false}
		     refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh.bind(this) }
                colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
				progressBackgroundColor="#000000"
                />
             }
		    >
					   <View  style={{flex:1,flexDirection:'row',alignItems:'center', backgroundColor:'#fafafa',}}>
					       <TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._newButton.bind(this)}

								 style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#000', }}>
						     <View style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#fafafa',paddingLeft:10,}}>
							   <View style={{width: 50, height: 50,borderRadius:25,backgroundColor:'#1ADA9A',alignItems:'center', justifyContent:'center'}}>
						           <Image source={require('./imgs/xiaox.png')} style={{width: 30, height: 30,}} />
							   </View>
							   <View style={{marginLeft:10,flex:1,flexDirection:'row',borderBottomWidth:1, borderColor:'#ccc',}}>
								   <View style={{flex:1,flexDirection:'column', height: 65,paddingTop:10,paddingBottom:10 }}>
                <Text style={{ fontSize:16,color:'#333',marginTop:5,}} allowFontScaling={false}>消息</Text>
                {this.state.data ? <Text numberOfLines={1} style={{ fontSize:12,color:'#999',paddingTop:6,flex:1,overflow:'hidden',}} allowFontScaling={false}>{this.state.data}</Text> : <Text style={{color:'#ccc',marginTop:8,}} allowFontScaling={false}></Text>}
								   </View>
								   <View style={{width:50,height:50,alignItems:'center',justifyContent:'center',borderRadius:18,}}>
									 <View style={{backgroundColor:'#F53B5C',borderRadius:18,overflow:'hidden'}}>
										 {this.state.isNull>0 ? <Text style={{color:'#ffffff',paddingTop:1,paddingBottom:1,paddingLeft:6,paddingRight:6,fontSize:12,}} allowFontScaling={false}>{this.state.isNull}</Text> : <Text allowFontScaling={false}></Text>}
									 </View>
								   </View>
							   </View>
							 </View>
						   </TouchableOpacity  >

					   </View>
					   <View  style={{flex:1,flexDirection:'row',alignItems:'center', backgroundColor:'#fafafa',}}>
					       <TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._AppButton.bind(this)}
								 style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#000', }}>
						     <View style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#fafafa',paddingLeft:10,}}>
						        <View style={{width: 50, height: 50,borderRadius:25,backgroundColor:'#35DCEF',alignItems:'center', justifyContent:'center'}}>
						           <Image source={require('./imgs/sp.png')} style={{width: 30, height: 30,}} />
							   </View>
                                 <View style={{marginLeft:10,flex:1,flexDirection:'row',borderBottomWidth:1, borderColor:'#ccc',  }}>
								   <View style={{flex:1,flexDirection:'column', height: 65,paddingTop:8,paddingBottom:10 }}>
									  <Text style={{ fontSize:16,color:'#333',marginTop:5,}} allowFontScaling={false}>办公审批</Text>
									  {this.state.data_a ? <Text numberOfLines={1} allowFontScaling={false} style={{ fontSize:12,color:'#999',paddingTop:6,flex:1,overflow:'hidden',}}>{this.state.data_a}</Text> : <Text style={{color:'#ccc',marginTop:8,}} allowFontScaling={false}></Text>}
								   </View>
								   <View style={{width:50,height:50,alignItems:'center',justifyContent:'center'}}>
									 <View style={{backgroundColor:'#F53B5C',borderRadius:18,overflow:'hidden'}}>
									  {this.state.isNull_a>0 ? <Text style={{color:'#ffffff',paddingTop:1,paddingBottom:1,paddingLeft:6,paddingRight:6,fontSize:12,}} allowFontScaling={false}>{this.state.isNull_a}</Text> : <Text allowFontScaling={false}></Text>}
									 </View>
								   </View>
							   </View>

							 </View>
						   </TouchableOpacity  >
					   </View>
					   <View  style={{flex:1,flexDirection:'row',alignItems:'center', backgroundColor:'#fafafa',}}>
					       <TouchableOpacity
						          activeOpacity={0.8}
                                  onPress={this._OperationButton.bind(this)}

								 style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#000', }}>
						     <View style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#fafafa',paddingLeft:10,}}>
						       <View style={{width: 50, height: 50,borderRadius:25,backgroundColor:'#718DC1',alignItems:'center', justifyContent:'center'}}>
						           <Image source={require('./imgs/sp1.png')} style={{width: 30, height: 30,}} />
							   </View>
							   <View style={{marginLeft:10,flex:1,flexDirection:'row',borderBottomWidth:1, borderColor:'#ccc',  }}>
								   <View style={{flex:1,flexDirection:'column', height: 65,paddingTop:8,paddingBottom:10 }}>
									  <Text style={{ fontSize:16,color:'#333',marginTop:5,}} allowFontScaling={false}>业务审批</Text>
									  {this.state.data_b ? <Text numberOfLines={1} allowFontScaling={false} style={{ fontSize:12,color:'#999',paddingTop:6,flex:1,overflow:'hidden',}}>{this.state.data_b}</Text> : <Text style={{color:'#ccc',marginTop:8,}} allowFontScaling={false}></Text>}
								   </View>
								   <View style={{width:50,height:50,alignItems:'center',justifyContent:'center'}}>
									 <View style={{backgroundColor:'#F53B5C',borderRadius:18,overflow:'hidden'}}>
									  {this.state.isNull_b>0 ? <Text allowFontScaling={false} style={{color:'#ffffff',paddingTop:1,paddingBottom:1,paddingLeft:6,paddingRight:6,fontSize:12,}}>{this.state.isNull_b}</Text> : <Text allowFontScaling={false}></Text>}
									 </View>
								   </View>
							   </View>
							 </View>
						   </TouchableOpacity  >
					   </View>
					   <View  style={{flex:1,flexDirection:'row',alignItems:'center', backgroundColor:'#fafafa',}}>
					       <TouchableOpacity
						         activeOpacity={0.8}
                                 onPress={this._pressButton.bind(this)}

								 style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#000', }}>
						     <View style={{flex:1,flexDirection:'row',alignItems:'center',backgroundColor:'#fafafa',paddingLeft:10,}}>
						       <View style={{width: 50, height: 50,borderRadius:25,backgroundColor:'#978BC3',alignItems:'center', justifyContent:'center'}}>
						           <Image source={require('./imgs/rc.png')} style={{width: 30, height: 30,}} />
							   </View>
							  <View style={{marginLeft:10,flex:1,flexDirection:'column',borderBottomWidth:1, borderColor:'#ccc', height: 65,paddingTop:10, }}>
							      <Text style={{ fontSize:16,color:'#666',marginTop:5,}} allowFontScaling={false}>日程</Text>
								  <Text style={{ fontSize:13,paddingTop:6,}} allowFontScaling={false}></Text>
							   </View>
							 </View>
						   </TouchableOpacity  >
					   </View>


					</ScrollView>
				</View>
		)
	}

	_onRefresh() {
		 this.setState({
			   isRefreshing:true,
		  })


		   this.fetchData('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
           this.fetchData_a('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');
           this.fetchData_b('' + data.data.domain + '/index.php?app=Home&m=AuditApi&a=getAudit&uid='+data.data.uid+'&cid='+data.data.cid+'&access_token=' + data.data.token + '');

	  }

}
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    flexDirection: 'column',
	backgroundColor:'#fafafa',
  },
  card: {
    paddingTop:20,
    height:65,
	backgroundColor:'#4385f4',
	alignItems:'center',
	flexDirection:'row'
  },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
