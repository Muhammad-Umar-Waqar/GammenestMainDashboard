import Swal from "sweetalert2";

const showEditModal = (onConfirm, currentData) => {
  console.log(currentData);
    Swal.fire({
      title: 'Edit Venue Details',
      html: `
        <label for="venue_name" class="text-left my-2 font-medium text-gray-700">Venue Name</label>
        <input id="venue_name" class="py-3 my-2 px-2 border border-gray-300 focus:none outline-none rounded-xl " value="${currentData?.venue_name || ''}" placeholder="Enter Venue Name">
        
        <label for="venue_city" class="text-left my-2 font-medium text-gray-700">City Name</label>
        <input id="venue_city" class="py-3 my-2 px-2 border border-gray-300 focus:none outline-none rounded-xl " value="${currentData?.venue_city || ''}" placeholder="Enter City Name">
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save',
      preConfirm: () => {
        const venue_name = Swal.getPopup().querySelector('#venue_name').value.trim();
        const venue_city = Swal.getPopup().querySelector('#venue_city').value.trim();
  
        if (!venue_name || !venue_city) {
          Swal.showValidationMessage('All fields are required!');
          return;
        }
  
        return { venue_name, venue_city };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(result.value);
        Swal.fire('Saved!', 'Venue details have been updated.', 'success');
      }
    });
  };
  
  export default showEditModal;
  