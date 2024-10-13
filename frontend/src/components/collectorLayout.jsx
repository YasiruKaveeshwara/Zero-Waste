// components/CollectorLayout.js
import React from "react";
import CollectorHeader from "./collectorHeader";  // Import the CollectorHeader component

const CollectorLayout = ({ children }) => {
  return (
    <div>
      <CollectorHeader /> {/* Header is included on every page */}
      <main className="container mx-auto p-4">{children}</main> {/* Page content goes here */}
    </div>
  );
};

export default CollectorLayout;
