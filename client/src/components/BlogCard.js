import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function BlogCard({ title, description, image, username, time, id, isUser }) {

  const navigate = useNavigate();

  const handleEdit = () => navigate(`/blog-details/${id}`);

  const handleDelete = () => {
    navigate(`/delete-blog/${id}`)
    toast.success("Blog Deleted Successfully");
  };

  const formatDate = (date) => {
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = date.getDate();
    let monthNum = date.getMonth();
    let year = date.getFullYear();
    return `${day} ${monthArr[monthNum]} ${year}`
  }

  const formatTime = (date) => {
    const readableTime = date.toLocaleTimeString();
    return readableTime;
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
                      <div className="d-flex flex-column align-items-end" style={{ fontSize: "12px" }}>
                        <span className="fw-bold">Last Updated: {formatDate(new Date())} </span>
                        <span>{formatTime(new Date(time.edit))} </span>
                      </div>
                    )
                  }
                </div>
              </div>
            </div>


            <div className="card-body">
              <div className="row">
                <div className="d-md-flex gap-3 px-3">
                  {/* -------------------------------------------------------------------------- MODAL HANDLER STARTS */}


                  <div className="col-md-4" type="button" data-bs-toggle="modal" data-bs-target={`#blogModal${id}`}>
                    <div className="d-flex justify-content-center">
                      <img src={image} className="card-img-left shadow-lg" alt="blogs" />
                    </div>
                  </div>


                  {/* -------------------------------------------------------------------------- MODAL HANDLER END*/}

                  <div className="col-md-8">
                    <div className="d-flex flex-column justify-content-center mt-3 mt-md-0">
                      <h6 className="card-title fw-bold">Title: {title}</h6>
                      <p className="card-text" style={{ textAlign: "justify", paddingRight: "10px" }}>Description: {description.length > 250 ? description.substring(0, 250) + '...' : description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            {/* /-------------------------------------------------------------------------- MODAL BODY STARTS */}


            <div className="row">
              <div className="col-md">
                <div className="modal fade" id={`blogModal${id}`} tabindex="-1" aria-labelledby={`exampleModalLabel${id}`} aria-hidden="true">
                  <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
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
      </div >
    </>
  )
}
