import React, { Component } from 'react';
import axios from 'axios'

import resources_controller from '../resources/resources_controller'
import validations from '../resources/validations/main'

import UpdateModal from '../components/UserManagementModal'
import Loading from './Loading';


import './styles/MyProfile.css'

const config = require('../config/config')

export default class MyProfile extends Component {
    componentDidMount() {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            
        }
    }
    state = {
        lat: resources_controller.GetSession("house_latitude"),
        lng: resources_controller.GetSession("house_longitude"),
        whithOldLocation: true,
        form: {
            name: resources_controller.GetSession("name"),
            lastname: resources_controller.GetSession("lastname"),
            identification: resources_controller.GetSession("identification"),
            email: resources_controller.GetSession("email"),
            cellphone: resources_controller.GetSession("cellphone"),
            sex: resources_controller.GetSession("sex"),
            birthdate: resources_controller.GetSession("birthdate"),
            house_address: resources_controller.GetSession("house_address"),
            password: "",
            role: resources_controller.GetSession("role"),
        },
        manageUserModalShow: false,
        action: 0,
        modalTitle: "",
        loading: false,
    }

    onUpdateModalHide = () => {
        this.setState({
            manageUserModalShow: false
        });
    }
    handleUpdateModal = () => {
        this.setState({
            manageUserModalShow: true,
            action: resources_controller.USER_MODAL_ACTION.update,
            modalTitle: "Datos del usuario " + resources_controller.GetSession("name"),
        })
    }
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };
    OnEditPass = async () => {
        if (!resources_controller.FieldIsBlank2(this.state.form.password)) {
            try {
                const data = {};
                data.password = resources_controller.Encrypt(this.state.form.password)
                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/updatePassword/${resources_controller.GetSession("row_id")}`, data, {
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

                }

            } catch (error) {
                this.setState({
                    loading: false,
                    form: {
                        ...this.state.form,
                        password: ""
                    }
                });
                validations.ErrorToast("Ha ocurrido un error", error.message)
            }
        } else {
            validations.ErrorToast("Debe escribir una contraseña")
        }
    }
     

    onSubmitUpdate = async e => {
        e.preventDefault();
        try {
            if (resources_controller.ValidateUserUpdate(this.state.form)) {
                const data = this.state.form;

                this.setState({ loading: true });
                const res = await axios.post(config.QUERY_SERVER_URI + `api/user/manage/updateUser/${resources_controller.GetSession("row_id")}`, data, {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        'Authorization': `Bearer ${this.state.token}`
                    }
                });

                if (res.data.status === "error") {
                    this.setState({
                        loading: false
                    });
                    validations.ErrorToast(res.data.description, res.data.traza, res.data.id);
                } else {
                    validations.SuccessToast(res.data.description);
                    this.onUpdateModalHide()
                    this.setState({
                        loading: false,
                    });
                    resources_controller.ModifySession("name", this.state.form.name);
                    resources_controller.ModifySession("lastname", this.state.form.lastname);
                    resources_controller.ModifySession("identification", this.state.form.identification);
                    resources_controller.ModifySession("email", this.state.form.email);
                    resources_controller.ModifySession("role", this.state.form.role);

                }

            }

        } catch (error) {
            this.setState({
                loading: false
            });
            validations.ErrorToast("Ha ocurrido un error", error.message)
        }

    }

    render() {
        if (this.state.loading) {
            return <Loading />;
        }
        return (
            <div>

                <div className="row " >
                    <div className="col">
                        <button onClick={this.handleUpdateModal} className="btn btn-block btn-primary btn2">
                            Actualizar datos
                        </button>
                    </div>

                </div>

                <UpdateModal
                    show={this.state.manageUserModalShow}
                    onHide={this.onUpdateModalHide}
                    title={this.state.modalTitle}
                    action={this.state.action}

                    onChange={this.handleChange}
                    form={this.state.form}
                    editPass={this.OnEditPass}
                    onSubmitUpdate={this.onSubmitUpdate}
                />
            </div>
        )
    }
}
