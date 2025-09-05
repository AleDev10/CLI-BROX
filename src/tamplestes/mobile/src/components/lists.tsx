/* eslint-disable no-unused-expressions */
import { View,Text, StyleSheet} from "react-native";

const dados=[
    {
        id:1,
        titulo:'BROX',
        tarefas:[]
    }
]

export default function Lists(){
    return (
        <View style={styles.lista}>
            {
                dados.forEach((item,index)=>{
                    <View style={styles.item} key={index}>
                        <Text style={styles.texto}>{item.titulo}</Text>
                    </View>
                })
            }
        </View>
    )
}

const styles= StyleSheet.create({
    lista:{
        backgroundColor: "#c26cff",
        width: '100%',
        height:50,
        padding:10,
        marginTop: 10,
        borderRadius: 8,
    },
    texto:{
        color: '#ffff',
        textAlign: 'center',
    },
    item:{
        backgroundColor: "#c26cff",
    }
})