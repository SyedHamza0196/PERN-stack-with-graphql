import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import {getBooksQuery} from "../queries/queries"
import BookDetail from './BookDetail'

function BookList() {
    const { loading, data } = useQuery(getBooksQuery);
    const [selected, setselected] = useState(1);

    if (loading){
        return <p>Loading...</p>;
    }else if(data) {
        return (
            <div>
                <ul id="book-list">
                    {data.books.map(book=>(
                        <li key={book.id} value={book.id} onClick={(e)=>{setselected(e.target.value)}}>{book.name}</li>
                    ))}
                </ul>
                <BookDetail bookId={selected}/>
            </div>
        )
    }
  }

export default BookList;
// export default BookList;