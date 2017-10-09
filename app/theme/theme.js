const React = require('react-native')
const {StyleSheet} = React

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    justifyContent: 'flex-start',
    width: 75,
  },
  right: {
    justifyContent: 'flex-end',
    width: 75
  },
  btn: {
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 3,
    width: 150,
  },
  text: {
    textAlign: 'center',
    fontFamily: "GillSans-Light"
  },
  textInput: {
    height: 50,
    textAlign: 'center',
    fontFamily: "GillSans-Light",
  },
  line: {
    borderColor: '#dbdbdb',
    borderWidth: 0.5,
    height: 1,
    alignSelf: 'stretch',
  },
  logo:{
    textAlign: 'center',
    fontSize: 26,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 55,
    marginTop: 10,
    flexDirection: 'row',
  },
})

module.exports = styles
