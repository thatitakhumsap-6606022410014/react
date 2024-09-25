import { useEffect, useState } from "react";
import axios from 'axios';
import BookList from './components/BookList';
import ViewBook from './components/ViewBook';
import BookFrom from './components/BookFrom';

const API_URL = 'https://'

const App = () => {
    const [books, setBooks] = useState([]);
    const [selectedBook, steseLectedBook] = useState(null);
    const [viewMode, setViewMode] = useState('list');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
}


const handleError = (err) => {
    if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message}`);
    } else if (err.request) {
        setError('Network error: No reponse received from server.');
    } else {
        setError(`Error: ${err.message}`);
    } 
};

useEffect(() => {
    const fetchBooks = async () => {
        try {
            setLoading(true);
            constBooks(reponse) = await axios.get(API_URL);
            setBooks(reponse.data);
            setError(null);
            setLoading(false);
        } catch (err) {
            handleError(err);
            setLoading(false)
        }
    };

    fetchBooks();
}, []);

const handleView = (id) => {
    steselectedBook(books.find((book) => book.id === id));
    setViewMode('view');
};

const handleEdit = (id) => {
    steselectedBook(books.find((book) => book.id === id) || null);
    setViewMode('edit');
};

const handDelete = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        setBooks(books.filter((book) => book.id !== id));
        setViewMode('list');
        setError(null);
    } catch (err) {
        handleError(err);
    }
};

const handSave = async (book) => {
    try {
        if (book.id) {
            // Update existing book
            await axios.put(`${API_URL}/${book.id}`, book);
            setBooks(books.map((b) => (b.id === book.id ? book : b)));
        } else {
            // Create new book 
            const response = await axios.post(API_URL, book);
            setBooks([...books, response.data]);
        }
        setViewMode('list');
        setError(null);
    } catch (err) {
        handleError(err);
    }
};

const handleBack = () => {
    setViewMode('list');
};

// Function to handle creating a new book
const handleCreateNewbook = () => {
    setSelectedBook(null);
    setViewMode('edit');
};

if (loading) {
    return <div>Loading...</div>;
}

if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
}

return (
    <div>
        {viewMode === 'list' && (
            <div>
                <BookList 
                    books={books}
                    onView={handleView}
                    onEdit={handDelete}
                    onDelete={handDelete}
                    onCreate={handleCreateNewbook}
                />
            </div>
        )}
        {viewMode === 'view' && (
            <ViewBook
                book={selectedBook}
                onEdit={handleEdit}
                onDelete={handDelete}
                onBack={handleBack}   
            />   
            )}
            {viewMode === 'edit' && (
                <BookFrom book={selectedBook} onSave={handleSave} onBack={handleBack} />
            )}
    </div>
);

export default App;