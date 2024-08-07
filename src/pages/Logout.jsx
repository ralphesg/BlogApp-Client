import { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Logout({toggleLogin}) {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setShowAlert(true);
    }, []);

    useEffect(() => {
        if (showAlert) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You are about to log out!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, log out',
                cancelButtonText: 'No, cancel',
                customClass: {
                    confirmButton: 'sweet-confirm',
                    cancelButton: 'sweet-cancel'
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    toggleLogin();
                    localStorage.clear();

                    navigate('/login');
                } else if (result.isDismissed) {
                    navigate('/');
                }
                setShowAlert(false); 
            });
        }
    }, [showAlert]);

    return null;
}