import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cloud, User, LogOut, Upload, File, Download, Trash2 } from "lucide-react";
import { signOut } from "aws-amplify/auth";
import { uploadData, getUrl, remove } from "aws-amplify/storage";
import "./Dashboard.css"; // create this for your styling

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [downloading, setDownloading] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/"); // Redirect to login page
    } catch (err) {
      alert("Logout failed: " + (err.message || err));
    }
  };

  const handleFiles = async (selectedFiles) => {
    const uploadPromises = Array.from(selectedFiles).map(async (file, index) => {
      try {
        const result = await uploadData({ key: file.name, data: file });
        const url = await getUrl({ key: file.name });
        return {
          id: Date.now() + index,
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          dateUploaded: new Date().toISOString().split("T")[0],
          url: url.url,
          s3key: file.name,
        };
      } catch (err) {
        alert(`Failed to upload ${file.name}: ${err.message || err}`);
        return null;
      }
    });
    const uploadedFiles = (await Promise.all(uploadPromises)).filter(Boolean);
    setFiles((prev) => [...prev, ...uploadedFiles]);
  };

  const handleDownload = (id) => {
    const file = files.find(f => f.id === id);
    if (file && file.url) {
      window.open(file.url, '_blank');
    }
    setDownloading(id);
    setTimeout(() => setDownloading(null), 1000);
  };

  const handleDelete = async (id) => {
    const file = files.find(f => f.id === id);
    if (file && file.s3key) {
      try {
        await remove({ key: file.s3key });
      } catch (err) {
        alert(`Failed to delete ${file.name}: ${err.message || err}`);
      }
    }
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <div className="dashboard-page">
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="brand">
            <div className="brand-icon"><Cloud size={24} color="white" /></div>
            <h1>CloudStore</h1>
          </div>
          <div className="navbar-right">
            <div className="welcome"><User size={16} /> Welcome, John!</div>
            <button className="logout-btn" onClick={handleLogout}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* Upload Section */}
        <section className="upload-section">
          <h2>Upload Files</h2>
          <p></p>
          <div
            className={`drop-area ${dragActive ? "active" : ""}`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <Upload size={32} />
            <p>Drop files here</p>
            <p>or click to browse from your device</p>
            <input
              id="file-upload"
              type="file"
              multiple
              onChange={(e) => handleFiles(e.target.files)}
              style={{ display: "none" }}
            />
            <label htmlFor="file-upload" className="choose-btn">Choose Files</label>
          </div>

          <div className="storage-note">
            <Cloud size={48} />
            <h3>Secure Cloud Storage</h3>
            <p>Your files are encrypted and stored securely in the cloud</p>
          </div>
        </section>

        {/* File List Section */}
        <section className="file-list">
          <h2>Your Files</h2>
          {files.length === 0 ? (
            <div className="no-files">
              <File size={32} />
              <p>No files uploaded yet</p>
            </div>
          ) : (
            files.map((file) => (
              <div key={file.id} className="file-card">
                <div className="file-info">
                  <div className="file-icon"><File size={20} /></div>
                  <div>
                    <strong>{file.name}</strong>
                    <p>{file.size} • Uploaded {file.dateUploaded}</p>
                  </div>
                </div>
                <div className="file-actions">
                  <button
                    className="download-btn"
                    onClick={() => handleDownload(file.id)}
                    disabled={downloading === file.id}
                  >
                    {downloading === file.id ? "Preparing..." : (
                      <>
                        <Download size={16} /> Download
                      </>
                    )}
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(file.id)}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
