import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { signUp } from '../redux/actions/index';

const LoginSchema = yup.object({
    name: yup.string().required().min(3),
    username: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
});

export default class SignUp extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
        }
        this.onSignUp = this.onSignUp.bind(this);
    }
    onSignUp(values){
        signUp(values);
    }
    render(){
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Secrets</Text>
            </View>
            <View>
                <Formik
                    initialValues={this.state}
                    validationSchema={LoginSchema}
                    onSubmit={((values, action) => {
                        this.onSignUp(values);
                        console.log(values);
                    })}
                >
                    {(props)=> (
                        <View style={styles.formContainer}>
                            <TextInput placeholder='name'
                                value={props.values.name}
                                onChangeText={props.handleChange('name')}
                                onBlur={props.handleBlur('name')}
                                style={styles.textInput}
                                error={props.errors.name}
                            />
                            <Text style={styles.error}>{ props.touched.name && props.errors.name }</Text>
                            <TextInput placeholder='username'
                                value={props.values.username}
                                onChangeText={props.handleChange('username')}
                                onBlur={props.handleBlur('username')}
                                style={styles.textInput}
                                error={props.errors.username}
                            />
                            <Text style={styles.error}>{ props.touched.username && props.errors.username }</Text>
                            <TextInput placeholder='email'
                                value={props.values.email}
                                onChangeText={props.handleChange('email')}
                                onBlur={props.handleBlur('email')}
                                style={styles.textInput}
                                error={props.errors.email}
                            />
                            <Text style={styles.error}>{ props.touched.email && props.errors.email }</Text>
                            <TextInput placeholder='password'
                                secureTextEntry={true}
                                value={props.values.password}
                                onChangeText={props.handleChange('password')}
                                onBlur={props.handleBlur('password')}
                                style={styles.textInput}
                                error={props.errors.password}
                            />
                            <Text style={styles.error}>{ props.touched.password && props.errors.password }</Text>
                            <View style={styles.buttonContainer}>
                                <Button onPress={props.handleSubmit} title="Sign up" />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button onPress={()=> this.props.navigation.goBack()} title="Cancel" />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )}
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
    },
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        fontFamily: 'montserrat-bold',
        fontSize: 20,
    },
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
    },
    textInput: {
        margin: 10,
        marginBottom: 2,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd'
        
    },
    error: {
        color: 'red',
        marginBottom: 5,
        alignSelf: 'center'
    },
    buttonContainer: {
        margin: 10
    }
})
