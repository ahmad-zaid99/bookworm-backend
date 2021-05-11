

const handler = async (books) => {

    let sz = books.length ;

    // calculate final score for each book
    for(let loop = 0 ; loop < sz ; loop++){
        let finalScore = 0.2*books[loop].eloScore + 0.4*books[loop].distanceScore + 0.4*books[loop].tagScore ;
        books[loop].finalScore = finalScore ;
    }

    // sort the books according to the final score
    books.sort(function(a, b) {
        return a.finalScore - b.finalScore;
    });

    return books ;

}

module.exports = handler;

