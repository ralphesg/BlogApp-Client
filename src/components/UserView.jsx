import { useEffect, useState } from 'react';
import { Button, CardGroup, Card, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ViewBlogPost from '../components/ViewBlogPost'
import AddBlog from '../components/AddBlog'

export default function UserView({ blogsData, fetchData, userId, isAdmin }) {

    const formatDate = (date) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
   };

    return (
        (blogsData.length <= 0 ) ?
            <>
              <h2 className="page-title text-center mt-4">Blog Posts</h2>
                <div className ="text-center my-3">
                <AddBlog fetchData={fetchData}/>
                </div>
            </>
            :
            <Container className="container">
                <h2 className="page-title text-center mt-4">Blog Posts</h2>
                <div className ="text-center my-3">
                <AddBlog fetchData={fetchData}/>
                </div>
                <Row className="mt-4">
                    {blogsData.map(blogs => (
                        <Col key={blogs._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                            <Card className="card h-100">
                                <Card.Body className="cardBody">
                                    <Card.Title className="custom-card-title text-center">{blogs.title}</Card.Title>
                                    <Card.Subtitle className="custom-card-description text-center">{blogs.description}</Card.Subtitle>
                                    <Card.Text className="text-center">{blogs.author}</Card.Text>
                                    <hr></hr>
                                    <Card.Text className="custom-card">{blogs.content}</Card.Text>
                                    <Card.Text className="custom-card text-center">{formatDate(blogs.dateCreated)}</Card.Text>
                                </Card.Body>
                                <Card.Footer className="text-center">
                                     <ViewBlogPost blogs={blogs} fetchData={fetchData} userId={userId} isAdmin={isAdmin}/>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}

                </Row>
            </Container>
    );
}


