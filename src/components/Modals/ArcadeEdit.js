import Swal from "sweetalert2";

const showEditModal = async (onConfirm, currentData, gameList, arcadeGames, venueList) => {
  // Prepopulate venue selection
  let selectedVenue = currentData.venue_id || "None"; // Prepopulate venue selection
  let qrCodeUrl = "";
  console.log(currentData.api_key)
  console.log(arcadeGames);

  // Generate QR code URL for the arcade's API key
  if (currentData.api_key) {
    qrCodeUrl = await QRCode.toDataURL(currentData.api_key);
  }

  const renderModal = () => {
    Swal.fire({
      title: "Edit Arcade Details",
      html: `
    <div class="max-w-lg mx-auto p-4 space-y-6">

  <div class="my-5">
    <label for="arcade_id" class="text-left font-medium text-gray-700 mb-2">Arcade ID</label>
    <input 
      id="arcade_id" 
      class="p-3 border border-gray-300 focus:outline-none rounded-xl w-full" 
      value="${currentData.arcade_id || ''}" 
      placeholder="Enter Arcade ID"
    />
  </div>


  <div class="my-5">
    <label for="coins_required" class="text-left font-medium text-gray-700 mb-2">Coins Required</label>
    <input 
      id="coins_required" 
      type="number" 
      class="p-3 border border-gray-300 focus:outline-none rounded-xl w-full" 
      value="${currentData.coins_required || ''}" 
      placeholder="Enter Coins Required"
    />
  </div>
</div>


        <div class="mt-4">
          <h3 class="text-left font-medium text-gray-700">Game List</h3>
          <table class="w-full border-collapse border border-gray-300 mt-2  rounded-xl ">
            <thead>
              <tr>
                <th class="border border-gray-300 p-2">Game Name</th>
                <th class="border border-gray-300 p-2">Select</th>
              </tr>
            </thead>
            <tbody id="game-list">
              ${gameList
                .map(
                  (game) => `
                  <tr>
                    <td class="border border-gray-300 p-2">${game.game_name}</td>
                    <td class="border border-gray-300 p-2 text-center">
                      <input 
                        type="checkbox" 
                        data-id="${game.game_id}" 
                        ${arcadeGames.some((ag) => ag.game_id === game.game_id) ? "checked" : ""}
                      />
                    </td>
                  </tr>
                `
                )
                .join("")}
            </tbody>
          </table>
        </div>

        <div class="mt-4">
          <h3 class="text-left font-medium text-gray-700">Venue List</h3>
          <select id="venue-dropdown" class="swal2-input mt-1 rounded-xl  border border-gray-300 ">
            <option value="None" ${selectedVenue === "None" ? "selected" : ""}>None</option>
            ${venueList
              .map(
                (venue) => `
                <option value="${venue.venue_id}" ${selectedVenue === venue.venue_id ? "selected" : ""}>
                  ${venue.venue_name}
                </option>`
              )
              .join("")}
          </select>
        </div>
        <div class="mt-4 text-center">
          <h3 class="text-left font-medium text-gray-700">QR Code</h3>
          ${
            currentData.qrCode ? `<img src="${currentData.qrCode}" alt="QR Code" class="mt-2 mx-auto"/>` : "No API Key Available"
          }
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Save",
      didOpen: () => {
        const checkboxes = Swal.getPopup().querySelectorAll("#game-list input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
          checkbox.addEventListener("change", (e) => {
            const gameId = parseInt(e.target.getAttribute("data-id"), 10);
            if (e.target.checked) {
              arcadeGames.push({ game_id: gameId });
            } else {
              const index = arcadeGames.findIndex((ag) => ag.game_id === gameId);
              if (index > -1) {
                arcadeGames.splice(index, 1);
              }
            }
          });
        });

        const venueDropdown = Swal.getPopup().querySelector("#venue-dropdown");
        venueDropdown.addEventListener("change", (e) => {
          selectedVenue = e.target.value;
        });
      },
      preConfirm: () => {
        const arcadeId = Swal.getPopup().querySelector("#arcade_id").value.trim();
        const coinsRequired = Swal.getPopup().querySelector("#coins_required").value.trim();

        if (!arcadeId || !coinsRequired) {
          Swal.showValidationMessage("All fields are required!");
          return;
        }

        return {
          arcade_id: arcadeId,
          coins_required: coinsRequired,
          games: arcadeGames.map((game) => game.game_id),
          venue_id: selectedVenue === "None" ? null : selectedVenue,
        };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm(result.value);
        Swal.fire("Saved!", "Arcade details have been updated.", "success");
      }
    });
  };

  renderModal();
};

export default showEditModal;
