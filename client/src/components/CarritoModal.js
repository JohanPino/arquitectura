import React, { Component } from 'react'
import Modal from "./GenericModal";
import { MDBIcon, MDBTooltip } from "mdbreact";

import './styles/UserNotificationsModal.css'

export default class CarritoModal extends Component {
    render() {
        return (
            <Modal
                title={this.props.title}
                show={this.props.show}
                onHide={this.props.onHide}
            >

                <div className="notifications_container">
                    <div className="friendList">
                        <ul class="list-group">
                            {this.props.carrito.length === 0 &&
                                <li className="list-group-item">
                                    TU CARRITO ESTA VACIO
                                </li>
                            }
                            {this.props.carrito.length != 0 &&
                            <div className="float-right">
                                <MDBTooltip
                                    domElement
                                    tag="span"
                                    placement="bottom"
                                >
                                    <button
                                        className="btn btn_www"
                                        onClick={this.props.cleanCarrito}

                                    >
                                        Comprar
                                    </button>
                                    <span>Terminar la compra</span>
                                </MDBTooltip>
                            </div>
                            }

                            {this.props.carrito.map(producto => (
                                <li className="list-group-item" key={producto.id}>

                                    <img width="200px" height="200px" class="img-thumbnail float-right img-fluid" alt="Responsive image" src={producto.image}></img>
                                    <div className="float-left">
                                        {/* <small class="text-muted notification_date"> */}

                                        <p class="font-weight-bold">{producto.description}</p>
                                        <p class="text-success">Precio: ${producto.price}</p>
                                        <p class="text-primary">Cantidad: {producto.quantity}</p>
                                        <p class="text-success font-weight-bold">Total: ${producto.total}</p>
                                        {/* </small> */}

                                    </div>
                                </li>
                            ))
                            }
                        </ul>
                    </div>
                </div>
            </Modal>
        )
    }
}
