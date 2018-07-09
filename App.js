import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Card, Button} from 'react-native-elements';
import Deck from './src/Deck';
import noMoreLeftImg from './assets/Oops.png';

const DATA = [
  { id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
  { id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg' },
  { id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg' },
  { id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg' },
  { id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg' },
];


export default class App extends React.Component {

  renderCard = item => {
    var message = item.text;
    
    return (
      <Card
        image={{ uri: item.uri}}
        key={item.id}
        >
        <Text style={styles.cardsText}>{message}</Text>
        <Button
          icon={{name: 'code'}}
          backgroundColor='#EF4836'
          title={'View now!'}
          />
      </Card>
    );
  };

  renderNoMoreCardsHandler = () => {
    return (
      <Card>
        <Text style={styles.cardsText}>Oops, nothing left!</Text>
        <Button
          icon={{name: 'code'}}
          backgroundColor='#EF4836'
          title={'Find more'}
          />
      </Card>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderNoMoreCardsHandler}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardsText: {
    marginBottom: 15,
    alignSelf: 'center'
  }
});
