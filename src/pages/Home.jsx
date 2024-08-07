import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Home() {


    return (
        <Row>
            <Col className="text-center mx-auto">
                <h1>Welcome to Blogger</h1>
                <p>Post what is on your mind!</p>
                {(localStorage.length !== 0) ?
                <Link className="btn btn-primary" to={"/posts"}>Let's Go!</Link>
                :
                <Link className="btn btn-primary" to={"/login"}>Login to start</Link>
            	}
            </Col>
        </Row>
    )
}