

// components/EditModal.js
import Swal from 'sweetalert2';

const showEditModal = (onConfirm, currentData) => {
    Swal.fire({
        title: 'Edit Item',
        input: 'text',
        inputLabel: 'Edit your content',
        inputValue: currentData,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Save',
        preConfirm: (value) => {
            if (!value) {
                Swal.showValidationMessage('You need to write something!');
            } else {
                return value;
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Saved!',
                'Your item has been edited.',
                'success'
            );
            onConfirm(result.value);
        }
    });
};

export default showEditModal;
