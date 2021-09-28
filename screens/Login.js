import React from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { login } from '../redux/actions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearData } from '../redux/actions';


const LoginSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
});

function Login({ navigation, clearData }) {
    clearData();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Secrets</Text>
            </View>
            <View>
                <Formik
                    initialValues={{email: '', password: ''}}
                    validationSchema={LoginSchema}
                    onSubmit={((values, action) => {
                        console.log(values);
                        login(values);
                    })}
                >
                    {(props)=> (
                        <View style={styles.formContainer}>
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
                                <Button onPress={props.handleSubmit} title="Sign in" />
                            </View>
                            <View style={styles.buttonContainer}>
                                <Button onPress={() => navigation.navigate('Signup')} title="Create an Account" />
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
        </View>
    )
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

const mapDispatchProps = (dispatch) => bindActionCreators({clearData}, dispatch);
export default connect(null, mapDispatchProps)(Login);
