import React, { Component } from 'react'
import Modal from "./GenericModal";
import './styles/UpdateReadUserModal.css'
import { MDBInput } from "mdbreact";



export default class UpdateUserModal extends Component {
    UpdateUser = () => {
        alert("clic")
    }
    render() {
        return (
            <Modal
                title={this.props.title}
                show={this.props.show}
                onHide={this.props.onHide}
            >

                <form onSubmit={this.props.handleSignUp}>

                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Nombre"
                                name="name"
                                type="text"
                                value={this.props.form.name}
                                onChange={this.props.handleChangeForm}

                            />
                        </div>
                        <div className="col">
                            <MDBInput
                                label="Apellido"
                                name="lastname"
                                type="text"
                                value={this.props.form.lastname}
                                onChange={this.props.handleChangeForm}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Identificacion"
                                name="identification"
                                type="number"
                                value={this.props.form.identification}
                                onChange={this.props.handleChangeForm}

                            />
                        </div>
                        <div className="col">

                            <MDBInput
                                label="Contraseña"
                                name="password"
                                type="password"
                                value={this.props.form.password}
                                onChange={this.props.handleChangeForm}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Email"
                                name="email"
                                type="email"
                                value={this.props.form.email}
                                onChange={this.props.handleChangeForm}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Celular"
                                name="cellphone"
                                type="number"
                                value={this.props.form.cellphone}
                                onChange={this.props.handleChangeForm}

                            />
                        </div>
                        <div className="col mt-4">
                            <select
                                className="browser-default custom-select www_select "
                                name="sex"
                                value={this.props.form.sex}
                                onChange={this.props.handleChangeForm}
                            >
                                <option value="default" selected disabled>Escoge un sexo</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Masculino">Masculino</option>

                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Direccion vivienda"
                                name="house_address"
                                type="text"
                                value={this.props.form.house_address}
                                onChange={this.props.handleChangeForm}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Fecha nacimiento"
                                name="birthdate"
                                type="date"
                                value={this.props.form.birthdate}
                                onChange={this.props.handleChangeForm}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn_www btn-block">Crear Usuario</button>
                        </div>
                    </div>
                </form>


            </Modal>
        )
    };
}
