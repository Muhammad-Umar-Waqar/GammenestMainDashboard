


// components/DeleteModal.js
import Swal from 'sweetalert2';

const showDeleteConfirm = (onConfirm) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Deleted!',
                'Your item has been deleted.',
                'success'
            );
            onConfirm();
        }
    });
};

export default showDeleteConfirm;