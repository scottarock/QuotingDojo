var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

module.exports = {

// format the date and time the way we want to display it

  formatDate: function(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+ minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime + " " + monthNames[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() ;
  }

}
