import { Schema } from "../../data/resource";

export const handler: Schema["getGoogleBook"]["functionHandler"] = async (event) => {

    const {title} = event.arguments
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle&langRestrict=fr&printType=books`)
    const response = await result.json()
    const book = response.items.filter((item: any) => !!item.volumeInfo.description)[0]
    const bookData = book.volumeInfo || {};
    const imageLinks = bookData.imageLinks || {};
    const thumbnail = imageLinks.thumbnail || "";

    const newBook = {
        id: book.id,
        title: bookData.title,
        authors: bookData.authors,
        description: bookData.description,
        publishedDate: bookData.publishedDate,
        pageCount: bookData.pageCount,
        categories: bookData.categories,
        averageRating: bookData.averageRating,
        coverImage: thumbnail,
      }
    return JSON.stringify(newBook)
}

 
    
