import React, {
  Component
} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet
} from 'react-native';

export default class ListItem extends Component {
  render() {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listItemTitle}>{this.props.task.name}</Text>
        <TouchableHighlight
          style={styles.hit}
          onPress={this.props.onTaskCompletion}>
          <Image style={styles.listItemAction}
          source={require('./pics/sing.jpg')}
             />
        </TouchableHighlight>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  listItem: {
    borderBottomColor: '#eee',
    borderColor: 'gray',
    flexDirection:'row',
    alignItems:'center',
    borderWidth: 1,
    padding:20,
  },
  listItemTitle: {
    flex: 6,
    color: '#000',
    fontSize: 16,

  },
  listItemAction: {
    flex: 1,
    width: 30,
    height: 10,
    marginTop:15
  },
  hit:{
    backgroundColor:"transparent",
  }
});
