import React, { useEffect, useState } from "react";
import { useOrderDetails } from "../../contexts/OrderDetails";
import axios from "axios";
import Button from "react-bootstrap/Button";

export default function OrderConfirmation({ setOrderPhase }) {
    const { resetOrder } = useOrderDetails();
    const [orderNumber, setOrderNumber] = useState(null);

    useEffect(() => {
        axios
            .post(`http://localhost:3030/order`)
            .then((response) => {
                setOrderNumber(response.data.orderNumber);
            })
            .catch((error) => {
                // TODO: handle error here
            });
    }, []);

    function handleClick() {
        // clear the order details
        resetOrder();

        // send back to order page
        setOrderPhase("inProgress");
    }

    const newOrderButton = (
        <Button onClick={handleClick}>Create new order</Button>
    );

    if (orderNumber) {
        return (
            <div style={{ textAlign: "center" }}>
                <h1>Thank You!</h1>
                <p>Your order number is {orderNumber}</p>
                <p style={{ fontSize: "25%" }}>
                    as per our terms and conditions, nothing will happen now
                </p>
                {newOrderButton}
            </div>
        );
    } else {
        return <div>Loading</div>
    }
}
