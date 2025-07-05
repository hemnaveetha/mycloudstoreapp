import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./Routes";
// import { Amplify } from "aws-amplify";
// import awsConfig from "./awsConfig";
// Amplify.configure(awsConfig);

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
