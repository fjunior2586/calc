import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, Component } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)




//Oculta erro de versão
import { LogBox } from "react-native";
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default function App() {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeigth, setScreenHeight] = useState(Dimensions.get('window').height);

  const [showKeyboardCientific, setShowKeyboardCientific] = useState(false);

  const [count, setCount] = useState("");
  const [result, setResult] = useState("0");
  const [operator, setOperation] = useState("");
  const [number, setNumber] = useState("");
  const [expressions, setExpressions] = useState(0);
  const operations = ['/', '*', '-', '+'];
  const funtions = ['sin', 'cos', 'tan', 'ln', 'log', '√', 'exp'];
  let aux = "";
  const [aux1, setAux1] = useState(-1);

  useEffect(() => {
    const updateLayout = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    Dimensions.addEventListener('change', updateLayout);

    if (screenWidth > screenHeigth) {
      setShowKeyboardCientific(true);
    } else {
      setShowKeyboardCientific(false);
    }
    return () => {
      Dimensions.removeEventListener('change', updateLayout);
    }
  }, [Dimensions.addEventListener('change')]);

  function zerar() {
    setCount("");
    setExpressions(0);
    setNumber("");
    setResult("0");
    setOperation("");
  }

  function operation(operator) {
    if (count != '' || number != '') {
      if ((count.slice(-1) == '/' || count.slice(-1) == '*' || count.slice(-1) == '-' || count.slice(-1) == '+') && number == '') {
        aux = count.replace(/.$/, '');
      } else {
        aux = count;
      }

      setOperation(operator);
      setCount(aux + number + operator);
      setNumber("");
    }
  }

  function remove() {
    if ((count.slice(-1) == '/' || count.slice(-1) == '*' || count.slice(-1) == '-' || count.slice(-1) == '+') && number == '') {
      setOperation('');
    }
    setCount((count + number).replace(/.$/, ''));
    setNumber("");
  }

  function digitar(d) {
    const filtered = funtions.filter(obj => {
      return obj === d;
    });

    if (filtered != '') {
      setExpressions(expressions + 1);
      d += '(';
    }

    if (d == '+/-') {
      if (number != '') {
        aux = math.evaluate(number + '*(-1)').toString();
        setNumber(aux);
      }
    } else if (d == '%') {
      if (number != '') {
        if (count.slice(-1) == '+' || count.slice(-1) == '-' || count.slice(-1) == '*' || count.slice(-1) == '/') {
          let expression = count.replace(/.$/, '');
          aux = math.evaluate((expression + "*" + number + "/100").toString());
          setCount(count + aux);
          setNumber("");
        }
      }
    }
    else if (d == '.') {
      const found = number.lastIndexOf('.');
      if (found == -1) {
        if (number == '') {
          setNumber('0.');
        } else {
          setNumber(number + d);
        }
      }
    } else if (d == '('){
      if(expressions > 0 && number.slice(-1) != '(') {
      setNumber(number + ')');
      setExpressions(expressions - 1);
      }else{
        setNumber(number + '(');
        setExpressions(expressions + 1);
      }
    } else if(d == '|'){
      aux = Math.abs(math.evaluate(count + number));
      setCount(aux);
      setNumber('');
    }
    else {
      setNumber(number + d);
    }
  }


  function calcResult() {
    if (operator == '/' && number == '0') {
      zerar();
    } else if (operator != '' && number == '') {
      if (operator == '*' || operator == '/') {
        aux = math.evaluate(count + '1').toString();
      } else {
        aux = math.evaluate(count + '0').toString();
      }
    } else {

      aux = count + number;
      for (let i = 0; i < expressions; i++) {
        aux += ')';
      }

      //Altera a base do log, pois o padrão é base 2
      if(aux.indexOf("log") != -1){
        aux = aux.substring(0, aux.indexOf(')', aux.indexOf("log"))) + " ,10)" + aux.substring(aux.indexOf(')', aux.indexOf("log")) + 1);
      }

      //Altera o simbolo para a operação
      aux = aux.replace('√', 'sqrt');

      //A biblioteca não entende ln, então é preciso substituir por log
      aux = aux.replace('ln', 'log');

      aux = aux.replace('π',Math.PI);

      //Se não houver a função exp, substitui o valor de e
      if(aux.indexOf("exp") == -1){
        aux = aux.replace('e',Math.E);
      }
      aux = math.evaluate(aux);
    }

    //Se houver casas decimais, o número é formatado
    if(aux % 1 != 0){
      aux = aux.toFixed(11);
    }
    aux = aux.toString();
    setResult(aux);
    setCount(aux);
    setNumber("");
    setExpressions(0);

  }
  class CommonKeyboard extends React.Component {
    render() {
      return (
        <>
          <View style={styles.buttonsCommon}>
            <View style={styles.line}>
              <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => zerar()}>AC</Text>
              <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => digitar("+/-")}>+/-</Text>
              <Text style={[styles.button, styles.margin, styles.colorGreen]} onPress={() => digitar('%')}>%</Text>
              <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('/')}>/</Text>
            </View>
            <View style={styles.line}>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('7')}>7</Text>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('8')}>8</Text>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('9')}>9</Text>
              <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('*')}>X</Text>
            </View><View style={styles.line}>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('4')}>4</Text>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('5')}>5</Text>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('6')}>6</Text>
              <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('-')}>-</Text>
            </View><View style={styles.line}>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('1')}>1</Text>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('2')}>2</Text>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('3')}>3</Text>
              <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => operation('+')}>+</Text>
            </View><View style={styles.line}>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => remove()}><AntDesign name="back" size={24} color="white" /></Text>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('0')}>0</Text>
              <Text style={[styles.button, styles.margin, styles.colorWhite]} onPress={() => digitar('.')}>.</Text>
              <Text style={[styles.button, styles.margin, styles.colorRed]} onPress={() => calcResult()}>=</Text>
            </View>
          </View>
        </>
      )
    }
  }
  class CienceKeyboard extends React.Component {
    render() {
      return (
        <>
          <View style={styles.buttonsCience}>
            <View style={styles.line}>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => remove("|")}><AntDesign name="back" size={24} color="white" /></Text>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar('')}>Rad</Text>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar('√')}>√</Text>
              <Text style={[styles.button1, styles.margin, styles.colorRed]} onPress={() => zerar('/')}>C</Text>
              <Text style={[styles.button1, styles.margin, styles.colorRed]} onPress={() => digitar('(')}>( )</Text>
              <Text style={[styles.button1, styles.margin, styles.colorRed]} onPress={() => digitar("%")}>%</Text>
              <Text style={[styles.button1, styles.margin, styles.colorRed]} onPress={() => operation('/')}><MaterialCommunityIcons name="division" size={24} /></Text>
            </View><View style={styles.line}>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar("sin")}>sin</Text>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar("cos")}>cos</Text>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar("tan")}>tan</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('7')}>7</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('8')}>8</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('9')}>9</Text>
              <Text style={[styles.button1, styles.margin, styles.colorRed]} onPress={() => operation('*')}>X</Text>
            </View><View style={styles.line}>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar('ln')}>ln</Text>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar("log")}>log</Text>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar('exp')}>exp</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('4')}>4</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('5')}>5</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('6')}>6</Text>
              <Text style={[styles.button1, styles.margin, styles.colorRed]} onPress={() => operation('-')}>-</Text>
            </View><View style={styles.line}>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar("1/")}>1/x</Text>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar('^2')}>x²</Text>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar('^')}>xʸ</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('1')}>1</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('2')}>2</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('3')}>3</Text>
              <Text style={[styles.button1, styles.margin, styles.colorRed]} onPress={() => operation('+')}>+</Text>
            </View><View style={styles.line}>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar('|')}>|x|</Text>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar('π')}>π</Text>
              <Text style={[styles.button1, styles.margin, styles.colorGreen]} onPress={() => digitar("e")}>e</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar("+/-")}>+/-</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('0')}>0</Text>
              <Text style={[styles.button1, styles.margin, styles.colorWhite]} onPress={() => digitar('.')}>,</Text>
              <Text style={[styles.button1, styles.margin, styles.colorRed]} onPress={() => calcResult('/')}>=</Text>
            </View>
          </View>
        </>
      )
    }
  }

  return (
    <>
      <StatusBar backgroundColor="#23222D" translucent={false} hidden={false} />
      <SafeAreaView style={styles.container}>
        <View style={styles.display}>
          <Text style={styles.operetion}>{count}{number}</Text>
          <Text style={styles.result} >{result}</Text>
        </View>

        {showKeyboardCientific ? <CienceKeyboard /> : <CommonKeyboard />}

      </SafeAreaView>
    </>
  );


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    backgroundColor: "#23222D",
  },
  display: {
    flex: 0.3,
    backgroundColor: "black",
    justifyContent: "flex-end",
    marginTop: 30,
    marginEnd: 20,
    backgroundColor: "#23222D"
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  buttonsCommon: {
    flex: 0.7,
    flexDirection: "column",
    backgroundColor: "#2A2A36",
    padding: 10,
    justifyContent: "space-around",
    marginTop: 20,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  buttonsCience: {
    flex: 0.7,
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
    padding: 25,
    borderRadius: 100,
    margin: 10
  },
  button1: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    backgroundColor: "#282833",
    // padding: 25,
    borderRadius: 100,
    margin: 10
    // transform: [{rotate : '90deg'}]
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