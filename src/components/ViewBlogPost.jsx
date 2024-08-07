import React, { useState } from "react";
import { Container, Card, Button, Row, Col, InputGroup, FormControl, Form, Modal } from 'react-bootstrap';
import Swal from "sweetalert2";

import DeletePost from '../components/DeletePost'
import UpdatePost from '../components/UpdatePost'
import DeleteComment from '../components/DeleteComment'

export default function ViewBlogPost ({ blogs, fetchData, isAdmin, userId }) {
  const [comment, setComment] = useState("");
  const [showEdit, setShowEdit] = useState(false);

  const formatDate = (date) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
};

  const openEdit = () => {
    setShowEdit(true);
  };

  const closeEdit = () => {
    setShowEdit(false);
  };

  const addComment = (e) => {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/blogs/addComment/${blogs._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
    	comment: comment
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      	console.log(data)
        if (data.message === 'comment added successfully') {
          Swal.fire({
            title: "Success!",
            icon: "success",
            text: "Comment Successfully Added",
            customClass: {
              confirmButton: 'sweet-warning',
            },
          });  
        } else {
          Swal.fire({
            title: "Error!",
            icon: "error",
            text: "Please try again",
            customClass: {
              confirmButton: 'sweet-warning',
            },
          });
          console.log(data.error)
        }
      	setComment("")
        fetchData();
      });
  };

  return (
    <>
      <Button className="btnUpdate" variant="primary" size="sm" onClick={openEdit}>
        Details
      </Button>

      <Modal id="create-modal" show={showEdit} onHide={closeEdit}>
        <Container className="mt-5">
          <Row>
            <Col>
              <Card>
                <Card.Body className="p-0">
                  <Card.Title className="text-center bg-dark text-white p-2">
                    {blogs.title}
                  </Card.Title>
                  <Card.Text className="m-2 text-center">{blogs.description}</Card.Text>
                  <Card.Text className="m-2 text-center">{blogs.content}</Card.Text>
                  <Card.Footer>
                    <Card.Text className="text-center">{blogs.author} - {formatDate(blogs.dateCreated)}</Card.Text>
                  </Card.Footer>
                </Card.Body>
              </Card>
            </Col>
          </Row>
               {userId === blogs.userId ? (
                  <div className="text-center my-2">
                  <UpdatePost blogs={blogs} fetchData={fetchData} />
                  <DeletePost blogs={blogs._id} fetchData={fetchData} />
                  </div>
                 ) : isAdmin ? (
                  <div className="text-center my-2">
                  <DeletePost blogs={blogs._id} fetchData={fetchData} />
                  </div>
                 ) : null}
    
                 
        </Container>

          <Form onSubmit={addComment}>
            <Modal.Header>
              <Modal.Title>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group controlId="blogComment">
                <Form.Label>Add Comment</Form.Label>
                <Form.Control
                  type="text"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              {blogs.comments && blogs.comments.length > 0 ? (
                blogs.comments.map((commentItem) => (
                  <Col key={commentItem._id} className="my-2">
                    <Card className="card h-100">
                      <Card.Body className="cardBody">
                        <Card.Title className="custom-card-title">{commentItem.username}</Card.Title>
                        <Card.Text className="custom-card-description">{commentItem.comment}</Card.Text>
                        <Card.Subtitle>{formatDate(commentItem.dateAdded)}</Card.Subtitle>
                              {isAdmin ? (
                                <div className="text-center">
                               <DeleteComment blogs={blogs._id}comments={commentItem._id} fetchData={fetchData} />
                                </div>
                                 ) : (
                                   null
                                )}

                      </Card.Body>
                             
                    </Card>
                  </Col>
                ))
              ) : (
                <p className = "my-4">No comments available</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeEdit}>
                Close
              </Button>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Modal.Footer>
          </Form>
        
      </Modal>
    </>
  );
};

