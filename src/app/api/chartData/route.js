// // import { InfluxDB } from "@influxdata/influxdb-client";

// // const INFLUX_TOKEN = process.env.INFLUX_TOKEN;
// // const INFLUX_URL = process.env.INFLUX_URL;
// // const INFLUX_ORG = process.env.INFLUX_ORG;
// // const INFLUX_BUCKET = process.env.INFLUX_BUCKET;

// // const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });

// // const parseDurationToSeconds = (duration) => {
// //   const match = duration.match(/^(\d+)([smhd])$/);
// //   if (!match) return null;

// //   const value = parseInt(match[1], 10);
// //   const unit = match[2];
// //   switch (unit) {
// //     case "s":
// //       return value;
// //     case "m":
// //       return value * 60;
// //     case "h":
// //       return value * 3600;
// //     case "d":
// //       return value * 86400;
// //     default:
// //       return null;
// //   }
// // };

// // export async function GET(req) {
// //   const { searchParams } = new URL(req.url);
// //   const measurement = searchParams.get("measurement");
// //   const timeRange = searchParams.get("timeRange");

// //   if (!measurement) {
// //     return new Response(
// //       JSON.stringify({ error: "Measurement name is required." }),
// //       { status: 400 }
// //     );
// //   }

// //   const timeRangeSeconds = parseDurationToSeconds(timeRange);
// //   if (!timeRangeSeconds || timeRangeSeconds <= 0) {
// //     return new Response(
// //       JSON.stringify({ error: "Invalid time range provided." }),
// //       { status: 400 }
// //     );
// //   }

// //   const intervalSeconds = Math.floor(timeRangeSeconds / 6);
// //   if (intervalSeconds <= 0) {
// //     return new Response(
// //       JSON.stringify({ error: "Invalid interval calculation." }),
// //       { status: 400 }
// //     );
// //   }

// //   try {
// //     const queryApi = influxDB.getQueryApi(INFLUX_ORG);

// //     const fluxQuery = `
// //       from(bucket: "${INFLUX_BUCKET}")
// //         |> range(start: -${timeRange})
// //         |> filter(fn: (r) => r._measurement == "${measurement}")
// //         |> aggregateWindow(every: ${intervalSeconds}s, fn: mean, createEmpty: false)
// //         |> yield(name: "aggregated_data")
// //     `;

// //     const rows = [];
// //     await new Promise((resolve, reject) => {
// //       queryApi.queryRows(fluxQuery, {
// //         next(row, tableMeta) {
// //           rows.push(tableMeta.toObject(row));
// //         },
// //         error(error) {
// //           reject(error);
// //         },
// //         complete() {
// //           resolve();
// //         },
// //       });
// //     });

// //     const data = rows.map((row) => ({
// //       time: row._time, // X-axis value (timestamp)
// //       value: row._value, // Y-axis aggregated metric
// //     }));

// //     return new Response(JSON.stringify({ data }), { status: 200 });
// //   } catch (error) {
// //     console.error("Error querying InfluxDB:", error);
// //     return new Response(
// //       JSON.stringify({ error: "Failed to query InfluxDB", details: error.message }),
// //       { status: 500 }
// //     );
// //   }
// // }

// import { InfluxDB } from "@influxdata/influxdb-client";

// const INFLUX_TOKEN = process.env.INFLUX_TOKEN;
// const INFLUX_URL = process.env.INFLUX_URL;
// const INFLUX_ORG = process.env.INFLUX_ORG;
// const INFLUX_BUCKET = process.env.INFLUX_BUCKET;

// const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });

// const parseDurationToSeconds = (duration) => {
//   const match = duration.match(/^(\d+)([smhd])$/);
//   if (!match) return null;

//   const value = parseInt(match[1], 10);
//   const unit = match[2];
//   switch (unit) {
//     case "s":
//       return value;
//     case "m":
//       return value * 60;
//     case "h":
//       return value * 3600;
//     case "d":
//       return value * 86400;
//     default:
//       return null;
//   }
// };

// export async function GET(req) {
//   const { searchParams } = new URL(req.url);
//   const measurement = searchParams.get("measurement");
//   const timeRange = searchParams.get("timeRange"); // e.g., "5m"

//   if (!measurement) {
//     return new Response(
//       JSON.stringify({ error: "Measurement name is required." }),
//       { status: 400 }
//     );
//   }

//   const timeRangeSeconds = parseDurationToSeconds(timeRange);
//   if (!timeRangeSeconds || timeRangeSeconds <= 0) {
//     return new Response(
//       JSON.stringify({ error: "Invalid time range provided." }),
//       { status: 400 }
//     );
//   }

//   const intervalSeconds = Math.floor(timeRangeSeconds / 6); // Divide time range into 6 equal parts
//   if (intervalSeconds <= 0) {
//     return new Response(
//       JSON.stringify({ error: "Invalid interval calculation." }),
//       { status: 400 }
//     );
//   }

//   try {
//     const queryApi = influxDB.getQueryApi(INFLUX_ORG);

//     const fluxQuery = `
//       from(bucket: "${INFLUX_BUCKET}")
//         |> range(start: -${timeRange})
//         |> filter(fn: (r) => r._measurement == "${measurement}")
//         |> aggregateWindow(every: ${intervalSeconds}s, fn: mean, createEmpty: false)
//         |> yield(name: "aggregated_data")
//     `;

//     const rows = [];
//     await new Promise((resolve, reject) => {
//       queryApi.queryRows(fluxQuery, {
//         next(row, tableMeta) {
//           rows.push(tableMeta.toObject(row));
//         },
//         error(error) {
//           reject(error);
//         },
//         complete() {
//           resolve();
//         },
//       });
//     });

//     const aggregatedData = rows.map((row) => ({
//       x: row._time, // Timestamp
//       y: row._value, // Aggregated value
//     }));

//     return new Response(JSON.stringify({ data: aggregatedData }), { status: 200 });
//   } catch (error) {
//     console.error("Error querying InfluxDB:", error);
//     return new Response(
//       JSON.stringify({ error: "Failed to query InfluxDB", details: error.message }),
//       { status: 500 }
//     );
//   }
// }
import { InfluxDB } from "@influxdata/influxdb-client";

const INFLUX_TOKEN = process.env.INFLUX_TOKEN;
const INFLUX_URL = process.env.INFLUX_URL;
const INFLUX_ORG = process.env.INFLUX_ORG;
const INFLUX_BUCKET = process.env.INFLUX_BUCKET;

const influxDB = new InfluxDB({ url: INFLUX_URL, token: INFLUX_TOKEN });

// Parse duration string (e.g., "5m", "2h", "1d", "1w", "1mo") into seconds
const parseDurationToSeconds = (duration) => {
  const match = duration.match(/^(\d+)([smhdwmo])$/);
  if (!match) return null;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s":
      return value;
    case "m":
      return value * 60;
    case "h":
      return value * 3600;
    case "d":
      return value * 86400;
    case "w":
      return value * 604800;
    case "o":
      return value * 2592000; // Approx. 1 month
    default:
      return null;
  }
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const measurement = searchParams.get("measurement");
  const timeRange = searchParams.get("timeRange");

  if (!measurement || !timeRange) {
    return new Response(
      JSON.stringify({
        error: "Measurement and timeRange are required parameters.",
      }),
      { status: 400 }
    );
  }

  const timeRangeSeconds = parseDurationToSeconds(timeRange);
  if (!timeRangeSeconds || timeRangeSeconds <= 0) {
    return new Response(
      JSON.stringify({ error: "Invalid time range." }),
      { status: 400 }
    );
  }

  // const intervalSeconds = Math.ceil(timeRangeSeconds / 6);

  try {
    const queryApi = influxDB.getQueryApi(INFLUX_ORG);

    const fluxQuery = `
    import "math"
    from(bucket: "${INFLUX_BUCKET}")
      |> range(start: -${timeRange})
      |> filter(fn: (r) => r._measurement == "${measurement}")
      |> aggregateWindow(
          every: ${Math.ceil(timeRangeSeconds / 6)}s, // Pass duration directly as string
          fn: mean, 
          createEmpty: false
        )
      |> fill(column: "_value", value: 0.0) // Fill missing data with 0.0
      |> sort(columns: ["_time"]) // Sort by time
      |> limit(n: 6) // Ensure only 6 points
      |> yield(name: "aggregated_data")
  `;
  

  
    const rows = [];
    await new Promise((resolve, reject) => {
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          rows.push(tableMeta.toObject(row));
        },
        error(error) {
          console.error("Query Error:", error);
          reject(error);
        },
        complete() {
          resolve();
        },
      });
    });

    const data = rows.map((row) => ({
      time: row._time,
      value: row._value,
    }));

    return new Response(JSON.stringify({ data }), { status: 200 });
  } catch (error) {
    console.error("Error querying InfluxDB:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to query InfluxDB",
        details: error.message,
      }),
      { status: 500 }
    );
  }
}
