import React from 'react';
import {Link} from "react-router-dom";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
const Product = (props) => {
    const { product } = props;
    return (
        <Card className = "my-3 text-center">
            <Link to={ `/product/${product._id}` }>
                <Card.Img src={ product.image } variant="top"/>
            </Link>
            <Card.Body>
                <Link to={ `/product/${product._id}` }>
                    <Card.Title as = "div">
                        <strong> { product.name } </strong>
                    </Card.Title>
                </Link>
                <Card.Text as = "div">
                    <Rating value = { product.rating } text = { `Based on ${product.numReviews} reviews` }/>
                </Card.Text>
                <Card.Text as="h4" className = "py-3">
                    $ { product.price }
                    </Card.Text>
            </Card.Body>
        </Card>
    );
}


export default Product