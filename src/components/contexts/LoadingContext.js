// // LoadingContext.js
// import React, { createContext, useState, useContext } from 'react';

// const LoadingContext = createContext();

// export const LoadingProvider = ({ children }) => {
//   const [isLoading, setLoading] = useState(false);

//   return (
//     <LoadingContext.Provider value={{ isLoading, setLoading }}>
//       {children}
//     </LoadingContext.Provider>
//   );
// };

// export const useLoading = () => useContext(LoadingContext);
