import React, {useState, useEffect} from 'react';
import {
    Form,
    Button,
    Row,
    Col
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userAction";

const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);


    const dispatch = useDispatch();
    const userDetails = useSelector( (state) => state.userDetails );
    const { loading, error, user } = userDetails;
    // console.log(userDetails);
    const userLogin = useSelector( (state) => state.userLogin );
    const { userInfo } = userLogin;
    console.log(userInfo);
    useEffect( ()=>{
        if ( !userInfo ){
            history.push('/login')
        } else {
            if (!user || !user.name){
                dispatch( getUserDetails('profile'))
            } else {
                // console.log(userInfo);
                setName(user.name);
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user]);
    const submitHandler = (e)=> {
        e.preventDefault();
        // Dispatch Profile
        if ( password !== confirmPassword ){
            setMessage('Passwords do not match')
        } else {
           //Dispatch update profile

        }
    }
    return (
        <Row>
            <Col md={4}>
                <h2>Profile</h2>
                {message && <Message varient="danger">{message}</Message>}
                {error && <Message varient="danger">{error}</Message>}
                {loading && <Loader/>}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Your Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Your Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Your Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                    <Button type="submit" variant="primary">Update</Button>
                </Form>
            </Col>
            <Col md={8}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    );
};
export default ProfileScreen