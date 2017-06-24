import React,{Component} from 'react';

import{
  Text,
  StatusBar,
  View,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Image,
  ListView
} from 'react-native';

import {Actions} from "react-native-router-flux";

// import {firebaseRef} from '../../services/firebaseRef';

// var database = firebaseRef.database();

export default class Create extends Component{
  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state={
      dataSource:ds.cloneWithRows([
        {
          name:"Shubh Sinha",
          number:"6155555555",
          email:"hi@gmail.com",
          address:"123 G-Eazy Lane"
        },
        {
          name:"Hallo",
          number:"1234343",
          email:"bill@microsoft.com",
          address:"infiniy loop"
        },
        {
          name:"Shubh Sinha",
          number:"6155555555",
          email:"hi@gmail.com",
          address:"123 G-Eazy Lane"
        },
        {
          name:"Shubh Sinha",
          number:"6155555555",
          email:"hi@gmail.com",
          address:"123 G-Eazy Lane"
        },
        {
          name:"Shubh Sinha",
          number:"6155555555",
          email:"hi@gmail.com",
          address:"123 G-Eazy Lane"
        },
        {
          name:"Shubh Sinha",
          number:"6155555555",
          email:"hi@gmail.com",
          address:"123 G-Eazy Lane"
        },

      ])
    }
    this.renderRow=this.renderRow.bind(this);
  }

  render(){
    return(
      <View style={{flex:1}}>
        <ListView
          dataSource={this.state.dataSource}
          style={{marginTop:80}}
          renderRow={this.renderRow}
          />
        <View>
        </View>
      </View>
  );
}
renderRow(rowData){
return (
  <View style={{borderWidth:2,alignItems:"center",justifyContent:"center"}}>
    <Text> {rowData.name}</Text>
      <Text> {rowData.number}</Text>
        <Text> {rowData.email}</Text>
          <Text> {rowData.address}</Text>
    </View>
);
}

}
const styles=StyleSheet.create({

});
