import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import toast, { Toaster } from 'react-hot-toast'
import { Link, useLocation, useParams } from 'react-router-dom'
import { authServerAxios } from '../lib/axios.lib'
import AddImageModal from '../components/Modals/AddImageModal'

const AlbumDetails = () => {
    const location = useLocation();
    const { albumId } = useParams();

    const userData = location.state?.userData;
    // console.log("albumId", albumId);
    const [albumDetail, setAlbumDetail] = useState(null);
    const [images, setImages] = useState([]);

    const [activeFilter, setActiveFilter] = useState("all");

    const fetchAlbumImages = async () => {
        try {
            const response = await authServerAxios.get(`/albums/${albumId}/images`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            console.log("response", response);
            setAlbumDetail(response?.data?.album);
            // setIsFavorite(response?.data?.images?.isFavorite);
            setImages(response?.data?.images);
            setActiveFilter("all");
        } catch (error) {
            console.error("Error while fetching album images", error);
            toast.error("Failed to fetch album images");
        }
    }

    useEffect(() => {
        fetchAlbumImages();
    }, []);

    // console.log("images", images);

    const handleToggleFavorite = async (imageId) => {
        try {
            const image = images.find((image) => image._id === imageId);
            const response = await authServerAxios.put(`/albums/${albumId}/images/${imageId}/favorite`,
                { isFavorite: !image.isFavorite },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            // console.log("response", response);
            setImages((prev) => prev.map((image) => image._id === imageId ? { ...image, isFavorite: !image.isFavorite } : image))
        } catch (error) {
            console.error("Error while toggling favorite", error);
            toast.error("Failed to toggle favorite");
        }
    }

    const handleDeleteImage = async (imageId) => {
        try {
            const response = await authServerAxios.delete(`/albums/${albumId}/images/${imageId}`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("response of delete", response);
            setImages((prev) => prev.filter((image) => image._id !== imageId));
        } catch (error) {
            console.error("Error while deleting image", error);
            toast.error("Failed to delete image");
        }
    }

    // console.log("showFavorites", showFavorites);

    // const filteredImages = showFavorites ? images.filter((image) => image.isFavorite) : images;
    // console.log("filteredImages", filteredImages);

    const fetchFavoriteImages = async () => {
        try {
            const response = await authServerAxios.get(`/albums/${albumId}/images/favorites`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log("response", response);
            setImages(response?.data?.images);
            setActiveFilter("favorite");
        } catch (error) {
            console.error("Error while fetching favorites", error);
            toast.error("Failed to fetch favorites");
        }
    }

    return (
        <div>
            <Header userData={userData} />
            <div className="container my-5">
                <h2>{albumDetail?.name || "New Album"} ({images?.length} items)</h2>
                <div className="d-flex justify-content-between align-items-start">
                    <p>{albumDetail?.description || "No description available"}</p>
                    <button type="button" className="btn btn-primary btn-sm ms-5 text-nowrap" data-bs-toggle="modal" data-bs-target="#imageModal">+ Add Photo</button>
                </div>
                <div className="d-flex gap-2">
                    <button onClick={fetchAlbumImages} className={`btn btn-outline-secondary rounded-pill btn-sm mb-3`} >
                        All Images
                    </button>
                    <button onClick={fetchFavoriteImages} className={`btn btn-outline-danger rounded-pill btn-sm mb-3`} >
                        ❤️ Favorites
                    </button>
                </div>
                <div className="row">
                    {images?.length === 0 && <p>No images found.</p>}
                    {images?.length > 0 && images?.map((image) => (
                        <div key={image._id} className="col-md-3 mb-3">
                            <Link to={`/album/${albumId}/image/${image._id}`} state={{ image, albumId, userData }} className="card position-relative text-decoration-none">
                                <img src={image.imageUrl} className="card-img-top " alt={image.name} style={{ height: "180px", objectFit: "cover" }} />
                                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleToggleFavorite(image._id) }} className="btn position-absolute top-0 end-0 me-4 p-1 text-white border-0" style={{ height: "20px" }}>
                                    {!image.isFavorite ? <i className="bi bi-heart"></i> : <i className="bi bi-heart-fill" style={{ color: "#e81717" }}></i>}
                                </button>
                                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDeleteImage(image._id) }} className="btn position-absolute me-1 top-0 end-0 p-1 border-0" style={{ height: "20px" }}>
                                    <i className="bi bi-trash text-danger fs-6"></i>
                                </button>
                                <div className="card-body">
                                    <p className="card-text fw-semibold mb-1">{image.name}</p>
                                    {image.tags.map((tag, index) => (
                                        <span key={index} className="badge bg-primary me-1">{tag}</span>
                                    ))}
                                    <small className="text-muted d-block mt-2">
                                        Size: {(image.size / 1024).toFixed(1)} KB
                                    </small>
                                    <small className="text-muted d-block mb-1">
                                        Comments: {image.comments?.length || 0}
                                    </small>
                                    <small className="text-muted d-block">
                                        Uploaded: {new Date(image.createdAt).toLocaleDateString()}
                                    </small>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <AddImageModal album={albumDetail} setImages={setImages} />
            <Toaster />
        </div>
    )
}

export default AlbumDetails