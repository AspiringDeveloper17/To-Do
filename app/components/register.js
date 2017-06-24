import React,{Component} from 'react';

import{
  Text,
  View,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Image
} from 'react-native';

import {Actions} from "react-native-router-flux";
import {firebaseRef} from '../../services/firebaseRef';

export default class Register extends Component{
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      verify:""
    };
    this.onPress=this.onPress.bind(this);
  }
  render(){
    return(
     <View style={styles.container}>
       <View>
         <Image
           source={require('./pics/logo.png')}
           style={styles.image}
           />
       </View>
         <View>
       <TextInput
         value={this.state.username}
         style={styles.input}
         clearTextOnFocus={true}
         onChangeText={(username)=> this.setState({username})}
         autoCapitalize={"none"}
         placeholder={"Enter Email"}
         placeholderTextColor={"black"}
         />
      </View>
      <View>
        <TextInput
          value={this.state.password}
          secureTextEntry={true}
          style={styles.password}
          clearTextOnFocus={true}
          onChangeText={(password)=> this.setState({password})}
          autoCapitalize={"none"}
          autoCorrect={false}
          placeholder={"Enter Password"}
          placeholderTextColor={"black"}
          />
      </View>
      <View>
        <TextInput
          value={this.state.verify}
          secureTextEntry={true}
          onChangeText={(verify)=> this.setState({verify})}
          style={styles.verify}
          clearTextOnFocus={true}
          autoCapitalize={"none"}
          autoCorrect={false}
          placeholder={"Enter Password"}
          placeholderTextColor={"black"}
          />
      </View>
      <View>
        <TouchableHighlight
          style={styles.registerButton}
          onPress={this.onPress}
          >
          <Text style={{textAlign:"center",color:"white"}}> Register</Text>
        </TouchableHighlight>
      </View>
    </View>
    );
  }
  onPress(){
    var username=this.state.username;
    if(this.state.password==this.state.verify && (username.includes("@gmail.com") || (username.includes("@yahoo.com")||(username.includes("@outlook.com"))))){
      //some bugs with passwords and confusing errors but works
      firebaseRef.auth().createUserWithEmailAndPassword(this.state.username, this.state.password).then(function(success) {
          Actions.home();
          console.log(success);

    }).catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
      if(error){
        console.log(errorMessage);
  			switch(errorCode){
   		case "auth/invalid-email": alert("Invalid email");
   															 break;
   		case "auth/email-already-in-use":alert("Username is already registered");
   															 break;
   		case "auth/operation-not-allowed":alert("Operation Not Allowed");
   															 break;
   		case "auth/weak-password":alert("Password too weak");
   																break;
    	}

  		}
  });
  }
    else alert("Passwords do not match or email is invalid");
  }

}

const styles=StyleSheet.create({
  container:{
    flex:1,//1:1 works as a ration
    backgroundColor:"rgb(211,211,211)"
  },
  input:{
    width: 250,
		color: '#555555',
		padding: 10,
		height: 50,
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 4,
		alignSelf: 'center',
		backgroundColor:"transparent",
		marginTop:20
  },
  password:{
    width: 250,
    color: '#555555',
    padding: 10,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor:"transparent",
    marginTop:5//the top of this is the other textinput so the margin is in respect to that
  },
  image:{
    marginTop:150,
    alignSelf:"center"
  },
  registerButton:{
    alignSelf:"center",
    marginTop:50,
    padding:10,
    borderWidth:3,
    borderRadius:20,
    height:40,
    width:200,
    borderColor:"red",
    backgroundColor:"black"
  },
  verify:{
    width: 250,
    color: '#555555',
    padding: 10,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    backgroundColor:"transparent",
    marginTop:5
  }

});
