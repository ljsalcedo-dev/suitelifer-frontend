import React, { useState } from "react";
import JobCourse from "../../components/admin/JobCourse";
import PersonalityTest from "../../components/admin/PersonalityTest";
import Testimonials from "../../components/admin/Testimonials";
import SpotifyEpisode from "../../components/admin/SpotifyEpisodes";
import AdminHomePage from "../../components/admin/AdminHomePage";
import AdminAboutPage from "../../components/admin/AdminAboutPage";
import {
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import Careers from "../../components/admin/Careers";
import AdminNews from "./AdminNews";
import SpotifyEpisodes from "../../components/admin/SpotifyEpisodes";
import AdminContacts from "../../components/admin/AdminContacts";
import AdminFooter from "../../components/admin/AdminFooter";
import AdminSuiteBite from "./AdminSuiteBite";

const AdminContents = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [pendingTab, setPendingTab] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleChange = (event, newValue) => {
    if (unsavedChanges) {
      setPendingTab(newValue);
      setDialogOpen(true);
    } else {
      setActiveTab(newValue);
    }
  };

  const handleSave = () => {
    console.log("Changes saved!");
    setUnsavedChanges(false);
    setDialogOpen(false);
    setActiveTab(pendingTab);
    setPendingTab(null);
  };

  const handleDiscard = () => {
    setUnsavedChanges(false);
    setDialogOpen(false);
    setActiveTab(pendingTab);
    setPendingTab(null);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="min-w-full overflow-x-scroll border-b border-gray-300">
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            "& .MuiTabs-indicator": { backgroundColor: "#0097b2" },
            "& .MuiTab-root": {
              color: "black",
              fontWeight: 500,
              textTransform: "none",
              fontSize: 14,
              minWidth: "40px",
            },
            "& .MuiTab-root.Mui-selected": {
              color: "#0097b2",
              fontWeight: 900,
            },
            "@media (min-width: 1024px)": {
              "& .MuiTab-root": {
                fontSize: 14,
                minWidth: "70px",
              },
            },
          }}
          className="w-fit"
        >
          <Tab label="Home" value={0} />
          <Tab label="About" value={1} />
          <Tab label="Careers" value={2} />
          <Tab label="News Letter" value={3} />
          <Tab label="Pod Cast" value={4} />
          <Tab label="Contacts" value={5} />
          <Tab label="Footer" value={6} />
        </Tabs>
      </div>

      <div className="p-4">
        {activeTab === 0 && (
          <AdminHomePage setUnsavedChanges={setUnsavedChanges} />
        )}
        {activeTab === 1 && (
          <AdminAboutPage setUnsavedChanges={setUnsavedChanges} />
        )}
        {activeTab === 2 && (
          <Careers setUnsavedChanges={setUnsavedChanges} />
        )}
        {activeTab === 3 && <AdminSuiteBite setUnsavedChanges={setUnsavedChanges} />}
        {activeTab === 4 && (
          <SpotifyEpisodes setUnsavedChanges={setUnsavedChanges} />
        )}
        {activeTab === 5 && (
          <AdminContacts setUnsavedChanges={setUnsavedChanges} />
        )}
        {activeTab === 6 && (
          <AdminFooter setUnsavedChanges={setUnsavedChanges} />
        )}
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          You have unsaved changes. What do you want to do?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleDiscard} color="error">
            Discard
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AdminContents;
