"use client";

import { useState, useRef } from "react";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { ModuleRegistry } from "@ag-grid-community/core";
import { AgGridReact } from "@ag-grid-community/react";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import ControlPointIcon from "@mui/icons-material/ControlPoint";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

function Testimonials() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageFilename, setImageFilename] = useState("");
  const [image, setImage] = useState(null);
  const [rowTestimonialData, setRowTestimonialData] = useState([
    {
      id: "1",
      employee_image: "https://img.bomboradyo.com/butuan/2024/05/Kathryn.jpg",
      employee_name: "John Doe",
      testimony: "This is a sample testimonial",
      position: "Software Engineer",
      is_shown: 0,
      created_at: "2022-10-10",
      created_by: "Melbraei Santiago",
    },
    {
      id: "2",
      employee_image:
        "https://static.tvtropes.org/pmwiki/pub/images/daniel1.png",
      employee_name: "Jane Smith",
      testimony: "This is another sample testimonial",
      position: "Data Analyst",
      is_shown: 1,
      created_at: "2022-10-10",
      created_by: "Melbraei Santiago",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState({
    id: "",
    employee_image: "",
    employee_name: "",
    testimony: "",
    position: "",
    is_shown: 0,
    created_at: "",
    created_by: "Melbraei Santiago",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploading(true);
      setImageFilename(file.name);
      setUploadProgress(0);

      let loadProgress = 0;
      const interval = setInterval(() => {
        loadProgress += 20;
        setUploadProgress(loadProgress);
        if (loadProgress >= 100) {
          clearInterval(interval);
          setImage(file);
          setUploading(false);
          const reader = new FileReader();
          reader.onloadend = () => {
            setCurrentTestimonial({
              ...currentTestimonial,
              employee_image: reader.result,
            });
          };
          reader.readAsDataURL(file);
        }
      }, 200);
    }
  };

  const handlePositionChange = (e) => {
    setCurrentTestimonial({
      ...currentTestimonial,
      position: e.target.value,
    });
  };

  const gridRef = useRef();

  const handleSave = () => {
    if (currentTestimonial.id) {
      setRowTestimonialData((prevData) =>
        prevData.map((item) =>
          item.id === currentTestimonial.id ? currentTestimonial : item
        )
      );
    } else {
      const newEntry = {
        ...currentTestimonial,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        employee_image:
          currentTestimonial.employee_image ||
          "https://via.placeholder.com/150",
      };

      setRowTestimonialData((prevData) => [...prevData, newEntry]);
    }
    setCurrentTestimonial("");
    setOpenDialog(false);
  };

  const handleEdit = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    setRowTestimonialData((prevData) =>
      prevData.filter((item) => item.id !== id)
    );
  };

  return (
    <>
      <div className="flex justify-end">
        <button
          variant="contained"
          onClick={() => setOpenDialog(true)}
          className="btn-primary mb-2"
        >
          <div className="flex items-center justify-center w-full gap-1">
            <ControlPointIcon fontSize="small" />
            <span className="text-sm flex items-center justify-center">
              Add Testimonial
            </span>
          </div>
        </button>
      </div>

      <div className="border-primary rounded-md w-full overflow-hidden">
        <div className="w-full overflow-x-auto">
          <div
            className="ag-theme-quartz min-w-[600px] lg:w-full "
            style={{ height: "600px", width: "100%" }}
          >
            <AgGridReact
              rowData={rowTestimonialData}
              columnDefs={[
                {
                  headerName: "Image",
                  field: "employee_image",
                  flex: 2,
                  filter: "agTextColumnFilter",
                  headerClass: "text-primary font-bold bg-gray-100",
                  cellRenderer: (params) =>
                    params.value ? (
                      <img
                        src={params.value}
                        alt="Employee"
                        className="w-[80px] h-[80px] sm:w-[80px] sm:h-[80px] rounded-md object-cover mx-auto "
                      />
                    ) : (
                      <span>No Image</span>
                    ),
                },

                {
                  headerName: "Employee Name",
                  field: "employee_name",
                  flex: 1,
                  headerClass: "text-primary font-bold bg-gray-100",
                },
                {
                  headerName: "Testimony",
                  field: "testimony",
                  flex: 2,
                  headerClass: "text-primary font-bold bg-gray-100",
                },
                {
                  headerName: "Position",
                  field: "position",
                  flex: 2,
                  headerClass: "text-primary font-bold bg-gray-100",
                },
                {
                  headerName: "Visibility",
                  field: "is_shown",
                  flex: 1,
                  headerClass: "text-primary font-bold bg-gray-100",
                  valueFormatter: (params) =>
                    params.value === 1 ? "Shown" : "Hidden",
                },
                {
                  headerName: "Date Created",
                  field: "created_at",
                  flex: 1,
                  headerClass: "text-primary font-bold bg-gray-100",
                  valueGetter: (params) =>
                    params.data?.created_at
                      ? new Date(params.data.created_at).toLocaleString()
                      : "N/A",
                },
                {
                  headerName: "Created By",
                  field: "created_by",
                  flex: 1,
                  headerClass: "text-primary font-bold bg-gray-100",
                },
                {
                  headerName: "Action",
                  field: "action",
                  headerClass: "text-primary font-bold bg-gray-100",
                  flex: 1,
                  cellRenderer: (params) => (
                    <div className="flex gap-2">
                      <IconButton onClick={() => handleEdit(params.data)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(params.data.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ),
                },
              ]}
              defaultColDef={{
                filter: "agTextColumnFilter",
                floatingFilter: true,
                sortable: true,
                cellStyle: {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "left",
                },
              }}
              domLayout="autoHeight"
              rowHeight={
                window.innerWidth < 640 ? 60 : window.innerWidth < 768 ? 70 : 80
              }
              pagination
              paginationPageSize={5}
              paginationPageSizeSelector={[5, 10, 20, 50]}
              ref={gridRef}
            />
          </div>
        </div>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle className="w-full text-center justify-center">
            {currentTestimonial.id ? "Edit Testimonial" : "Add Testimonial"}
          </DialogTitle>
          <DialogContent>
            <div className="w-full mb-3">
              <button
                onClick={() => document.getElementById("fileInput").click()}
                className="w-full p-3 bg-primary/20 text-white rounded-md mt-2 hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <span className="text-black font-avenir-black">
                  Upload Image
                </span>
              </button>
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
              {imageFilename && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>File Uploaded: {imageFilename}</p>
                </div>
              )}
              {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                  <div
                    className="bg-primary h-2.5 rounded-full"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              )}
            </div>

            <div className="w-full mb-3">
              <label className="block text-gray-700 font-avenir-black">
                Employee Name<span className="text-primary">*</span>
              </label>

              <input
                name="name"
                required
                value={currentTestimonial.employee_name}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    employee_name: e.target.value,
                  })
                }
                className="w-full  p-3 resize-none border-none rounded-md bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary mt-2"
              />
            </div>

            <div className="w-full mb-3">
              <label className="block text-gray-700 font-avenir-black">
                Testimony<span className="text-primary">*</span>
              </label>

              <textarea
                name="testimony"
                required
                row={3}
                value={currentTestimonial.testimony}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    testimony: e.target.value,
                  })
                }
                style={{ height: "200px" }}
                className="w-full p-3 resize-y border-none rounded-md bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary mt-2"
              />
            </div>

            <div className="w-full mb-3">
              <label className="block text-gray-700 font-avenir-black">
                Position<span className="text-primary">*</span>
              </label>

              <input
                name="position"
                required
                value={currentTestimonial.position}
                onChange={handlePositionChange}
                className="w-full p-3 border-none rounded-md bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary mt-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-avenir-black">
                Visibility<span className="text-primary">*</span>
              </label>
              <select
                name="visibility"
                required
                value={currentTestimonial.is_shown}
                onChange={(e) =>
                  setCurrentTestimonial({
                    ...currentTestimonial,
                    is_shown: Number(e.target.value),
                  })
                }
                className="w-full p-3 border-none rounded-md bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary mt-2"
              >
                <option value="" disabled>
                  -- Select an option --
                </option>
                <option value={1}>Shown</option>
                <option value={0}>Hidden</option>
              </select>
            </div>
          </DialogContent>
          <DialogActions>
            <button className="btn-light" onClick={() => setOpenDialog(false)}>
              Cancel
            </button>
            <button className="btn-primary" onClick={handleSave}>
              Save
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

export default Testimonials;
