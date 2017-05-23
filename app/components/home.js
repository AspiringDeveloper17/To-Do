import React, {Component} from 'react';
import {
  View,
  ListView,
  Text,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  TabBarIOS
} from 'react-native';

import {firebaseRef} from '../../services/firebaseRef';

import {Actions} from'react-native-router-flux';

import ListItem from './ListItem.js';

import FloatingActionButton from 'react-native-action-button';

export default class Home  extends Component {
    constructor(props) {
      super(props);
      this.tasksRef = firebaseRef.database().ref();
      const dataSource = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
      this.state = {
        dataSource: dataSource,
        newTask: "Enter Item"
      };
    }

    componentDidMount() {
      this.listenForTasks(this.tasksRef);
    }

    render() {
      return (
        <View style={styles.container}>
          <ListView
            dataSource={this.state.dataSource}
            enableEmptySections={true}
            renderRow={this._renderItem.bind(this)}
            style={styles.listView}/>
          <TextInput
             value={this.state.newTask}
             style={styles.textEdit}
             onChangeText={(text) => this.setState({newTask: text})}
             clearTextOnFocus={true}
             />
          <FloatingActionButton
            hideShadow={true}
            buttonColor="red"
            onPress={this.addItem.bind(this)}/>
        </View>
      );
    }

    _renderItem(task) {
      const onTaskCompletion = () => {
        this.tasksRef.child(task._key).remove()
      };
      return (
        <ListItem task={task} onTaskCompletion={onTaskCompletion} />
      );
    }

    addItem() {
      if (this.state.newTask === "") {
        return;
      }
      this.tasksRef.push({ name: this.state.newTask});
      this.setState({newTask: ""});
    }

    listenForTasks(tasksRef) {
      tasksRef.on('value', (dataSnapshot) => {
        var tasks = [];
        dataSnapshot.forEach((child) => {
          tasks.push({
            name: child.val().name,
            _key: child.key
          });
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(tasks)
        });
      });
    }
  }


  var styles = StyleSheet.create({
  container: {
    backgroundColor:"rgb(211,211,211)",
    flex: 1,
  },
  listView: {
    flex: 1,
    marginTop:50
  },
  textEdit:{
    marginBottom:30,
    borderWidth:1,
    height:30,
    borderColor:"black",
    width:280
  }
})
