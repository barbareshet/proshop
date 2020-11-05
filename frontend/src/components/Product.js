import React from 'react';
import {Card} from "react-bootstrap";

const Product = (props) => {
    const {product} = props;
    return (
        <Card className="my-3 text-center">
            <a href={`/product/${product._id}`}>
                <Card.Img src={product.image} variant="top"/>
            </a>
            <Card.Body>
                <a href={`/product/${product._id}`}>
                    <Card.Title as="div">
                        <strong>{product.name}</strong>
                    </Card.Title>
                </a>
                <Card.Text as="div">
                    <div className="my-3">
                        {product.rating} from {product.numReviews} reviews
                    </div>
                </Card.Text>
                <Card.Text as="h4">
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}
export default Product