// import React, { useContext } from "react";
// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   createHttpLink,
// } from "@apollo/client";
// import { setContext } from "@apollo/client/link/context";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import Signup from "./pages/Signup";
// import Login from "./pages/Login";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Roster from "./pages/Roster";
// import Message from "./pages/Message";
// import Skill from "./pages/Skill";
// import ForgotPassword from "./pages/ForgetPassword";
// import PasswordReset from "./pages/PasswordReset";
// import { ThemeProvider, ThemeContext } from "./components/ThemeContext";

// // construct our main Graphql api endpoint
// const httpLink = createHttpLink({
//   uri: "/graphql",
// });

// // construct request middleware that will attach the JWT token to every request as an 'authorization' header
// const authLink = setContext((_, { headers }) => {
//   // getting token from local storage if exists
//   const token = localStorage.getItem("id_token");

//   // return the header to the context so httplink can read them
//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `Bearer ${token}` : "",
//     },
//   };
// });

// const client = new ApolloClient({
//   link: authLink.concat(httpLink), //set up our client to execute the authlink middleware prior to making the request to our GraphQL API
//   cache: new InMemoryCache(),
// });

// function AppContent() {
//   const { isDarkMode } = useContext(ThemeContext);

//   return (
//     <>
//       <div
//         className={` flex min-h-screen  ${
//           isDarkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"
//         }`}
//       >
//         <Header />
//         <div className="flex-1 mt-10 "> {/* Add mt-4 class here */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/roster" element={<Roster />} />
//             <Route path="/message" element={<Message />} />
//             <Route path="/skill" element={<Skill />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/me" element={<Profile />} />
//             <Route path="/profiles/:profileId" element={<Profile />} />
//             <Route path="/forgot-password" element={<ForgotPassword />} />
//             <Route path="/reset-password/:token" element={<PasswordReset />} />
//           </Routes>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// function App() {
//   return (
//     <ApolloProvider client={client}>
//       <ThemeProvider>
//         <Router>
//           <AppContent />
//         </Router>
//       </ThemeProvider>
//     </ApolloProvider>
//   );
// }

// export default App;
import React, { useContext } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Roster from "./pages/Roster";
import Message from "./pages/Message";
import Skill from "./pages/Skill";
import ForgotPassword from "./pages/ForgetPassword";
import PasswordReset from "./pages/PasswordReset";
import { ThemeProvider, ThemeContext } from "./components/ThemeContext";
import ChatPopup from './components/ChatPopup';
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "./utils/queries"; 
import Auth from "./utils/auth";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct WebSocket link for subscriptions
const wsLink = new WebSocketLink({
  uri: `ws://${window.location.host}/graphql`,
  options: {
    reconnect: true,
  },
});

// Use split to send data to each link based on the type of operation
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

// Construct request middleware that will attach the JWT token to every request as an 'authorization' header
const authLink = setContext((_, { headers }) => {
  // Getting token from local storage if exists
  const token = localStorage.getItem("id_token");

  // Return the header to the context so httplink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(splitLink), // Set up our client to execute the authlink middleware prior to making the request to our GraphQL API
  cache: new InMemoryCache(),
});

function AppContent() {
  const { isDarkMode } = useContext(ThemeContext);
  const { data } = useQuery(QUERY_ME);
  const currentUser = data?.me;

  return (
    <>
      <div
        className={`flex min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-300 text-black"}`}
      >
        <Header />
        <div className="flex-1 mt-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/roster" element={<Roster />} />
            <Route path="/message" element={<Message />} />
            <Route path="/skill" element={<Skill />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/me" element={<Profile />} />
            <Route path="/profiles/:profileId" element={<Profile />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<PasswordReset />} />
          </Routes>
          {Auth.loggedIn() && currentUser && <ChatPopup currentUser={currentUser} isDarkMode={isDarkMode} />} 
        </div>
      </div>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;


