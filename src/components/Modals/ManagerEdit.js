import Swal from "sweetalert2";

const showEditModal = async (onConfirm, currentData, allArcades, managerArcades) => {
  const selectedArcades = new Set(managerArcades?.map((arcade) => arcade.arcade_id) || []);
  console.log(selectedArcades)
  const renderModal = () => {
    Swal.fire({
      title: "Edit Manager Details",
      html: `
       <div class="flex flex-col w-full max-w-lg mx-auto p-4 space-y-6">
    <label for="username" class="text-left font-medium text-gray-700 my-2">Username</label>
    <input id="username" class="p-3 border border-gray-300 focus:outline-none rounded-xl my-2 w-full" value="${currentData.username || ""}" placeholder="Enter Username">

    <label for="password" class="text-left font-medium text-gray-700 my-2">Password</label>
    <input id="password" type="password" class="p-3 border border-gray-300 focus:outline-none rounded-xl my-2 w-full" value="${currentData.password || ""}" placeholder="Enter Password">

    <label for="phone_number" class="text-left font-medium text-gray-700 my-2">Contact No.</label>
    <input id="phone_number" class="p-3 border border-gray-300 focus:outline-none rounded-xl my-2 w-full" value="${currentData.phone_number || ""}" placeholder="Enter Contact No.">

    <label for="email" class="text-left font-medium text-gray-700 my-2">Email</label>
    <input id="email" type="email" class="p-3 border border-gray-300 focus:outline-none rounded-xl my-2 w-full" value="${currentData.email || ""}" placeholder="Enter Email">
</div>

        <div class="mt-4">
          <h3 class="text-left font-medium text-gray-700">Arcade List</h3>
          <table class="w-full border-collapse border border-gray-300 mt-2">
            <thead>
              <tr>
                <th class="border border-gray-300 p-2">Arcade ID</th>
                <th class="border border-gray-300 p-2">Select</th>
              </tr>
            </thead>
            <tbody id="arcade-list">
              ${allArcades
                .map(
                  (arcade) => `
                  <tr>
                    <td class="border border-gray-300 p-2">${arcade.arcade_id}</td>
                    <td class="border border-gray-300 p-2 text-center">
                      <input 
                        type="checkbox" 
                        data-id="${arcade.arcade_id}"
                        ${selectedArcades.has(arcade.arcade_id) ? "checked" : ""}
                      />
                    </td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      didOpen: () => {
        // Attach event listeners to the checkboxes dynamically
        const checkboxes = Swal.getPopup().querySelectorAll("#arcade-list input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", (e) => {
            const arcadeId = e.target.getAttribute("data-id");
            if (e.target.checked) {
              selectedArcades.add(arcadeId);
            } else {
              selectedArcades.delete(arcadeId);
            }
          });
        });
      },
      preConfirm: () => {
        const username = Swal.getPopup().querySelector("#username").value.trim();
        const password = Swal.getPopup().querySelector("#password").value.trim();
        const phone_number = Swal.getPopup().querySelector("#phone_number").value.trim();
        const email = Swal.getPopup().querySelector("#email").value.trim();

        if (!username || !password || !phone_number || !email) {
          Swal.showValidationMessage("All fields are required!");
          return;
        }

        return {
          username,
          password,
          phone_number,
          email,
          selectedArcades: Array.from(selectedArcades),
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(result.value);
        Swal.fire("Saved!", "Manager details have been updated.", "success");
      }
    });
  };

  renderModal();
};

export default showEditModal;
