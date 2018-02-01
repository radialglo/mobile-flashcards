import React, { Component } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import {blue, white} from "../utils/color";

export default function TextButton({ children, onPress, btnStyle = {}, btnTextStyle = {}}) {
    return (
        <TouchableOpacity style={[styles.btn, btnStyle]}onPress={onPress}>
            <Text style={[styles.btnText, btnTextStyle]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: blue,
        borderWidth: 2,
        borderRadius: 4,
        borderColor: blue,
    },
    btnText: {
        color: white,
        fontSize: 22,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
    }
});