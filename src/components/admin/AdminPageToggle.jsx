import { useState } from "react";
import AboutPageContent from "./AboutPageContent";
import Testimonials from "./Testimonials";
import PageToggle from "./PageToggle";


const AdminPageToggle = () => {
    const tabs = [
      { label: "About Page Content", component: AboutPageContent },
      {label: "Testimonials", component: Testimonials},
      
    ];
  
    return <PageToggle tabs={tabs} />;
  };

export default AdminPageToggle;
