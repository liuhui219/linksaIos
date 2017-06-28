import React from 'react';
import {
    View,
	StyleSheet,
    Navigator,
	TouchableOpacity,
	TouchableHighlight,
	Text,
	BackAndroid,
	Image,
} from 'react-native';
import PassState from './PassState'; 
import Token from './Token';
export default class State extends React.Component {

    constructor(props) {
        super(props);
		this._pressButton = this._pressButton.bind(this);
        BackAndroid.addEventListener('hardwareBackPress', this._pressButton);
        this.state = {id: '',uid:'',datas:{},img:''};
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
										<Text style={{color:'white',fontSize:18}} allowFontScaling={false}>特别说明</Text>
							</View>
				  </View>
				  <View style={{flex:1,justifyContent:'center'}}>

				  </View>
			</View>

			<View style={{flex:1,flexDirection:'column',backgroundColor:'#fff',}}>
				 <View style={{paddingLeft:15,paddingRight:15,paddingTop:10,}}>

					 <View>
					    <Text style={{color:'#666',marginBottom:10,}} allowFontScaling={false}>邻盛在此声明，您通过本软件参与的任何商业活动，与Apple Inc.无关。</Text>

					 </View>
				 </View>

			</View>
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
  default: {
    height: 37,
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.55)',
    flex: 1,
    fontSize: 13,

  },
});
