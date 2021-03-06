import React, { Component } from "react";
import axios from 'axios'
import "./styles/Index.css";

import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'

import Loading from './Loading';
import Login from "../components/Login";


const config = require('../config/config')
const jwt = require("jsonwebtoken");

export default class Index extends Component {
    componentDidMount() {
        resources_controller.ModifySession("latitude", "");
        resources_controller.ModifySession("longitude", "");
    }
    state = {
        loading: false,
        identification: "",
        password: "",

        manageUserModalShow: false,
        modalTitle: "",
        form: {
            name: "",
            lastname: "",
            identification: "",
            email: "",
            sex: "",
            birthdate: new Date(),
            house_address: "",
            password: "",
            role: "Comprador"
        },
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value,
        });
    };
    handleChangeForm = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        if (!resources_controller.Empty(this.state.identification) &&
            !resources_controller.Empty(this.state.password)) {


                try {
                    const data = {
                        identification: this.state.identification,
                        password: resources_controller.Encrypt(this.state.password),
                    }

                    this.setState({ loading: true });
                    const res = await axios.post(config.QUERY_SERVER_URI + "api/user/auth/login", data, {
                        headers: {
                            'Content-Type': 'application/json;charset=UTF-8'
                        }
                    });

                    if (res.data.status === "error") {
                        this.setState({
                            loading: false
                        });
                        validations.ErrorToast(res.data.description, res.data.traza, res.data.id)
                    } else {
                        resources_controller.SetSession(res.data);

                        jwt.verify(res.data.token.toString(), config.ENCRYPTION_SECRET_KEY, (err, decoded) => {
                            if (err) {
                                this.setState({
                                    loading: false
                                });
                                validations.ErrorToast("Ha ocurrido un error", err.message)
                            } else {
                                resources_controller.SetSession(decoded);
                                window.location.href = '/Home'
                            }
                        });

                    }
                } catch (error) {
                    this.setState({
                        loading: false
                    });
                    validations.ErrorToast("Ha ocurrido un error", error.message)
                }
        } else {
            validations.ErrorToast("Campos obligatorios")
        }

    };
    handleSignUp = async e => {
        e.preventDefault();
        try {
            if (resources_controller.ValidateUser(this.state.form)) {
                const data = this.state.form;
                data.password = resources_controller.Encrypt(data.password)

                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + "api/user/manage/insertUser", data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${this.state.token}`
                    }
                });

                if (res.data.status === "error") {
                    this.setState({
                        loading: false,
                        form: {
                            ...this.state.form,
                            password: ""
                        }
                    });
                    validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
                } else {
                    validations.SuccessToast(res.data.description);
                    this.setState({
                        loading: false,
                        form: {
                            ...this.state.form,
                            password: ""
                        }
                    });
                    this.onHideModal();

                }

            }

        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
            console.log(error)
        }
    }

    handleInsertModal = () => {
        this.setState({
            manageUserModalShow: true,
            modalTitle: "Registro de usuarios",
            form: {
                name: "",
                lastname: "",
                identification: "",
                email: "",
                sex: "",
                birthdate: new Date(),
                house_address: "",
                password: "",
                role: "Comprador"
            },
        });
    }
    onHideModal = () => {
        this.setState({
            manageUserModalShow: false,
            form: {
                name: "",
                lastname: "",
                identification: "",
                email: "",
                sex: "",
                birthdate: new Date(),
                house_address: "",
                password: "",
                role: "Comprador"
            },
        });
    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }

        return (

            <Login
                onSubmit={this.handleSubmit}
                onChange={this.handleChange}
                identification={this.state.identification}
                password={this.state.password}

                show={this.state.manageUserModalShow}
                onHide={this.onHideModal}
                title={this.state.modalTitle}
                handleChangeForm={this.handleChangeForm}
                form={this.state.form}
                handleSignUp={this.handleSignUp}
                onOpen={this.handleInsertModal}
            />
        );
    }
}
