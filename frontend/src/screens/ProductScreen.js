import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/Rating";
import {productDetails} from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";


const ProductScreen = ({match}) => {

    const dispatch = useDispatch()
    const productInfo = useSelector( state => state.productDetails)
    const { loading, error, product } = productInfo
    // const [product, setProduct] = useState({});
    useEffect( () => {
        dispatch(productDetails(match.params.id));
    }, [dispatch, match ])

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                Go Back
            </Link>
            {loading ? (
                <Loader/>
            ) : error ? (
                    <Message varient="danger">{error}</Message>
                ) :
                (
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h1>{product.name}</h1>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <h4>{product.brand}</h4>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`Based on ${product.numReviews} reviews`}/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Product Description: ${product.description}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Categories: {product.category}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col> <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Button className="btn-block" type="button" disabled={product.countInStock === 0 }>Add to Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )
            }


        </>
    )
}

export default ProductScreen