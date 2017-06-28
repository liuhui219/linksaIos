import React, {Component} from 'react';
import {
	Animated,
    View,
	StyleSheet,
    Navigator,
	ListView,
	TouchableOpacity,
	TouchableHighlight,
	TouchableNativeFeedback,
	Text,
	StatusBar,
	Modal,
	ScrollView,
	Dimensions,
	ActivityIndicator,
	Image
} from 'react-native';
import ContactInfo from './ContactInfo';
import Netinfo from './Netinfo';
import Icon from 'react-native-vector-icons/Ionicons';
import SearchBar from 'react-native-search-bar';
let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}
var arrs = [];
var secs = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#']
let heightMsg = {
    'A': 0,
    'B': 0,
    'C': 0,
    'D': 0,
    'E': 0,
    'F': 0,
    'G': 0,
    'H': 0,
    'I': 0,
    'J': 0,
    'K': 0,
    'L': 0,
    'M': 0,
    'N': 0,
    'O': 0,
    'P': 0,
    'Q': 0,
    'R': 0,
    'S': 0,
    'T': 0,
    'U': 0,
    'V': 0,
    'W': 0,
    'X': 0,
    'Y': 0,
    'Z': 0,
    '#': 0,
};

let scroll = 0;


export default class Contacts extends Component {

    constructor(props) {

        super(props);

		var getSectionData = (dataBlob, sectionID) => {
		  return dataBlob[sectionID];
		};
		var getRowData = (dataBlob, sectionID, rowID) => {
		  return dataBlob[rowID];
		};

        this.state = {
		  sx:false,
		  bar:'light-content',
		  backc:'#4385f4',
		  status:false,
		  arrays:[],
		  fadeAnim:new Animated.Value(65),
		  pt:new Animated.Value(0),
		  datas:{},
		  showsCancelButton:false,
		  dataSource: new ListView.DataSource({
		  getRowData: getRowData,
		  getSectionHeaderData: getSectionData,
		  rowHasChanged: (row1, row2) => row1 !== row2,
		  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
		}),
			   loaded: false,
		};



    }
    componentDidMount() {
		this.fetchData();

	  }


    fetchData() {
		fetch('' + data.data.domain + '/index.php?app=Comtxl&m=MobileApi&a=phoneBookAndroid&access_token=' + data.data.token + '')
		  .then((response) => response.json())
		  .then((responseData) => {
		  	                console.log(responseData)
                            this.setState({
								datas:responseData,
							})
							var dataBlob = {};
							var sectionIDs = [];
							var rowIDs = [];
							for (var ii = 0; ii < secs.length; ii++) {
							  var sectionName = secs[ii]
							  sectionIDs.push(sectionName);
							  dataBlob[sectionName] = sectionName;
							  rowIDs[ii] = [];

								  lengths = responseData.data[ii].data;

							  for (var jj = 0; jj < lengths.length; jj++) {
								 lengths[jj].avatar={uri: data.data.domain.slice(0,-6)+lengths[jj].avatar.slice(1)};
			                    var rowNames = lengths[jj].name+jj;
								rowIDs[ii].push(rowNames);

								dataBlob[rowNames] = lengths[jj];



							  }
							}
							this.setState({
								            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
                							loaded: true,
										});


		  })
		  .catch((error) => {

			this.setState({
			        loaded: true,
					sx:true,
				});
		  });
    }

	_shuax(){
		this.setState({
			loaded: false,
			sx:false,
		});
		this.fetchData();
	}

    layoutH(e){
		console.log(e.nativeEvent.layout.height)
		for (var i = 0; i < secs.length; i++) {
		  var lengs = this.state.datas.data[i].data;
		  var sectionNames=secs[i];
		  if(lengs.length>0){
			  heightMsg[sectionNames]=Number(Number(lengs.length*e.nativeEvent.layout.height)+Number(25));
		  }else{
			  heightMsg[sectionNames]=0;
		  }
		}

	}

    moveScroll(e){
        let num = Math.floor((e.nativeEvent.pageY - 89 - Math.floor((Dimensions.get('window').height-540)/2)) / 14);
		console.log(num)
        if(num<1){
			num = 1;
		}
        if (num > 27) {
            num = 27;
        }
        var tab = secs[num-1];
		 if(heightMsg[tab] == 0){
			return false;
		}else{
			scroll=0;
			for (var obj in heightMsg) {
			if(tab == obj){
				break;
			}else{
				scroll+=heightMsg[obj];
			}

		}
		}

		this.refs.myScroll.scrollTo({x: 0, y: scroll, animated: false});
	}

    renderLoadingView() {
		return (
		 <View style={{flex:1}}>
		 <View style={{height:20,backgroundColor:'#4385f4',}}></View>
		    <View  style={styles.card}>
			  <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
					<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
								<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>通讯录</Text>
					</View>
			  </View>
			</View >
			<Netinfo  {...this.props}/>
		  <View style={{justifyContent: 'center',alignItems: 'center',height:Dimensions.get('window').height-140,overflow:'hidden',}}>
		    <View style={styles.loading}>
                <ActivityIndicator color="white"/>
                <Text style={styles.loadingTitle} allowFontScaling={false}>加载中……</Text>
            </View>
		  </View>
		 </View>
		);
	  }


    _searchs(){
    	this.setState({ showsCancelButton: true ,backc:'#eee',status:true,bar:'default'});
    	Animated.parallel([
    	Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 0,
				  duration: 200,
				},

			  ),
    	Animated.timing(
				this.state.pt,
				{
				  toValue: 20,
				  duration: 200,
				},

			  )
    	]).start();
    }

    cancel(){
    	this.setState({ showsCancelButton: false ,backc:'#4385f4',status:false,bar:'light-content',arrays:[],});
    	Animated.parallel([
    	Animated.timing(
				this.state.fadeAnim,
				{
				  toValue: 65,
				  duration: 200,
				},

			  ),
    	Animated.timing(
				this.state.pt,
				{
				  toValue: 0,
				  duration: 200,
				},

			  )
    	]).start();
    }

    changs(text){

    	 var that=this;
         arrs = [];
    	 this.state.datas.data.forEach((info,i)=>{
    	 	if(info.data.length > 0){
	    	 	info.data.forEach((infos,j)=>{
	    	 		if(text.length > 0){
	    	 			if(infos.name.indexOf(text) > -1){

	    	 				var imgst ={uri:infos.avatar.uri};
	    	 			   var obj = {'name':infos.name,'avatar':imgst,'departName':infos.departName,'uid':infos.uid}

	                       arrs.push(obj);

	                       that.setState({arrays:arrs});
		    	 		}else{


		    	 		}
	    	 		}else{
	    	 			that.setState({arrays:[]});
	    	 		}

	    	 		console.log(arrs)

	    	 	})
    	   }
    	 })
    }

    renderSectionHeader(sectionData, sectionID){
		return (
		  <View style={{flex:1,height:25,backgroundColor:'#eaeaea',justifyContent: 'center',paddingLeft:15,}}>
			<Text style={{fontSize:14,color:'#666'}} allowFontScaling={false}>
			  {sectionData}
			</Text>
		  </View>
		);
	  }
	info(rowData){

		const { navigator } = this.props;
        if(navigator) {
            this.props.navigator.push({
                name: 'ContactInfo',
                component: ContactInfo,
				params: {
					id: rowData.name,
					uid:rowData.uid,
				}
            })
        }
	}

	renderHeader(){

    return (
      <TouchableOpacity onPress={this._onPressHeader} style={styles.header}>

        <View style={{height:0}}>
          <Text  allowFontScaling={false}>

          </Text>
        </View>
      </TouchableOpacity>
    );
   }



    render() {
		var that=this;


		if(!this.state.loaded){
		  return this.renderLoadingView();
		}else if(this.state.sx){
			return(
			<View style={{flex:1}}>
			<View style={{height:20,backgroundColor:'#4385f4',}}></View>
			  <View style={styles.card}>
			  <View style={{flex:1,alignItems:'center',justifyContent:'center',}}>
					<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
								<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>通讯录</Text>
					</View>
			  </View>
			</View>
			<Netinfo  {...this.props}/>
			  <TouchableOpacity activeOpacity={1}   onPress={this._shuax.bind(this)}>
			    <View style={{justifyContent:'center',alignItems:'center',height:Dimensions.get('window').height-150,}}>
				    <Icon name="ios-refresh-outline" color="#ccc"size={70}  />
				    <Text style={{fontSize:14,color:'#ccc'}} allowFontScaling={false}>点击屏幕，重新加载</Text>
				</View>
			  </TouchableOpacity>
			 </View>
			)
		}
		else{
		return(
		<View style={{flex:1}}>
		 <Animated.View style={{height: this.state.fadeAnim,backgroundColor:'#4385f4',flexDirection:'row',}}>
			  <View style={{flex:1,alignItems:'center',justifyContent:'center',paddingTop:20,}}>
					<View style={{justifyContent:'center',flexDirection:'row',alignItems:'center'}}>
								<Text style={{color:'white',fontSize:16}} allowFontScaling={false}>通讯录</Text>
					</View>
			  </View>
			</Animated.View>
			<StatusBar
			 animated={true}
		     showHideTransition='fade'
		     barStyle={this.state.bar}
		   />
			<Netinfo  {...this.props}/>
			  <Animated.View style={{paddingTop:this.state.pt,backgroundColor:'#eee'}}>
                <SearchBar
                ref={(bar) => { this.searchBar = bar; }}
		        placeholder='搜索'
		        textFieldBackgroundColor='#fff'
		        hideBackground={true}
		        showsCancelButton={this.state.showsCancelButton}
			    onFocus={this._searchs.bind(this)}
			    onChangeText={(text) => this.changs.bind(this,text)()}
		        onSearchButtonPress={() => {
			      this.setState({ showsCancelButton: false });
			      this.searchBar.unFocus();
			    }}
			    onCancelButtonPress={this.cancel.bind(this)}
		        />
		      </Animated.View>

		 <View style={{flex:1,flexDirection:'row',overflow:'hidden'}}>

		  <View style={{flex:1,paddingRight:20,paddingBottom:50,}}>
			  <ListView
			    ref="myScroll"
					bounces={false}
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}
				renderHeader={this.renderHeader}
				style={{overflow:'hidden'}}
				removeClippedSubviews={false}
				renderFooter={this.renderFooter}
				renderSectionHeader={this.renderSectionHeader}
				initialListSize={3}
				showsVerticalScrollIndicator={false}
				pageSize={10}
			  />
		  </View>
		  <View onTouchStart={(e)=>{this.moveScroll(e)}}
                  onTouchMove={(e)=>{this.moveScroll(e)}} style={{position: 'absolute',top: (Dimensions.get('window').height-540)/2,right: 0,flexDirection: 'column',backgroundColor: 'transparent'}}>

		      {secs.map((tab, i) => {
				return <View key={tab}    style={{height:14,width:20,alignItems: 'center',}}>

				  <Text  style={{fontSize:12,color:'#4385f4'}} allowFontScaling={false}>
						{tab}
					</Text>
				</View>;
			  })}

		  </View>

		  {this.state.status ? <ScrollView keyboardDismissMode='on-drag' keyboardShouldPersistTaps='never'  style={{backgroundColor:'#fff',flex:1,position:'absolute',top:0,left:0,width:Dimensions.get('window').width,height:Dimensions.get('window').height}}>
                {this.state.arrays.length>0 ? this.state.arrays.map((rowData,i)=>{
                	return <TouchableOpacity    onPress={this.info.bind(this,rowData)}  >

			            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:0,paddingLeft:15,}}>
			                 <View style={{width: 40, height: 40,borderRadius:20,alignItems:'center', justifyContent:'center'}}>
								 <Image source={rowData.avatar} style={{width: 40, height: 40,borderRadius:20,}} />
							 </View>
							 <View style={{marginLeft:15, flex:1,flexDirection:'column',height:51, borderBottomWidth:1,borderColor:'#dcdcdc',justifyContent: 'center',paddingBottom:5,paddingTop:2,}}>
							     <Text style={{fontSize:14,color:'#555'}} allowFontScaling={false}>{rowData.name}</Text>
								 <Text style={{fontSize:12,color:'#999',paddingTop:5,}} allowFontScaling={false}>{rowData.departName}</Text>
							</View>
						</View>

					 </TouchableOpacity>
                }) : <View style={{width:Dimensions.get('window').width,height:Dimensions.get('window').height-140,alignItems:'center',justifyContent:'center',position:'absolute',left:0,top:0}}><Text style={{fontSize:20,color:'#aaa'}} allowFontScaling={false}>无结果</Text></View>}

		  </ScrollView> : null}

		 </View>
		 </View>
		)
		}
    }
	renderRow(rowData, sectionID, rowID){

   if(rowID.slice(-1) == 0){
		 return (
 		 <TouchableHighlight activeOpacity = {0.8} underlayColor="#eee" onLayout={(e)=>{this.layoutH(e)}}  onPress={this.info.bind(this,rowData)}  >

             <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:0,paddingLeft:15,}}>
                  <View style={{width: 40, height: 40,borderRadius:20,alignItems:'center', justifyContent:'center'}}>
 					 <Image source={rowData.avatar} style={{width: 40, height: 40,borderRadius:20,}} />
 				 </View>
 				 <View style={{marginLeft:15, flex:1,flexDirection:'column',height:51, justifyContent: 'center',paddingBottom:5,paddingTop:2,}}>
 				     <Text style={{fontSize:14,color:'#555'}} allowFontScaling={false}>{rowData.name}</Text>
 					 <Text style={{fontSize:12,color:'#999',paddingTop:5,}} allowFontScaling={false}>{rowData.departName}</Text>
 				</View>
 			</View>

 		 </TouchableHighlight>
 		);
	}else{
		return (
		 <TouchableHighlight activeOpacity = {0.8} underlayColor="#eee" onLayout={(e)=>{this.layoutH(e)}}  onPress={this.info.bind(this,rowData)}  >

            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',paddingTop:0,paddingLeft:15,}}>
                 <View style={{width: 40, height: 40,borderRadius:20,alignItems:'center', justifyContent:'center'}}>
					 <Image source={rowData.avatar} style={{width: 40, height: 40,borderRadius:20,}} />
				 </View>
				 <View style={{marginLeft:15,marginRight:2, flex:1,flexDirection:'column',height:51, borderTopWidth:1,borderColor:'#eee',justifyContent: 'center',paddingBottom:5,paddingTop:2,}}>
				     <Text style={{fontSize:14,color:'#555'}} allowFontScaling={false}>{rowData.name}</Text>
					 <Text style={{fontSize:12,color:'#999',paddingTop:5,}} allowFontScaling={false}>{rowData.departName}</Text>
				</View>
			</View>

		 </TouchableHighlight>
		);
	}



	  }

}
const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    flexDirection: 'column',
	backgroundColor:'#fafafa',
  },
  card: {

    height:45,
	backgroundColor:'#4385f4',
	flexDirection:'row'
  },
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

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
	thumbnail:{
    width:53,
    height:81,
  },
});
