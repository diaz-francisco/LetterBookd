const helperFunction = async openLibraryId => {
  try {
    const res = await fetch(`https://openlibrary.org/works/${openLibraryId}.json`);

    if (!res.ok) {
      throw new Error(res.status);
    }

    const bookData = await res.json();

    console.log(bookData);

    return bookData;
  } catch (err) {
    console.error("Error fetching book data:", err.message);
    throw err;
  }
};

helperFunction("OL257943W");
