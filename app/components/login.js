import React,{Component} from 'react';

import{
  Text,
  View,
  TouchableHighlight,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';

import {firebaseRef} from "../../services/firebaseRef";

import {Actions} from 'react-native-router-flux';

export default class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      username:"",
      password:""
    };
    this.onPress=this.onPress.bind(this);
    this.onCreatePress=this.onCreatePress.bind(this);
    this.onForgotPress=this.onForgotPress.bind(this);
  }
  componentDidMount(){
    firebaseRef.auth().onAuthStateChanged(function(user) {
  if (user) {
    Actions.home();
    // User is signed in.
  }
  else {
    Actions.login();
  }
});
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
          style={styles.password}
          clearTextOnFocus={true}
          onChangeText={(password)=> this.setState({password})}
          autoCapitalize={"none"}
          placeholder={"Enter Password"}
          placeholderTextColor={"black"}
          />
      </View>
      <View>
        <TouchableHighlight
          style={styles.loginButton}
          onPress={this.onPress}
          >
          <Text style={{textAlign:"center",color:"white"}}> Login</Text>
        </TouchableHighlight>
      </View>
      <View>
        <TouchableOpacity
          style={styles.forgotAccount}
          onPress={this.onForgotPress}
          >
        <Text style={styles.text}> Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          style={styles.createAccount}
          onPress={this.onCreatePress}
          >
        <Text style={styles.text}> Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
  onPress(){

    firebaseRef.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then(function(success) {
      if(success){
        console.log(success);
        Actions.home();
      } else console.log("yep");

  }).catch(function(error) {
  // Handle Errors here.
	//need to handle the case for success in sign in because the default is not reaching
  var errorCode = error.code;
  var errorMessage = error.message;

  switch(errorCode){
		case "auth/invalid-email": alert("Invalid email");
															 break;
		case "auth/user-disabled":alert("User has been disabled");
															 break;
		case "auth/user-not-found":alert("User not found");
															 break;
		case "auth/wrong-password":alert("Wrong password");
															 	break;
	}

});
		}

onCreatePress(){
      Actions.register();
    }

onForgotPress(){
    var auth = firebaseRef.auth();
    var emailAddress = this.state.username;

    auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
  alert("Email sent");
  }, function(error) {
  alert("Recovery email not sent. Confirm email address above correct.")
  // An error happened.
});
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
  loginButton:{
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
  createAccount:{
    alignSelf:"center",
    marginTop:20,
    opacity:10
  },
  text:{
    textDecorationLine:"underline",
    color:"black"
  },
  forgotAccount:{
    alignSelf:"center",
    marginTop:30,
    opacity:10
  }

});
