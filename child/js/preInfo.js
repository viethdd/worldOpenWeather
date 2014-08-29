$(document).ready(function(){
   $.ajax({
     url: 'http://api.hostip.info/get_json.php', 
     dataType:'jsonp',
     success:function(api) {
      city = api.city;
      $('.search-text').val(city);
      // $('.search').trigger('click');
      console.log('firefox...'+city);
     }  
   });

    // var url2   = 'http://api.worldweatheronline.com/free/v1/tz.ashx?q='+city+'&format=json&key=j7cf7epyawudqvbkf3cvc7r2';
    // // console.log('url2 = '+city);
    //   $.ajax({
    //     url: url2,
    //     dataType: 'jsonp',
    //     success:function(res){
    //       var localTime   = res.data.time_zone[0].localtime;
    //       var timeSliced = localTime.replace(/\d+-\d+-\d+\s/g,'');
    //       var today       = localTime.replace(/\s\d+:\d\d/g,'').replace('2014-','')+'-2014';
    //       var hour = parseInt(localTime.replace(/\d+-\d+-\d+\s/g,'').replace(/(:\d+)/g,''));
    //       var monthNum = parseInt(today.replace(/-\d+-\d+/g,''));
    //       var monthChar;
    //       var dateOfMonth = parseInt(today.replace('-2014','').replace(/\d+-/g,''));
    //       var year = parseInt(today.replace(/\d+-/g,''));
    //       var th;
          
          // if (dateOfMonth == 1 || dateOfMonth == 21 || dateOfMonth == 31){
          //   th ='<sup>st</sup>';
          // }
          // if (dateOfMonth == 2 || dateOfMonth == 22){
          //   th ='<sup>nd</sup>';
          // }
          // if (dateOfMonth == 3 || dateOfMonth == 23){
          //   th ='<sup>rd</sup>';
          // }
          // if (dateOfMonth >3 && dateOfMonth <21){
          //   th = '<sup>th</sup>';
          // }

          // console.log('dayofmonth=='+dateOfMonth);  
       //    switch (monthNum){
       //      case 01: 
       //              monthChar = 'Jan.';
       //              break; 
       //      case 02: 
       //              monthChar = 'Feb.';
       //              break;      
       //      case 03: 
       //              monthChar = 'Mar.';
       //              break;
       //      case 04: 
       //              monthChar = 'Apr.';
       //              break;         
       //      case 05: 
       //              monthChar = 'May.';
       //              break;         
       //      case 06: 
       //              monthChar = 'Jun.';
       //              break;         
       //      case 07: 
       //              monthChar = 'Jul.';
       //              break;         
       //      case 08: 
       //              monthChar = 'Aug.';
       //              break;         
       //      case 09: 
       //              monthChar = 'Sep.';
       //              break;         
       //      case 10: 
       //              monthChar = 'Oct.';
       //              break;         
       //      case 11: 
       //              monthChar = 'Nov.';
       //              break;                             
       //      default:
       //              monthChar = 'Dec.';
       //              break;        
       //    }

       //    var currentTime = new Date();
       //    currentTime.setDate(dateOfMonth);
       //    var dateParsed = currentTime.toDateString();
       //    var dateSliced = dateParsed.replace(/\s\w+/g,'').toString();
       //    // function callDate(dateSliced){
       //    switch (dateSliced){
       //      case 'Mon':
       //              dateSliced = 'Monday';
       //              break;
       //      case 'Tue':
       //              dateSliced = 'Tuesday';
       //              break;                    
       //      case 'Wed':
       //              dateSliced = 'Wednesday';
       //              break;                    
       //      case 'Thu':
       //              dateSliced = 'Thursday';
       //              break;
       //      case 'Fri':
       //              dateSliced = 'Friday';
       //              break;
       //      case 'Sat':
       //              dateSliced = 'Saturday';
       //              break;
       //      case 'Sun':
       //              dateSliced = 'Sunday';
       //              break;                                    
       //      default:
       //              break;        
       //    }  
       //  // }

       //    var nextDate = new Date();
       //    for (i =1; i <=6; i++){  
       //      nextDate.setDate(dateOfMonth+i);
       //      var nextDateSliced = nextDate.toDateString()
       //                           .replace(/\s\w+/g,'').toString();
       //      // console.log('newDate = '+newDate);
       //      // console.log('dateslice=' + newdateSliced);
       //       switch (nextDateSliced){
       //      case 'Mon':
       //              nextDateSliced = 'Monday';
       //              break;
       //      case 'Tue':
       //              nextDateSliced = 'Tuesday';
       //              break;                    
       //      case 'Wed':
       //              nextDateSliced = 'Wednesday';
       //              break;                    
       //      case 'Thu':
       //              nextDateSliced = 'Thursday';
       //              break;
       //      case 'Fri':
       //              nextDateSliced = 'Friday';
       //              break;
       //      case 'Sat':
       //              nextDateSliced = 'Saturday';
       //              break;
       //      case 'Sun':
       //              nextDateSliced = 'Sunday';
       //              break;                                    
       //      default:
       //              break;        
       //    } 

       //    // $('#name-d'+i).html(nextDateSliced);

       // }

       //    $('.date').html( dateSliced + ' '+monthChar+' '
       //                     +"<span style='font-weight: bold'>"
       //                     +dateOfMonth+th+"</span>"+' '+year);


          // console.log('hour == '+hour);  
         // })
