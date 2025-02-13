import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function DeletePost({ blogs, fetchData }) {

    const removeToggle = async () => {
   
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to remove this blog post?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, remove it!',
            cancelButtonText: 'No, cancel',
            customClass: {
                confirmButton: 'sweet-confirm',
                cancelButton: 'sweet-cancel'
            }
        });

        if (result.isConfirmed) {
      
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs/deleteBlog/${blogs}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data.message);

                if (data.message === "Blog post deleted successfully") {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        text: 'Blog post deleted successfully',
                        customClass: {
                            confirmButton: 'sweet-warning'
                        }
                    });
                 
                } else {
                    Swal.fire({
                        title: 'Something Went Wrong',
                        icon: 'error',
                        text: 'Please try again',
                        customClass: {
                            confirmButton: 'sweet-warning'
                        }
                    });
                }

            } catch (error) {
                console.error("Error:", error);
                Swal.fire({
                    title: 'Error',
                    icon: 'error',
                    text: 'Failed to remove blog post. Please try again later.',
                    customClass: {
                        confirmButton: 'sweet-warning'
                    }
                });
            }
        } else if (result.isDismissed) {
          
            Swal.fire({
                title: 'Cancelled',
                text: 'Blog post deletion cancelled.',
                icon: 'info',
                customClass: {
                    confirmButton: 'sweet-warning'
                }
            });
        }
        fetchData();
    }

    return (
        <Button className="btnRemove me-2" variant="danger" size="sm" onClick={removeToggle}>
            Remove
        </Button>
    )
}
