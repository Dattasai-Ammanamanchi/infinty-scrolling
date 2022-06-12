import { useEffect, useState } from 'react'
import axios from 'axios'

export default function useBookSearch(query, pageNumber) {
  const [loading, setloading] = useState(true)
  const [error, seterror] = useState(false)
  const [books, setBooks] = useState([])
  const [hasMore, setHasMore] = useState(false)
  useEffect(() =>{
    setBooks([])
  },[query])
  useEffect(() =>{
    setloading(true)
    seterror(false)
    let cancel
    axios({
        method:'GET',
        url:'http://openlibrary.org/search.json',
        params:{q: query, page, pageNumber},
        cancelToken: new axios.CancelToken(c => cancel = c)
  }).then(res =>  {
   setBooks(prevBooks =>{
    return [...new Set([...prevBooks, ...res.data.docs.map(b => b.title)])]
   })
   setHasMore(res.data.docs.length > 0)
   setloading(false)
  }).catch(e =>{
    if(axios.isCancel(e)) return
  })
  return () => cancel()
 },[query, pageNumber])
    
 
 return { loading, error, books, hasMore } 
}
