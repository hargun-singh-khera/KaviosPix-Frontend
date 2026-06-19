import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { authServerAxios } from '../lib/axios.lib';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import AlbumModal from '../components/Modals/AlbumModal';
import AlbumShareModal from '../components/Modals/AlbumShareModal';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                console.log("running useEffect")
                const response = await authServerAxios.get("/debug-cookies");
                console.log(response.data);
                const response = await authServerAxios.get('/user/profile/google');
                console.log("response of user data", response);
                setUserData(() => response.data.user);
                const token = response.data.token;
                console.log("token", token);
                localStorage.setItem("token", token);
                fetchAlbums(token);
            } catch (error) {
                console.error("Error", error);
            }
        })();
    }, []);

    // fetch(
    //     "https://kavios-pix-backend-pied.vercel.app/user/profile/google",
    //     {
    //         credentials: "include"
    //     }
    // ).then(r => r.json()).then(console.log)

    // console.log("userData", userData);
    const [albums, setAlbums] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchAlbums = async (token) => {
        try {
            // setLoading(true);
            const response = await authServerAxios.get("/albums", {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            console.log("response of fetch albums", response);

            setAlbums(response.data.albums);
        } catch (error) {
            console.error("Error while fetching albums", error);
            setError("Error while fetching albums. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    console.log("albums", albums)

    const [selectedAlbum, setSelectedAlbum] = useState(null);

    const handleEditAlbum = (album) => {
        setSelectedAlbum(album);
    }

    // console.log("selectedAlbum", selectedAlbum);

    const handleDeleteAlbum = async (id) => {
        try {
            const response = await authServerAxios.delete(`/albums/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("response of delete", response);
            setAlbums((prev) => prev.filter((album) => album._id !== id));
            toast.success("Album deleted successfully");
        } catch (error) {
            console.error("Error while deleting album", error)
            toast.error(error?.response?.data?.message || "Failed to delete album");
        }
    }

    return (
        <div>
            <Header userData={userData} />
            <div className="container">
                <div className="my-4">
                    <h2>Welcome, {userData?.name || "User"}</h2>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center">
                        <h4>My Albums</h4>
                        <button type="button" onClick={() => setSelectedAlbum(null)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#albumModal">+ Create Album</button>
                    </div>
                </div>
                <div className="">
                    <div className="row">
                        {loading && <p>Loading...</p>}
                        {!loading && error && <p>{error}</p>}
                        {!loading && !error && albums?.length === 0 && <p>No albums found</p>}
                        {!error && albums?.length > 0 && albums.map(album => (
                            <div key={album._id} className="col-md-3 mb-4">
                                <Link to={`/album/${album._id}`} state={{ userData }} className="card text-decoration-none">
                                    <img src={album?.thumbnail || "https://upload.wikimedia.org/wikipedia/commons/d/d1/Image_not_available.png?_=20210219185637"} className="card-img-top object-fit-cover w-100" alt="..." style={{ height: "10rem" }} />
                                    <div className="card-body">
                                        <p className="card-text">{album.name} ({album.imagesCount || 0} items)</p>
                                        <p>{album.description || "No description available"}</p>
                                        {!album.isShared && <div className="d-flex gap-2">
                                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEditAlbum(album) }} className="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#albumModal">Edit Album</button>
                                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedAlbum(album) }} className="btn btn-warning btn-sm" data-bs-toggle="modal" data-bs-target="#albumShareModal">Share</button>
                                            <button type="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteAlbum(album._id) }} className="btn btn-danger btn-sm">Delete</button>
                                        </div>}
                                        {album.isShared && <span className="badge bg-info text-dark"> Shared </span>}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                <AlbumModal album={selectedAlbum} setAlbums={setAlbums} setSelectedAlbum={setSelectedAlbum} />
                <AlbumShareModal album={selectedAlbum} />
            </div>
            <Toaster />
        </div>
    )
}

export default Dashboard
