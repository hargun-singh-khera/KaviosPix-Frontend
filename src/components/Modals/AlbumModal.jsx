import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { authServerAxios } from '../../lib/axios.lib';

const AlbumModal = ({ album, setAlbums, setSelectedAlbum }) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);

    const isUpdate = album ? true : false;
    console.log("Name", name, "Description", description);

    useEffect(() => {
        setName(album?.name || "");
        setDescription(album?.description || "");
    }, [album]);

    console.log("album", album);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name) {
            toast.error("Album name is required");
            return;
        }
        try {
            setLoading(true);
            if (isUpdate) {
                const response = await authServerAxios.put(
                    `/albums/${album?._id}`,
                    { name, description },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                console.log("response of update", response);
                const updatedAlbum = response?.data?.album;
                console.log("updatedAlbum", updatedAlbum);
                setAlbums((prev) => prev.map((album) => album._id === updatedAlbum?._id ? updatedAlbum : album));
                toast.success("Album updated successfully");
            }
            else {
                const response = await authServerAxios.post(
                    "/albums",
                    { name, description },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    }
                )
                console.log("response of submit", response);
                setAlbums(prev => [...prev, response?.data?.album]);
                toast.success("Album created successfully");
                setName("")
                setDescription("")
            }
        } catch (error) {
            console.error("Error while creating album", error);
            toast.error("Error while creating album");
        } finally {
            setLoading(false);
        }
    }

    // const handleClose = () => {
    //     setName("");
    //     setDescription("");
    //     setSelectedAlbum(null);
    // }

    return (
        <div className="modal fade" id="albumModal" tabIndex="-1" aria-labelledby="albumModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <form onSubmit={handleSubmit} className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="albumModalLabel">{isUpdate ? "Edit Album" : "Add Album"}</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name <span className="text-danger">*</span></label>
                            <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter album title" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea className="form-control" id="description" rows="3" onChange={(e) => setDescription(e.target.value)} value={description} placeholder="Write a short description about the album..."></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        {isUpdate ? (<button type="submit" disabled={loading} className="btn btn-primary">
                            {loading && <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
                            <span role="status">{loading ? "Updating..." : "Update"}</span>
                        </button>) : (
                            <button type="submit" disabled={loading} className="btn btn-primary">
                                {loading && <span class="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>}
                                <span role="status">{loading ? "Creating..." : "Create"}</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AlbumModal