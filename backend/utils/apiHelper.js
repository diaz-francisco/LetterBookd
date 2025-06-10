const bookFetcher = async openLibraryId => {
  try {
    const bookRes = await fetch(`https://openlibrary.org/works/${openLibraryId}.json`);

    if (!bookRes.ok) {
      throw new Error(`Book not found : ${bookRes.status}`);
    }

    const bookData = await bookRes.json();

    if (!bookData.authors || bookData.authors.length === 0) {
      throw new Error(`No authors for this book`);
    }

    const authorKey = bookData.authors[0].author.key;
    const authorRes = await fetch(`https://openlibrary.org${authorKey}.json`);

    let authorName = "Unknown Author";

    if (authorRes.ok) {
      const authorData = await authorRes.json();
      authorName = authorData.personal_name || authorData.name;
    }

    return {
      id: openLibraryId,
      title: bookData.title,
      authorKey: authorKey,
      author: authorName,
      cover: bookData.covers?.[0] ? `https://covers.openlibrary.org/b/id/${bookData.covers[0]}-S.jpg` : null,
    };
  } catch (err) {
    console.error("Error fetching book data:", err.message);
    throw err;
  }
};

const searchBooks = async (query, page = 1, limit = 20) => {
  try {
    const searchRes = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`
    );

    if (!searchRes.ok) {
      throw new Error(`Search failed: ${searchRes.status}`);
    }

    const searchData = await searchRes.json();

    return {
      books: searchData.docs.map(book => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Unknown",
        cover: book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg` : null,
        firstPublished: book.first_publish_year,
        publisher: book.publisher ? book.publisher[0] : "Unknown",
      })),
      total: searchData.numFound,
      page: searchData.start / limit + 1,
      pages: Math.ceil(searchData.numFound / limit),
    };
  } catch (err) {
    console.error("Error searching books:", err.message);
    throw err;
  }
};

module.exports = {
  bookFetcher,
  searchBooks,
};
