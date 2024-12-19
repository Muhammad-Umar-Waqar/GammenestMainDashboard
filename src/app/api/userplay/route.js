
// import { queryApi, writeApi, bucket } from '../../lib/db';

// export async function POST(req) {
//   try {
//     const { coins, game } = await req.json();

//     if (!coins || !game) {
//       return new Response(
//         JSON.stringify({ message: 'Invalid data: "game" and "coins" are required' }),
//         { status: 400 }
//       );
//     }

//     const fluxQuery = `
//       from(bucket: "${bucket}")
//         |> range(start: -1y)
//         |> filter(fn: (r) => r._measurement == "users")
//         |> filter(fn: (r) => r.email == "${email}")
//     `;

//     const emailExists = await new Promise((resolve, reject) => {
//       let found = false;
//       queryApi.queryRows(fluxQuery, {
//         next() {
//           found = true;
//         },
//         error(error) {
//           console.error(`Error checking email existence: ${error.message}`);
//           reject(error);
//         },
//         complete() {
//           resolve(found);
//         },
//       });
//     });

//     if (emailExists) {
//       return new Response(
//         JSON.stringify({ message: 'Email already exists' }),
//         { status: 409 }
//       );
//     }

//     const record = `users,email=${email} password="${password}"`;
//     writeApi.writeRecord(record);
//     await writeApi.close();

//     return new Response(
//       JSON.stringify({ message: 'User added successfully' }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error('Error adding user:', error);
//     return new Response(
//       JSON.stringify({ message: 'Error adding user', error: error.message }),
//       { status: 500 }
//     );
//   }
// }