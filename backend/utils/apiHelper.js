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

bookFetcher("OL257943W");
