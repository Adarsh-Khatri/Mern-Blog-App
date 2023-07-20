import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogCard({ title, description, image, username, time, id, isUser }) {

  const navigate = useNavigate();

  console.log(username);

  const handleEdit = () => navigate(`/blog-details/${id}`);

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formatDate = (date) => {
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December",];
    let day = date.getDate();
    let monthNum = date.getMonth();
    let year = date.getFullYear();
    return `${day} ${monthArr[monthNum]} ${year}`
  }

  const formatTime = (date) => {
    const time = date.toLocaleTimeString();
    return time;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="d-flex align-items-center">
                  <div className="ms-2">
                    <h3>{username}</h3>
                  </div>
                  {
                    isUser && (
                      <div className="d-flex gap-2 ms-auto">
                        <button className="btn btn-outline-info" onClick={handleEdit}>
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button className="btn btn-outline-danger" onClick={handleDelete}>
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    )
                  }
                </div>
              </div>
              <div className="row">
                <div className="d-flex justify-content-between align-items-end">
                  <div className="d-flex flex-column">
                    <span className="fw-bold">Posted: {formatDate(new Date(time.post))} </span>
                    <span c>{formatTime(new Date(time.post))} </span>
                  </div>
                  {
                    time.post != time.edit && (
                      <div className="d-flex flex-column" style={{ fontSize: "12px" }}>
                        <span className="fw-bold">Edited: {formatDate(new Date())} </span>
                        <span>{formatTime(new Date(time.edit))} </span>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>



            <div className="row">

              {/* -------------------------------------------------------------------------- MODAL HANDLER STARTS */}


              <div className="col-md-4" data-bs-toggle="modal" data-bs-target={`#exampleModal${id}`}>
                <img src={image} className="card-img-left m-3 shadow-lg" alt="blogs" />
              </div>


              {/* -------------------------------------------------------------------------- MODAL HANDLER END*/}

              <div className="col-md-8">
                <div className="card-body d-flex flex-column justify-content-center">
                  <h6 className="card-title">Title: {title}</h6>
                  <p className="card-text">Description: {description.length > 250 ? description.substring(0, 250) + '...' : description}</p>
                </div>
              </div>
            </div>


            {/* /-------------------------------------------------------------------------- MODAL BODY STARTS */}


            <div className="row">
              <div className="col-md">
                <div className="modal fade" id={`exampleModal${id}`} tabindex="-1" aria-labelledby={`exampleModalLabel${id}`} aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h3 className="modal-title fw-bold" id={`exampleModalLabel${id}`}>{title}</h3>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <div>
                          <p className="text-center">
                            <img src={image} className="m-3 shadow alert rounded rounded-3 modal-image" alt="blogs" />
                          </p>
                          <div className="row justify-content-center">
                            <div className="w-75">
                              <p className="m-3 card-text" style={{ textAlign: "justify" }}>{description}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* /-------------------------------------------------------------------------- MODAL BODY END */}


          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </>
  )
}
