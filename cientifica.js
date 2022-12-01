import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView , StatusBar, Dimensions} from 'react-native';
import { useEffect } from 'react/cjs/react.production.min';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [screenWidth, setScreenWidth] = useState();
  const [screenHeigth, setScreenHeight] = useState();
  
  const [count, setCount] = useState("");
  const [result, setResult] = useState("0");  
  const [operacao, setOperacao] = useState("");
  const [number, setNumero] = useState("");
  var aux="";

  
  // setScreenWidth(Dimensions.get('window').width);
  // setScreenHeight(Dimensions.get('window').height);

  function zerar(){
    setCount("");
    setNumero("");
    setResult("0");
    setOperacao("");
  }

  function operation(operador){
    if(count!='' || number!=''){
      if((count.slice(-1)=='/' || count.slice(-1)=='*' || count.slice(-1)=='-' || count.slice(-1)=='+') && number==''){
        aux = count.replace(/.$/, '');
      }else{
        aux = count;
      }
        switch(operador){
            case "/": 
              setOperacao("/");
              setCount(aux + number + operador );
              setNumero("");
              break;
            case "*":
              setOperacao("*");
              setCount(aux + number +  operador);
              setNumero("");
              break;
            case '+':
              setOperacao("+");
              setCount(aux + number +  operador);
              setNumero("");
              break;
            case '-':
              setOperacao("-");
              setCount(aux + number +  operador);
              setNumero("");
              break;
          }
      }
    }

  function remover(){
    setCount((count + number).replace(/.$/, ''));
    setNumero("");
  }

  function digitar(d){
    if(d=='+/-'){
      if(number!=''){
        setNumero(eval(number + '*(-1)').toString());
      }
    }else if(d=='%'){
      if(number!=''){
        if(count.slice(-1)=='+' || count.slice(-1)=='-' || count.slice(-1)=='*' || count.slice(-1)=='/'){
          var expressao = count.replace(/.$/, '');
          aux = eval((expressao+"*"+number+"/100").toString());
          setCount(count + aux);
          setNumero("");
        }
        
      }
    }else if(d=='.' && number==''){
      setNumero('0'+d);
    }
    else{
      setNumero(number + d);
    }
    setOperacao("");
  }

  function calcResult(){
    var aux = eval(count+number).toString();
    setResult(aux);
    setCount(aux);
    setNumero("");
  }

  return (

    <>
      <StatusBar backgroundColor="#23222D" translucent={false} hidden={false}/>
      <SafeAreaView style={styles.container}>
        
        <View style={styles.buttons}>
          <View style={styles.line}>
            <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => zerar()}>|x|</Text>
            <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => digitar("+/-")}>e^x</Text>
            <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => digitar('%')}>ln</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('/')}>sin</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('/')}>/</Text>
          </View>
          <View style={styles.line}>
            <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => zerar()}>pi</Text>
            <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => digitar("+/-")}>x²</Text>
            <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => digitar('%')}>log</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('/')}>cos</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('/')}>Rad</Text>
          </View>
          <View style={styles.line}>
            <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => digitar('e')}>e</Text>
            <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => digitar("+/-")}>x^y</Text>
            <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => digitar('%')}>1/x</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('/')}>tan</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('/')}>raiz</Text>
          </View>
          <View style={styles.line}>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar("+/-")}>+/-</Text>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('1')}>1</Text>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('4')}>4</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => digitar('7')}>7</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => zerar()}>C</Text>
          </View>
          <View style={styles.line}>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('0')}>0</Text>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('2')}>2</Text>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('5')}>5</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => digitar('8')}>8</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('/')}>()</Text>
          </View>
          <View style={styles.line}>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('.')}>,</Text>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('3')}>3</Text>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('6')}>6</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => digitar('9')}>9</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => digitar('%')}>%</Text>
          </View>
          <View style={styles.line}>
            {/* <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => remover()}><AntDesign name="back" size={24} color="white" /></Text> */}
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => calcResult()}>=</Text>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => operation('+')}>+</Text>
            <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => operation('-')}>-</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('*')}>*</Text>
            <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('/')}>/</Text>
          </View>
        </View>
        <View style={styles.display}>
          <Text style={styles.operetion}>{count}{number}</Text>
          <Text style={styles.result} >{result}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "#23222D",
  },
  display: {
    flex: 1,
    backgroundColor: "black",
    // justifyContent: "flex-end",
    marginBottom: 30,
    marginEnd: 20,
    backgroundColor: "#23222D"
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttons: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#2A2A36",
    padding: 10,
    justifyContent: "space-around",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  button: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "#282833",
    // padding: 25,
    borderRadius: 100,
    transform: [{rotate : '90deg'}]
  },
  result: {
    textAlign: "right",
    color: "white",
    fontSize: 50,
  },
  operetion: {
    textAlign: "right",
    color: "white",
    fontSize: 30
  },
  colorWhite: {
    color: "white",
  },
  colorGreen: {
    color: "#00FFD7"
  },
  colorRed: {
    color: "#FF6471"
  },
  margin: {
    //borderWidth: 2   
  }
});