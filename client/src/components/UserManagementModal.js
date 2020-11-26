import React, { Component } from 'react'
import Modal from "./GenericModal";
import './styles/UpdateReadUserModal.css'
import { MDBInput } from "mdbreact";
import resources_controller from '../resources/resources_controller'


export default class UpdateUserModal extends Component {
    componentDidMount() {
    }
    render() {
        return (
            <Modal
                title={this.props.title}
                show={this.props.show}
                onHide={this.props.onHide}
            >

                <form onSubmit={this.props.action === resources_controller.USER_MODAL_ACTION.update ? this.props.onSubmitUpdate : this.props.onSubmit}>

                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Nombre"
                                name="name"
                                type="text"
                                value={this.props.form.name}
                                onChange={this.props.onChange}

                            />
                        </div>
                        <div className="col">
                            <MDBInput
                                label="Apellido"
                                name="lastname"
                                type="text"
                                value={this.props.form.lastname}
                                onChange={this.props.onChange}
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
                                onChange={this.props.onChange}

                            />
                        </div>
                        <div className="col">
                            {this.props.action === resources_controller.USER_MODAL_ACTION.update &&
                                <MDBInput
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    value={this.props.form.password}
                                    onChange={this.props.onChange}
                                    icon="edit"
                                    onIconClick={(e => {
                                        this.props.editPass()
                                    })}
                                />
                            }
                            {this.props.action === resources_controller.USER_MODAL_ACTION.insert &&
                                <MDBInput
                                    label="Contraseña"
                                    name="password"
                                    type="password"
                                    value={this.props.form.password}
                                    onChange={this.props.onChange}
                                />
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <MDBInput
                                label="Email"
                                name="email"
                                type="email"
                                value={this.props.form.email}
                                onChange={this.props.onChange}
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
                                onChange={this.props.onChange}

                            />
                        </div>
                        <div className="col mt-4">
                            <select
                                className="browser-default custom-select www_select "
                                name="sex"
                                value={this.props.form.sex}
                                onChange={this.props.onChange}
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
                                onChange={this.props.onChange}
                            />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            {this.props.action === resources_controller.USER_MODAL_ACTION.update &&
                                <MDBInput
                                    label="Fecha nacimiento"
                                    name="birthdate"
                                    type="date"
                                    value={this.props.form.birthdate}
                                    onChange={this.props.onChange}
                                    icon="edit"
                                    onIconClick={(e => {
                                        this.props.editBirthdate()
                                    })}
                                />

                            }
                            {this.props.action === resources_controller.USER_MODAL_ACTION.insert &&
                                <MDBInput
                                    label="Fecha nacimiento"
                                    name="birthdate"
                                    type="date"
                                    value={this.props.form.birthdate}
                                    onChange={this.props.onChange}
                                />
                            }

                        </div>
                        {resources_controller.GetSession("role") === resources_controller.USER_ROL_NAME.SUPER_USER &&
                            <div className="col mt-4">
                                <select
                                    className="browser-default custom-select www_select"
                                    name="role"
                                    value={this.props.form.role}
                                    onChange={this.props.onChange}
                                >
                                    <option value="default" selected disabled>Escoge un Rol</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Comprador">Comprador</option>

                                </select>
                            </div>

                        }

                    </div>

                    <div className="row">
                        <div className="col">

                            {this.props.action === resources_controller.USER_MODAL_ACTION.update &&
                                <button type="submit" className="btn btn_www btn-block">Actualizar usuario</button>
                            }
                            {this.props.action === resources_controller.USER_MODAL_ACTION.insert &&
                                <button type="submit" className="btn btn_www btn-block">Crear Usuario</button>
                            }
                        </div>
                    </div>
                </form>


            </Modal>
        )
    };
}
