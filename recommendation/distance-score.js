

const handler = async (books,userDistance) => {

    let sz = books.length ;

    for(let loop = 0 ; loop < sz ; loop++){
        let distanceScore = 50*(2.0 - (books[loop].distance/userDistance)) ;
        books[loop].distanceScore = distanceScore ;
    }

    return books ;

}

module.exports = handler;

