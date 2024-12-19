// import { InfluxDB, Point  } from '@influxdata/influxdb-client';

// const INFLUX_TOKEN = process.env.INFLUX_TOKEN;
// const INFLUX_URL = process.env.INFLUX_URL;
// const INFLUX_ORG = process.env.INFLUX_ORG;
// const INFLUX_BUCKET = process.env.INFLUX_BUCKET;

// const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
// const queryApi = influxDB.getQueryApi(INFLUX_ORG);



// export async function POST(req) {
//   try {
//     const body = await req.json(); // Parse JSON body from request
//     const { arcadeId, coins, hardPlay } = body;

//     // Validate input
//     if (!arcadeId || coins === undefined || hardPlay === undefined) {
//       return new Response(
//         JSON.stringify({ error: 'Missing required fields: arcadeId, coins, hardPlay.' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // Allow any non-empty string as a valid measurement name
//     const measurementName = arcadeId.trim();
//     if (measurementName.length === 0) {
//       return new Response(
//         JSON.stringify({ error: 'Invalid arcadeId. Must be a non-empty string.' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // Ensure coins and hardPlay are integers
//     const coinsInt = parseInt(coins, 10);
//     const hardPlayInt = parseInt(hardPlay, 10);

//     if (isNaN(coinsInt) || isNaN(hardPlayInt)) {
//       return new Response(
//         JSON.stringify({ error: '`coins` and `hardPlay` must be valid integers.' }),
//         { status: 400, headers: { 'Content-Type': 'application/json' } }
//       );
//     }

//     // Create a point with the dynamic measurement name
//     const point = new Point(measurementName)
//       .intField('coins', coinsInt)
//       .intField('hardPlay', hardPlayInt);

//     // Write the point to InfluxDB
//     writeApi.writePoint(point);

//     // Ensure all writes are completed
//     await writeApi.flush();

//     return new Response(
//       JSON.stringify({
//         message: `Data successfully written to measurement: ${measurementName}`,
//       }),
//       {
//         status: 200,
//         headers: { 'Content-Type': 'application/json' },
//       }
//     );
//   } catch (error) {
//     console.error('Error writing to InfluxDB:', error);
//     return new Response(
//       JSON.stringify({ error: 'Failed to write data to InfluxDB', details: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }

// export async function GET(req) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const measurement = searchParams.get('measurement');
//     const timeRange = searchParams.get('timeRange') || '-1h';

//     if (!measurement) {
//       return new Response(
//         JSON.stringify({ error: 'Measurement is required.' }),
//         { status: 400 }
//       );
//     }

//     if (!/^-\d+[smhdw]$/.test(timeRange)) {
//       return new Response(
//         JSON.stringify({ error: 'Invalid or missing time range.' }),
//         { status: 400 }
//       );
//     }

//     // Flux Query
//     const fluxQuery = `
//       from(bucket: "${INFLUX_BUCKET}")
//         |> range(start: ${timeRange})
//         |> filter(fn: (r) => r._measurement == "${measurement}")
//         |> filter(fn: (r) => r._field == "coins" or r._field == "hardPlay")
//         |> pivot(rowKey:["_time"], columnKey:["_field"], valueColumn: "_value")
//         |> keep(columns: ["_time", "coins", "hardPlay"])
//     `;

//     const rows = [];
//     await new Promise((resolve, reject) => {
//       queryApi.queryRows(fluxQuery, {
//         next(row, tableMeta) {
//           const data = tableMeta.toObject(row);
//           rows.push({
//             time: data._time,
//             coins: data.coins || 0,
//             hardPlay: data.hardPlay || 0,
//           });
//         },
//         error(err) {
//           console.error('Query error:', err);
//           reject(err);
//         },
//         complete() {
//           resolve();
//         },
//       });
//     });

//     return new Response(JSON.stringify({ data: rows }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     console.error('Error querying InfluxDB:', error);
//     return new Response(
//       JSON.stringify({ error: 'Failed to query InfluxDB', details: error.message }),
//       { status: 500, headers: { 'Content-Type': 'application/json' } }
//     );
//   }
// }

import { InfluxDB, Point } from '@influxdata/influxdb-client';

const INFLUX_TOKEN = process.env.INFLUX_TOKEN;
const INFLUX_URL = process.env.INFLUX_URL;
const INFLUX_ORG = process.env.INFLUX_ORG;
const INFLUX_BUCKET = process.env.INFLUX_BUCKET;

const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });
const queryApi = influxDB.getQueryApi(INFLUX_ORG);

const writeApi = influxDB.getWriteApi(INFLUX_ORG, INFLUX_BUCKET);

writeApi.useDefaultTags({ app: 'arcade-app' }); // Default tags for all points

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const timeRange = searchParams.get('timeRange') || '-6h';

    if (!timeRange.match(/^-\d+[smhdw]$/)) {
      return new Response(
        JSON.stringify({ error: 'Invalid or missing time range.' }),
        { status: 400 }
      );
    }

    const fluxQuery = `
      from(bucket: "${INFLUX_BUCKET}")
        |> range(start: ${timeRange})
        |> filter(fn: (r) => r._measurement != "" and (r._field == "coins" or r._field == "hardPlay"))
        |> pivot(rowKey:["_time"], columnKey:["_field"], valueColumn: "_value")
        |> keep(columns: ["_time", "coins", "hardPlay", "_measurement"])
    `;

    const rows = [];
    await new Promise((resolve, reject) => {
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const data = tableMeta.toObject(row);
          rows.push({
            time: data._time,
            coins: data.coins || 0,
            hardPlay: data.hardPlay || 0,
            measurement: data._measurement,
          });
        },
        error(err) {
          console.error('Query error:', err);
          reject(err);
        },
        complete() {
          resolve();
        },
      });
    });

    return new Response(JSON.stringify({ data: rows }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error querying InfluxDB:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to query InfluxDB', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { arcadeId, coins, hardPlay } = body;

    if (!arcadeId || coins === undefined || hardPlay === undefined) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: arcadeId, coins, hardPlay.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const measurementName = arcadeId.trim();
    if (measurementName.length === 0) {
      return new Response(
        JSON.stringify({ error: 'Invalid arcadeId. Must be a non-empty string.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const coinsInt = parseInt(coins, 10);
    const hardPlayInt = parseInt(hardPlay, 10);

    if (isNaN(coinsInt) || isNaN(hardPlayInt)) {
      return new Response(
        JSON.stringify({ error: '`coins` and `hardPlay` must be valid integers.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const point = new Point(measurementName)
      .intField('coins', coinsInt)
      .intField('hardPlay', hardPlayInt);

    writeApi.writePoint(point);

    await writeApi.flush();

    return new Response(
      JSON.stringify({
        message: `Data successfully written to measurement: ${measurementName}`,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error writing to InfluxDB:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to write data to InfluxDB', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}