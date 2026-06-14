import React, { useEffect, useState } from "react";
import { authServerAxios } from "../lib/axios.lib";
import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";

const ImageDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const image = location.state?.image;
    const albumId = location.state?.albumId;
    const userData = location.state?.userData;
    const imageId = image._id;

    console.log("image", image);

    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    const [isFavorite, setIsFavorite] = useState(false);

    console.log("isFavorite", isFavorite);

    const handleToggleFavorite = async (imageId) => {
        try {
            const response = await authServerAxios.put(`/albums/${albumId}/images/${imageId}/favorite`,
                { isFavorite: !image.isFavorite },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            )
            console.log("response", response);
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error while toggling favorite", error);
            console.log("error?.response?.data?.message", error?.response?.data?.message);
            toast.error(error?.response?.data?.message || "Failed to toggle favorite");
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
            toast.success("Image deleted successfully");
            navigate(`/album/${albumId}`);
        } catch (error) {
            console.error("Error while deleting image", error);
            toast.error("Failed to delete image");
        }
    }

    useEffect(() => {
        if (image) setIsFavorite(image.isFavorite);
        if (comments) setComments(image?.comments);
    }, [image])

    const handlePostComment = async () => {
        try {
            if (!commentText) {
                toast.error("Please add a comment");
                return;
            }
            const response = await authServerAxios.post(`/albums/${albumId}/images/${imageId}/comments`,
                { comment: commentText },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );
            console.log("response of comment", response.data);
            const newComment = response?.data?.comment;
            setComments((prev) => {
                const updated = [...prev, newComment];
                console.log("updated comments", updated);
                return updated;
            });
            // setComments((prev) => [...prev, response?.data?.comment]);
            setCommentText("");
        } catch (error) {
            console.error("Error while posting comment", error);
            toast.error("Failed to post comment");
        }
    }

    const getInitials = (name) => {
        const names = name.split(" ");
        let initials = "";
        for (let i = 0; i < names.length; i++) {
            initials += names[i].charAt(0);
        }
        return initials;
    }

    // console.log("commentText", commentText);
    // console.log("comments", comments);

    return (
        <div>
            <Header userData={userData} />

            <div className="container-fluid py-4 px-lg-5">
                <div className="row g-4">

                    {/* Left Side Image */}
                    <div className="col-lg-6">
                        <div
                            className="rounded-4 overflow-hidden d-flex justify-content-center align-items-center"
                            style={{ height: "85vh" }}
                        >
                            <img
                                src={image?.imageUrl}
                                alt="Uploaded"
                                className="img-fluid"
                                style={{
                                    maxHeight: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </div>
                    </div>

                    {/* Right Side Panel */}
                    <div className="col-lg-6">
                        <div
                            className="h-100 px-2 d-flex flex-column"
                            style={{ maxHeight: "85vh" }}
                        >
                            {/* Actions */}
                            <div className="d-flex justify-content-end gap-2 mb-4">
                                <button onClick={() => handleToggleFavorite(imageId)} className="btn btn-light rounded-circle shadow-sm">
                                    {isFavorite ? <i className="bi bi-heart-fill text-danger"></i> : <i className="bi bi-heart text-danger"></i>}
                                </button>

                                <button onClick={() => handleDeleteImage(imageId)} className="btn btn-light rounded-circle shadow-sm">
                                    <i className="bi bi-trash text-danger"></i>
                                </button>
                            </div>

                            {/* Image Info */}
                            <div className="mb-4">
                                <h3 className="fw-semibold mb-1">
                                    {image?.name}
                                </h3>

                                <p className="text-muted small mb-0">
                                    Uploaded on{" "}
                                    {new Date(image.createdAt).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric",
                                    })}
                                </p>

                                {image?.person && <div>
                                    <i className="bi bi-person-circle me-2"></i>
                                    Tagged: <span className="text-dark fw-medium">
                                        {image?.person}
                                    </span>
                                </div>}

                                <div className="mb-3">
                                    <i className="bi bi-image me-2"></i>
                                    {image.size} KB
                                </div>

                                <div className="d-flex flex-wrap gap-2">
                                    {image?.tags?.length > 0 && image?.tags?.map((tag) => (
                                        <span className="badge text-bg-light border">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <hr />

                            {/* Comments */}
                            <div className="flex-grow-1 overflow-auto pe-2">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="mb-0 fw-semibold">
                                        Comments
                                    </h5>

                                    <span className="text-muted small">
                                        {comments?.length} Comment{comments?.length !== 1 ? "s" : ""}
                                    </span>
                                </div>

                                {comments?.length === 0 ? (
                                    <div className="text-center py-5">
                                        <i className="bi bi-chat-left-text fs-1 text-muted"></i>
                                        <p className="text-muted mt-2 mb-0">
                                            No comments yet
                                        </p>
                                        <small className="text-muted">
                                            Start the conversation ✨
                                        </small>
                                    </div>
                                ) : (
                                    comments?.map((comment) => (
                                        <div
                                            key={comment?._id}
                                            className="d-flex gap-3 mb-4"
                                        >
                                            {/* Avatar */}
                                            <div>
                                                {comment?.user?.avatar ? (
                                                    <img
                                                        src={comment?.user?.avatar}
                                                        alt={comment?.user?.name}
                                                        className="rounded-circle shadow-sm"
                                                        width="38"
                                                        height="38"
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-semibold shadow-sm"
                                                        style={{
                                                            width: 42,
                                                            height: 42,
                                                            minWidth: 42,
                                                        }}
                                                    >
                                                        {getInitials(comment?.user?.name)}
                                                    </div>
                                                )}
                                            </div>

                                            {/* Comment Content */}
                                            <div className="flex-grow-1">
                                                <div
                                                    className="rounded-4 px-3 py-2 shadow-sm border bg-white"
                                                >
                                                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                                                        <span className="fw-semibold text-dark">
                                                            {comment?.user?.name}
                                                        </span>

                                                        <small className="text-muted">
                                                            {new Date(comment?.createdAt).toLocaleString(
                                                                "en-US",
                                                                {
                                                                    month: "short",
                                                                    day: "numeric",
                                                                    hour: "numeric",
                                                                    minute: "2-digit",
                                                                    hour12: true,
                                                                }
                                                            )}
                                                        </small>
                                                    </div>

                                                    <p
                                                        className="mb-0 mt-1 text-secondary"
                                                        style={{
                                                            whiteSpace: "pre-wrap",
                                                            wordBreak: "break-word",
                                                        }}
                                                    >
                                                        {comment?.comment}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* Comment Input */}
                            <div className="pt-3 border-top">
                                <div className="">
                                    <textarea
                                        type="text"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        className="form-control border-0 bg-light mb-2"
                                        placeholder="Add a comment..."
                                    />

                                    <div className="d-flex justify-content-end">
                                        <button onClick={handlePostComment} className="btn btn-primary px-4">
                                            Post comment
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default ImageDetails;