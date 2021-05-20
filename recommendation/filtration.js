const getLikedBooks = require('./get-liked-books');

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
}
  
function deg2rad(deg) {
    return deg * (Math.PI/180) ;
}

const handler = async(all_books,userLat,userLong,userDistance,userId,userTags) =>{
    
        let books = all_books ;
        
        let liked_books = await getLikedBooks(userId);
    
     return [].slice.call(books).filter( function(book){
        
        if(liked_books!=null && liked_books.includes(book)){
            return false;
        }
        
        var dist = getDistanceFromLatLonInKm(userLat,userLong,book.lat,book.long);
        var cnt = 0;
        if(userTags){
        userTags.map(tag => {
            if(book.tags && book.tags.includes(tag)){
                cnt = cnt + 1 ;
            }
        });
        }
        
        book.distance = dist ;
        book.matched_tags = cnt ;

        return ( userId!=book.userId  && dist<=userDistance ) ;

    });
    //console.log(books);
   // return books;

};

module.exports = handler;