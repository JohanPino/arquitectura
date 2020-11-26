import React, { useState, useEffect } from 'react'
import CarritoModal from '../components/CarritoModal'
import './styles/Home.css'
import { MDBIcon, MDBTooltip } from "mdbreact";
import resources_controller from '../resources/resources_controller'
import products from '../utils/Products'
import validations from '../resources/validations/main'



let primera = true
export default function Home() {


    const [carrito, setCarrito] = useState([]);
    const [show, setShow] = useState(false);


    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            window.location.href = '/';
        } else {
            if (resources_controller.GetSession("role") === resources_controller.USER_ROL_NAME.SUPER_USER) {
                window.location.href = 'UserManagement';
            }
        }
    }, [])

    const cleanCarrito = () =>{
        setCarrito([])
        validations.SuccessToast("Compra finalizada con exito");
    }

    const comprar = (objeto) => {

        if (primera) {
            objeto.quantity = 1
            objeto.total = objeto.price * objeto.quantity
            setCarrito([objeto])
            primera = false

        } else {
            const carritoIndex = carrito.findIndex(element => element.id == objeto.id)
            if (carrito[carritoIndex] != undefined) {
                carrito[carritoIndex] = { ...carrito[carritoIndex], quantity: carrito[carritoIndex].quantity += 1 }
                carrito[carritoIndex] = { ...carrito[carritoIndex], total: carrito[carritoIndex].price * carrito[carritoIndex].quantity }
                if (carrito.length === 1) {
                    setCarrito([carrito[carritoIndex]])

                } else {
                    setCarrito([...carrito])

                }

            } else {
                objeto.quantity = 1
                objeto.total = objeto.price * objeto.quantity
                setCarrito([...carrito, objeto])
            }

        }

    }

    const ModalHide = () => {
        setShow(false)
    }
    const ModalOpen = () => {
        setShow(true)
    }


    return (
        <div>
            <div className="float-right fixed-bottom">
                <MDBTooltip
                    domElement
                    tag="span"
                    placement="bottom"
                >
                    <button
                        className="btn btn_www"
                        onClick={() => ModalOpen()}
                    >
                        <MDBIcon icon="shopping-cart" size="2x" />
                        {carrito.length}

                    </button>
                    <span>{carrito.length}</span>
                </MDBTooltip>


            </div>
            <div class="card-columns">
                {products.map(product => (
                    <div class="card card_market shadow p-3 mb-5 bg-white rounded" key={product.id}>

                        <img
                            className="card-img-top card-img"
                            src={product.image}
                            alt="Logo"
                        />

                        <div className="card-body">
                            <h5 className="card-title">
                                {product.name}
                            </h5>
                            <p className="card-text">
                                {product.description}
                                <p class="text-success">$ {product.price}</p>
                            </p>
                            <button onClick={() => comprar(product)} className="btn btn-block btn-primary">
                                Agregar al carrito
                                </button>
                        </div>
                    </div>
                ))}

            </div>

            <CarritoModal
                carrito={carrito}
                show={show}
                onHide={()=>ModalHide()}
                title={"Mi Carrito"}
                cleanCarrito={cleanCarrito}
            />


        </div>
    )

}
