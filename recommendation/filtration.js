
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
    return deg * (Math.PI/180)
}

const handler = async(books,userLoc,userDistance,userId) =>{
    
    return books.filter( function(book){
        var location = book.location;
        var dist = getDistanceFromLatLonInKm(userLoc.lat,userLoc.lng,location.lat,location.lng);
        var cnt = 0;
        userTags.map(tag => {
            if(books.tags.includes(tag)){
                cnt = cnt + 1 ;
            }
        });
        book.distance = dist ;
        book.matched_tags = cnt ;

        return ( userId!=book.userId && dist<=userDistance) ;

    });

}