import React, { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { deleteApi } from '../services/httpServices';

function DeleteBlog() {

  let { id } = useParams();

  const navigate = useNavigate()

  const handleDelete = async () => {
    try {
      const data = await deleteApi(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        navigate('/blogs')
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleDelete();
  }, []);

  return ("")
}

export default DeleteBlog;