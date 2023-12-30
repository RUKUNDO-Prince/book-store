import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const ShowBooks = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
    // .get(`https://book-store-yu6m.onrender.com/books/${id}`)
    .get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setBook(response.data);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
    })
  }, []);

  return (
    <div>
      ShowBooks
    </div>
  )
}

export default ShowBooks