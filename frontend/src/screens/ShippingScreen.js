import React, {useState} from 'react';
import {Form, Button} from "react-bootstrap";
import {useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import FormContainer from "../components/formContainer";

function ShippingScreen( {history} ) {
    const [address, setAddress ]    = useState('');
    const [city, setCity ]          = useState('');
    const [zipcode, setZipcode ]    = useState('');
    const [country, setCountry ]    = useState('');

    const submitHandler = (e)=> {
        e.preventDefault();
        console.log(e);
    }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Your Address" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Your City" value={city} onChange={(e)=>setCity(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="zipcode">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="text" placeholder="Your Zipcode" value={zipcode} onChange={(e)=>setZipcode(e.target.value)}/>
                </Form.Group>
                <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Your Country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
                </Form.Group>
            </Form>
        </FormContainer>
    );
}

export default ShippingScreen;