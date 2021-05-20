

const handler = async (books,userDistance) => {
    try{
    let sz = books.length ;

    for(let loop = 0 ; loop < sz ; loop++){
        let distanceScore = 50*(2.0 - (books[loop].distance/userDistance)) ;
        books[loop].distanceScore = distanceScore ;
    }
    
    }
    catch(err){
        console.log("DISTANCE_SCORE", err);
    }
    
    return books ;

};

module.exports = handler;

