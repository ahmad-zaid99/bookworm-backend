

const handler = async (books,count_tags) => {

    let sz = books.length ;

    for(let loop = 0 ; loop < sz ; loop++){
        let tagScore = 50*(1.0 + (books[loop].matched_tags/count_tags)) ;
        books[loop].tagScore = tagScore ;
    }

    return books ;

};

module.exports = handler;



