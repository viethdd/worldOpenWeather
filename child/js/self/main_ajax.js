$(document).ready(function() {
  var city;
  var valueLength;
  var windUnit;
  var cityArr = [];
  var percent = "<span style='font-weight:200;font-size:.3em;'> %</span>";

  // call localstorage data and put the feature back after page reloaded
  if(localStorage.length >0 ){
    //call data from city array
    var value = JSON.parse(localStorage.getItem('cityArr')).length;
    var lcs  = JSON.parse(localStorage.getItem('cityArr'));
    for (i = 1; i <= value; i++) {
      createFtr(i);
      $("#city" + (i)).html( lcs[i - 1].city);
      $("#tempr" + (i)).html(lcs[i - 1].temp);
      $("#min" + (i)).html(lcs[i - 1].minx);
      $("#minCond" + (i)).html(lcs[i - 1].minCond);
      $("#imgSrc" + (i)).attr('src',lcs[i - 1].imgSrc);
    }
    $('.saving-clear').on('click',function(){
      localStorage.clear();
      $('.right').children('*').remove();
    });
  }

  //call back the main city storage
  // if(localStorage>1){
  //   // console.log(localStorage.length);
  //   var main_city_length = JSON.parse(localStorage.getItem('ls_main_city_arr')).length;
  //   var ls_objects  = JSON.parse(localStorage.getItem('ls_main_city_arr'));
  //   // console.log(ls_objects[0].city+", " + ls_objects[0].state);
  //   $('.search-text').val(ls_objects[0].city+", " + ls_objects[0].state);
  // }

  //trigger search button with Enter keyboard pressed
  $('form').keydown(function(e) {
    if (e.which == "13") {
      $('.bot-content').children('*').remove();
      $('.hourly-content').children('*').remove();
      $('.yesterday-content').children('*').remove();
      $('.tide-content').children('*').remove();
      $(".search").trigger("click");
    }
  });

  //clear search text with Escape keyboard pressed
  $('.search-text').keyup(function(e){
    if (e.which == 27){
      // 27 == Escape
      $(this).val('');
    }
  });

  //close search button
  $('.closeBtn').on('click', function() {
      $('.search-text').val('');
      $('.search-text').focus();
  });
  $(".search-text").on('click', function() {
    $(this).select();
  });

  //add clear for small screen
  var h = $(window).height(),
      w = $(window).width();
  if (w == 320 && h == 480) {
    $('body').append("<div class='toolbar'></div>");
    $('.toolbar').append("<div class='favorite'>Favorite</div>");
    $('.right').append("<div class='clear320'>Clear</div>");
  } else {
    $('.saveFavorite').remove();
    $('.clear320').remove();
  }

  $('.favorite').on('click', function() {
    $('.favorite').toggleClass('favorite-active');
    $('.right').toggleClass('right-active');
  });

    // get geoIP
    // var time_url = "http://api.hostip.info/get_json.php";
    var geoip_url = "http://freegeoip.net/json/";
  // var getIP = "http://www.telize.com/geoip";
  // var getIP = "http://www.telize.com/jsonip";
  $.ajax({
    url: geoip_url,
    type: 'GET',
    dataType: 'jsonp',
    success: function(data){
      // console.log(data.city);
      city = data.city;
      state = data.region_code;
      $('.search-text').val(city+', '+state);
      $('.search').trigger('click');
      return state;
    }
  });

  //                                #     ###    #                      ##     #          #
  //                                #     #  #   #                       #                #
  //  ###    ##    ###  ###    ##   ###   ###   ###   ###          ##    #    ##     ##   # #
  // ##     # ##  #  #  #  #  #     #  #  #  #   #    #  #        #      #     #    #     ##
  //   ##   ##    # ##  #     #     #  #  #  #   #    #  #        #      #     #    #     # #
  // ###     ##    # #  #      ##   #  #  ###     ##  #  #         ##   ###   ###    ##   #  #

  // unit switch •F & •C
  function windUnit(){

    if ($('.f').hasClass('unit-active')){
      windUnit = "<span style='font-size:.3em;font-weight:400'> mph</span>";
    } else if ($('.c').hasClass('unit-active')){
      windUnit = "<span style='font-size:.3em;font-weight:400'> kmh</span>";
    }
  }

  var location = ['yesterday','hourly','bot','weekend','tide'];
  function resetContent(location){
    $('.yesterday-content').children('*').remove();
    $('.tide-content').children('*').remove();
    $('.bot-content').children('*').remove();
    $('.hourly-content').children('*').remove();
    $('.'+location+'-content').css({'visibility':'visible'});
  }

  //searchBtn function define
  $('.search').click(function(unit) {
    $('.saving-clear').on('click',function(){
      localStorage.clear();
      $('.right').children('*').remove();
    });
    $('.clear320').on('click',function(){
      localStorage.clear();
      $('.right').children('.ftr').remove();
    });

    $('.yesterday-content').children('*').remove();
    $('.tide-content').children('*').remove();
    $('.bot-content').children('*').remove();
    $('.hourly-content').children('*').remove();
    $('.hourly-content').css({'visibility':'visible'});

    // get input search text
    city = $(".search-text").val();
    city = city.toLowerCase().replace(/\b[a-z]/g, function(letter) {
      return letter.toUpperCase(/\$/ig);
    });

    var cityName  = city.replace(/,\s\w+/g,'');
    var stateName = city.replace(/\w+,\s/g,'');
    // console.log(stateName);
    var url1a      = "child/data/lynnwood.json";
    var url1b      = "child/data/San_Francisco.json";
    var ystrdayurl = "child/data/yesterday.json";
    var tideurl    = "child/data/tide.json";
    var h10url     = "child/data/hourly10day.json";
    // var flickr     = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7e519d7b080dcfc36ddfb22eff037a0a&text="+cityName+","+stateName+",building"+"&safe_search=1&format=json&jsoncallback=?";


    // var geourl= "http://api.wunderground.com/api/37a973906ebb585b/geolookup/q/"+stateName+"/"+cityName+".json";

    // var url1a = "http://api.wunderground.com/api/37a973906ebb585b/forecast10day/q/"+stateName+"/"+cityName+".json";
    // var url1b = "http://api.wunderground.com/api/66a33654b24e71f1/hourly/q/"+stateName+"/"+cityName+".json";
    // var ystrdayurl= "http://api.wunderground.com/api/37a973906ebb585b/yesterday/q/"+stateName+"/"+cityName+".json";
    // var tideurl = "http://api.wunderground.com/api/37a973906ebb585b/tide/q/"+stateName+"/"+cityName+".json";

    // if(localStorage.length >1 ){
    //   var main_city_length = JSON.parse(localStorage.getItem('ls_main_city_arr')).length;
    //   var ls_objects  = JSON.parse(localStorage.getItem('ls_main_city_arr'));
    //  var ls_main_city_arr = [];
    // ls_main_city_arr.push({'city':cityName,'state':stateName});
    // localStorage.setItem('ls_main_city_arr', JSON.stringify(ls_main_city_arr));

    //   $('.saving-clear').on('click',function(){
    //     localStorage.clear();
    //     $('.right').children('*').remove();
    //   });
    // }

    // today + next day API
    function todayWeather(){
      return $.ajax({
                type  : "GET",
                url   : url1a,
                async : false,dataType:'json',
                // dataType:"jsonp",
                success: function(data1a){}
              });
    }

    // hourly API
    function hourlyWeather(){
      return $.ajax({
                type : "GET",
                url  : url1b,
                async: false,dataType:'json',
                // dataType:"jsonp",
                success: function(data1b){}
             });
    }
    function hourly10days(){
      return $.ajax({
                type : "GET",
                url  : h10url,
                async: false,dataType:'json',
                // dataType:"jsonp",
                success: function(data1b){}
             });
    }
    // function geoLookup(){
    //   return $.ajax({
    //             type : "GET",
    //             // url  : geourl,
    //             // async: false,dataType:'json',
    //             dataType:"jsonp",
    //             success: function(dataGeo){}
    //          });
    // }
    function yesterdayWeather(){
      return $.ajax({
                type : "GET",
                url  : ystrdayurl,
                async: false,dataType:'json',
                // dataType:"jsonp",
                success: function(dataystrday){}
             });
    }

    function tide(){
      return $.ajax({
                type : "GET",
                url  : tideurl,
                async: false,dataType:'json',
                // dataType:"jsonp",
                success: function(datatide){}
             });
    }

    //multiple ajax function
    $.when(

      todayWeather(),
      hourlyWeather(),
      yesterdayWeather(),
      tide()

    ).then(function(data1a, data1b, dataystrday, datatide){


      //test
      // var flickrID = flickrData[0];
      // console.log(flickrID);


      //unit activations
      $('.unit').each(function(){
        $(this).on('click',function(){
          $('.unit').removeClass('unit-active');
          $(this).addClass('unit-active');
          $('.search').trigger('click');
          $('.bot-content').children('*').remove();
          $('.hourly-content').children('*').remove();
          $('.yesterday-content').children('*').remove();
          $('.tide-content').children('*').remove();
          var location = $('.forecast-switch').data('switch');
          if ($('.five-switch').hasClass('forecast-active')){
            callBottomContent(5);
          }
          if ($('.ten-switch').hasClass('forecast-active')){
            callBottomContent(10);
          }
          if ($('.weekend-switch').hasClass('forecast-active')){
            callBottomContent(10);
            callWeekend();
          }
          else if ($('.yesterday-switch').hasClass('forecast-active')){
            callYesterday();
          }
          else if ($('.hourly-switch').hasClass('forecast-active')){
            callHourly();
          }
        });
      });

      // search for today and next days
      var data10Days  = data1a[0].forecast.simpleforecast
        , humidity    = data10Days.forecastday[0].avehumidity
        , condition   = data10Days.forecastday[0].conditions
        , icon        = data10Days.forecastday[0].icon
        , pop         = data10Days.forecastday[0].pop
        , weekdayname = data10Days.forecastday[0].date.weekday
        , date        = data10Days.forecastday[0].date.day
        , month       = data10Days.forecastday[0].date.monthname
        , year        = data10Days.forecastday[0].date.year
      ;

      // var flickr     = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=7e519d7b080dcfc36ddfb22eff037a0a&text="+cityName+" "
      //                   +stateName+" " +condition +"&group_id=39804613888@N01&safe_search=1&format=json&jsoncallback=?";

      var flickr     = "https://api.flickr.com/services/rest/?method=flickr.favorites.getPublicList&user_id=33416734@N03&api_key=7e519d7b080dcfc36ddfb22eff037a0a&text="+cityName+" "
                        +stateName +"&machine_tags=fav:title&safe_search=1&format=json&jsoncallback=?";
      $.ajax({
              type  : "GET",
              url   : flickr,
              // async : false,dataType:'json',
              dataType:"jsonp",
              success: function(flickrData){

                var flength = flickrData.photos.photo.length;
                // console.log("flength "+flength);
                // console.log(flickrData);
                var flickrString = flickrData.photos.photo;
                // console.log(flickrString);
                for (i in flickrString){
                  // console.log(flickrString[i].title);
                  if( flickrString[i].title.indexOf(cityName) !== -1 ){
                    // console.log(flickrString[i].title);
                    $(".bgimg").attr('src','');
                    flickrID         = flickrString[i].id;
                    flickrOwner      = flickrString[i].owner;
                    flickrSecret     = flickrString[i].secret;
                    flickrServer     = flickrString[i].server;
                    flickrFarm       = flickrString[i].farm;
                    console.log(flickrOwner);
                    // flickr.people.getInfo
                    var flickrInfo     = "https://api.flickr.com/services/rest/?method=flickr.people.getInfo&user_id="+flickrOwner+"&api_key=7e519d7b080dcfc36ddfb22eff037a0a&safe_search=1&format=json&jsoncallback=?";
                    $.ajax({
                      type: "GET",
                      url: flickrInfo,
                      dataType: "jsonp",
                      success: function(flickrOwnerData){
                        console.log(flickrOwnerData);
                        console.log(flickrOwnerData.person.username._content);
                        $('.flink').html(flickrOwnerData.person.username._content);
                      }
                    });
                    flickrIMG        = "https://farm"+flickrFarm+".static.flickr.com/"+flickrServer+"/"+flickrID+"_"+flickrSecret+"_z.jpg";
                    flickrOwnerURL   = "https://flickr.com/photos/"+flickrOwner+"/"+flickrID+"/";
                    // console.log(flickrIMG);
                    // console.log(flickrID);
                    $('.photourl').attr('href',flickrOwnerURL);
                    // $(".bgimg").attr('src',flickrIMG);
                    // $('.background').css({'background':'url('+flickrIMG+')'});
                    $('.background').css('background-image', 'url(' + flickrIMG + ')');
                  }
                }
                //

              }
            });

      if((date == '1')||(date == '01')||(date == '21')||(date == '31')){
        date = date +'<span><sup>st</sup></span>';
      }
      else if((date == '2')||(date=='22')|| (date == '02')){
        date = date+'<span><sup>nd</sup></span>';
      }
      else if((date == '3')||(date == '03')||(date=='23')){
        date = date +'<span><sup>rd</sup></span>';
      }
      else{
        date = date +'<span><sup>th</sup></span>';
      }

      $('.date').html(weekdayname + ", " + month + " "+ date +", "+ year);

      // var max = 0;
      if ($('.f').hasClass('unit-active')){
        max  = data10Days.forecastday[0].high.fahrenheit;
        min  = data10Days.forecastday[0].low.fahrenheit;
        wind = data10Days.forecastday[0].maxwind.mph;
        windUnit = "<span style='font-size:.3em;font-weight:400'> mph</span>";
      }
      else if ($('.c').hasClass('unit-active')){
        max  = data10Days.forecastday[0].high.celsius;
        min  = data10Days.forecastday[0].low.celsius;
        wind = data10Days.forecastday[0].maxwind.kph;
        windUnit = "<span style='font-size:.3em;font-weight:400'> kmh</span>";
      }

      $('.condition').html(condition);
      $('.tempr-content').html(max);
      $('.min').html(min);
      $('.wind').html("<div class='wind-text' style='font-weight:400'><span style='font-weight:800'>W</span>ind </div>"+"<p class='wind-value'>"+ "<span class='wind-number'>"+wind+"</span>" + windUnit+"</p>");
      $('.humidity').html("<div class='wind-text' style='font-weight:400'><span style='font-weight:800'>H</span>umidity </div>"+"<div class='wind-value'>"+ "<span class='wind-number'>"+humidity+"</span>" + percent+"</div>");
      $('.pop').html("<p class='wind-text' style='font-weight:400'><span style='font-weight:800'>P</span>rocipitation </p>" +"<p class='wind-value'>"+ "<span class='wind-number'>"+pop+"</span>" +percent+ "</p>");

      tempNextDayName     = [];
      tempNextDayDate     = [];
      tempNextDayMax      = [];
      tempNextDayMin      = [];
      tempNextDayCond     = [];
      tempNextDayWind     = [];
      tempNextDayHumidity = [];
      tempNextDayPop      = [];

      for (x =0; x<=9;x++){
        tempNextDayDate[x] = (data10Days.forecastday[x].date.pretty).replace(/^\d+:\d+\s\w+\s\w+\s\w+\s/g,'').replace(/,\s\d+/g,'');
        tempNextDayName[x] = data10Days.forecastday[x].date.weekday;
        if ($('.f').hasClass('unit-active')){
          tempNextDayMax[x]      =  data10Days.forecastday[x].high.fahrenheit;
          tempNextDayMin[x]      =  data10Days.forecastday[x].low.fahrenheit;
        } else if ($('.c').hasClass('unit-active')) {
          tempNextDayMax[x]      =  data10Days.forecastday[x].high.celsius;
          tempNextDayMin[x]      =  data10Days.forecastday[x].low.celsius;
        }

        tempNextDayCond[x]     =  data10Days.forecastday[x].conditions;
        tempNextDayPop[x]      =  data10Days.forecastday[x].pop;
        tempNextDayWind[x]     =  data10Days.forecastday[x].maxwind.mph;
        tempNextDayHumidity[x] =  data10Days.forecastday[x].avehumidity;

        tempNextDayDate.push(tempNextDayDate[x]);
        tempNextDayName.push(tempNextDayName[x]);
        tempNextDayMax.push(tempNextDayMax[x]);
        tempNextDayMin.push(tempNextDayMax[x]);
        tempNextDayCond.push(tempNextDayCond[x]);
        tempNextDayPop.push(tempNextDayPop[x]);
        tempNextDayWind.push(tempNextDayWind[x]);
        tempNextDayHumidity.push(tempNextDayHumidity[x]);
      }

      //call to create weather icon for each item
      function callWeatherIcon(object,icon){
        if (icon.indexOf('cloudy')>-1) {
          $(object).attr('src', 'child/img/svg/cloudy.svg').css('opacity', '1');
        } else if (icon.indexOf('rain')>-1) {
          $(object).attr('src', 'child/img/svg/rain.svg').css('opacity', '1');
        } else if (icon.indexOf('shower')>-1) {
          $(object).attr('src', 'child/img/svg/rain.svg').css('opacity', '1');
        } else if (icon.indexOf('snow')>-1) {
          $(object).attr('src', 'child/img/svg/snow.svg').css('opacity', '1');
        } else if (icon.indexOf('partlycloudy')>-1) {
          $(object).attr('src', 'child/img/svg/partly-cloudy.png').css('opacity', '.2');
        } else if (icon.indexOf('tstorms')>-1) {
          $(object).attr('src', 'child/img/svg/tstorm.svg').css('opacity', '1');
        } else if (icon.indexOf('sun')>-1) {
          $(object).attr('src', 'child/img/png/sun.png').css('opacity', '1');
        }
        else if (icon.indexOf('clear')>-1) {
          var currentTime  = new Date();
          var hour   = currentTime.getHours();
          if (hour>20 && hour>24 && hour <7){
            $(object).attr('src', 'child/img/svg/moon.svg').css('opacity', '1');
          }
          else{
            $(object).attr('src', 'child/img/png/sun.png').css('opacity', '1');
          }
        }
        else{
          console.log('design icon later');
        }
      } //end weather icon function

      callWeatherIcon('.condition-icon',icon);

      // function callCurrentHour(){
      // var callCurrentHour = setInterval(function(){
      //   var city = $('.search-text').val();
      //   var url2 = 'http://api.worldweatheronline.com/free/v1/tz.ashx?q=' + city + '&format=json&key=j7cf7epyawudqvbkf3cvc7r2';
      //   $.ajax({
      //     url      : url2,
      //     dataType : 'jsonp',
      //     cache: 'false',
      //     success  : function(res) {
      //       var localTime    = res.data.time_zone[0].localtime;
      //       var timeSliced   = localTime.replace(/\d+-\d+-\d+\s/g, '');
      //       var today        = localTime.replace(/\s\d+:\d\d/g, '').replace('2014-', '') + '-2014';
      //       var hour         = parseInt(localTime.replace(/\d+-\d+-\d+\s/g, '').replace(/(:\d+)/g, ''));
      //       var hourSliced   = parseInt(timeSliced.replace(/:\w+/g,''));
      //       var minuteSliced = parseInt(timeSliced.replace(/\w+:/g,''));
      //
      //       //set Local Time for 2 digit numbers < 10
      //       var hour2Digits = (hour-12);
      //       if (hour > 12) {
      //         if (hour2Digits<10){
      //           hour2Digits = "0"+hour2Digits;
      //         }
      //         if (minuteSliced>=0 && minuteSliced<10){
      //           minuteSliced = "0"+ minuteSliced;
      //         }
      //         $('.time').html("<span class='time-text'>Local Time:   </span>"+(hour2Digits)+':'+minuteSliced + ' pm');
      //       }
      //       else if(hour < 12){
      //         if (hour < 10){
      //           hour = "0" + hour;
      //         }
      //         if (minuteSliced >= 0 && minuteSliced < 10){
      //           minuteSliced = "0"+ minuteSliced;
      //         }
      //         $('.time').html("<span class='time-text'>Local Time:   </span>"+(hour)+':'+minuteSliced + ' am');
      //       }//end hour modifying
      //     } //end ajax success
      //   })//end ajax
      // });
      // callCurrentHour();
      // end for today and next days weather

      // search for hourly
      var dataHourly         = data1b[0].hourly_forecast
        , tempHourlyMax      = []
        , tempHourlyMin      = []
        , tempHourlyCondText = []
        , tempHourlyCondIcon = []
        , tempHourlyWind     = []
        , tempHourlyHumidity = []
        , tempHourlyClock    = []
        , tempHourlyPop      = []
      ;

      function createHourly(){
        for (x =0; x<=10;x++){
          tempHourlyClock[x]      =  dataHourly[x].FCTTIME.civil;
          if ($('.f').hasClass('unit-active')){
            tempHourlyMax[x]      =  dataHourly[x].temp.english;
            tempHourlyMin[x]      =  dataHourly[x].dewpoint.english;
            tempHourlyWind[x]     =  dataHourly[x].wspd.english;
          }else if ($('.c').hasClass('unit-active')){
            tempHourlyMax[x]      =  dataHourly[x].temp.metric;
            tempHourlyMin[x]      =  dataHourly[x].dewpoint.metric;
            tempHourlyWind[x]     =  dataHourly[x].wspd.metric;
          }
          tempHourlyCondText[x] =  dataHourly[x].wx;
          tempHourlyCondIcon[x] =  dataHourly[x].icon;
          tempHourlyHumidity[x] =  dataHourly[x].humidity;
          tempHourlyPop[x]      =  parseInt(dataHourly[x].pop);

          tempHourlyMax.push(tempHourlyMax[x]);
          tempHourlyMin.push(tempHourlyMin[x]);
          tempHourlyCondText.push(tempHourlyCondText[x]);
          tempHourlyWind.push(tempHourlyWind[x]);
          tempHourlyHumidity.push(tempHourlyHumidity[x]);
          tempHourlyPop.push(tempHourlyPop[x]);
        }
        for (i = 1; i<= 10; i++){
          $('.hourly-content').append("<li class='hourly-item' id='hourly-item"+i+"'></li>");
          $("#hourly-item"+i).append("<p class='hourly-clock' id='hourly-clock"+i+"'></p>");
          $("#hourly-item"+i).append("<p class='hourly-max' id='hourly-max"+i+"'></p>");
          $("#hourly-item"+i).append("<p class='hourly-min' id='hourly-min"+i+"'></p>");
          $("#hourly-item"+i).append("<div class='hourly-cond' id='hourly-cond"+i+"'></div>");
          $("#hourly-cond"+i).append("<img class='hourly-cond-img' id='hourly-cond-img"+i+"'>");
          $("#hourly-cond"+i).append("<p class='hourly-cond-text' id='hourly-cond-text"+i+"' ></p>");
          $("#hourly-item"+i).append("<p class='hourly-wind' id='hourly-wind"+i+"' ></p>");
          $("#hourly-item"+i).append("<p class='hourly-humidity' id='hourly-humidity"+i+"' ></p>");
          $("#hourly-item"+i).append("<p class='hourly-pop' id='hourly-pop"+i+"' ></p>");
        }
      }

      function callHourly(){
        createHourly();
        for (i = 1; i<=10; i++){
          $("#hourly-clock"+i).text(tempHourlyClock[i-1]);
          $("#hourly-max"+i).text(tempHourlyMax[i-1]);
          $("#hourly-min"+i).text(tempHourlyMin[i-1]);
          callWeatherIcon("#hourly-cond-img"+i,tempHourlyCondIcon[i-1]);
          $("#hourly-cond-text"+i).text(tempHourlyCondText[i-1]);
          $("#hourly-wind"+i).html('w: '+tempHourlyWind[i-1]+windUnit);
          $("#hourly-humidity"+i).html('h: '+tempHourlyHumidity[i-1]+percent);
          $("#hourly-pop"+i).html('p: '+tempHourlyPop[i-1]+percent);
        }
      }
      callHourly();
      //end hourly

      function create10days(location,i,weekdays){
        $('.'+location+'-content').append("<li class='n-day' id='n"+i+"d' data-weekdays='"+weekdays+"'></li>");
        $("#n"+i+"d").append("<div class='n-day-date' id='n-day-date"+i+"'></div>");
        $("#n"+i+"d").append("<div class='name-n-day' id='name-d"+i+"'></div>");
        $("#n"+i+"d").append("<div class='n-day-max' id='n"+i+"dMax'></div>");
        $("#n"+i+"d").append("<div class='n-day-min' id='n"+i+"dMin'></div>");
        $("#n"+i+"d").append("<img class='n-day-cond-img' id='n"+i+"dCondImg'>");
        $("#n"+i+"d").append("<div class='n-day-cond' id='n"+i+"dCond'></div>");
        $("#n"+i+"d").append("<div class='n-day-wind' id='n"+i+"dWind'></div>");
        $("#n"+i+"d").append("<div class='n-day-humidity' id='n"+i+"dHumidity'></div>");
        $("#n"+i+"d").append("<div class='n-day-pop' id='n"+i+"dPop'></div>");
      }
      // create and call daily
      function callBottomContent(days){
        for (i = 1; i<= days; i++){
          create10days('bot',i,tempNextDayName[i]);
          // $('.n')
          $('#n-day-date'+i).html(tempNextDayDate[i]);
          $('#name-d'+i).html(tempNextDayName[i]);
          $('#n'+i +'dMax').html(tempNextDayMax[i]);
          $('#n'+i +'dMin').html(tempNextDayMin[i]);

          if(tempNextDayCond[i-1].indexOf('Showers')){
            var wholeptn     = /(\w+)\s(\w+)/gi;
            var scndcheckptn = /\s\w+/gi;
            var property;
            property = tempNextDayCond[i-1].replace(wholeptn,function(letter){
            });
            property = tempNextDayCond[i-1].replace(wholeptn,"$1 <span class='property'>$2</span>");
          }
          var windUnit;
          if ($('.f').hasClass('unit-active')){
            windUnit = "<span class='wind-unit'> mph</span>";
          } else if ($('.c').hasClass('unit-active')){
            windUnit = "<span class='wind-unit'> kmh</span>";
          }
          $('#n'+i +'dCond').html(property);
          callWeatherIcon('#n'+i +'dCondImg',icon);
          $('#n'+i +'dPop').html('p: '+tempNextDayPop[i-1] + percent);
          $('#n'+i +'dWind').html('w: '+tempNextDayWind[i-1] +windUnit);
          $('#n'+i +'dHumidity').html('h: '+tempNextDayHumidity[i-1] + percent);
        }

        //test
        $('.n-day').each(function(){
          $(this).on('click',function(){
            var ind = $(this).data('weekdays');
            // var ind = $(this).index();
            console.log('weekday: ' + (ind));
            // alert('ok');
          });
        });
      }
      $('.bot-content').children('*').remove();
      // callBottomContent(10);

      function callWeekend(){
        var weekend = ['Friday','Saturday','Sunday'];
        $('.n-day').each(function(){
          for (i in weekend){
            if($(this).data('weekdays') == weekend[i]){
              // $(this).css({'background':'rgba(10,10,10,.4)'});
              $(this).addClass('weekend');
            }
          }
        });
      }

      // forecast switch
      $('.forecast-switch').on('click',function(e){
        $('.forecast-switch').removeClass('forecast-active');
        $(this).addClass('forecast-active');
        var location = $(this).data('switch');
        var value    = $(this).data('days');
        function clearContent(location){
          // $('.sub-forecast-wrapper').children('*').not('.'+location+'-content').not('.top-content').css({'visibility':'hidden'});
          $('.'+location+'-content').children('*').remove();
          $('.'+location+'-content').css({'visibility':'visible'});
        }
        clearContent(location);
        if(location == 'bot' ){
          resetContent(location);
          callBottomContent(value);
        }
        else if(location == 'yesterday'){
          resetContent(location);
          callYesterday();
        }
        else if(location == 'hourly'){
          resetContent(location);
          callHourly();
        }
        else if (location == "weekend"){
            $('.hourly-content').children('*').remove();
            $('.tide-content').children('*').remove();
            $('.yesterday-content').children('*').remove();
            $('.bot-content').children('*').remove();
            $('.bot-content').css({'visibility':'visible'});
            callBottomContent(9);
            callWeekend();
        }
        else if(location == 'tide'){
          resetContent(location);
          callTide();
        }
      });

      // geoLookup
      // var dataGeo = dataGeo[0].location.country_iso3166;
      // var flagName = dataGeo.toLowerCase();
      // var flagUrl = "child/img/flag_icons/"+ flagName + ".png";
      // $('.flag-img').attr('src',flagUrl); // end geoLookup

      //yesterday weather

      function callYesterday(){
        var dataYd = dataystrday[0].history;
        var yesterdayDate = dataYd.date.pretty;
        if ($('.f').hasClass('unit-active')){
          var yesterdayMax  = Math.round(dataYd.observations[0].tempi);
          var yesterdayMin  = Math.round(dataYd.observations[0].dewpti);
          var yesterdayWind  = Math.round(dataYd.observations[0].wspdi);
        } else if ($('.c').hasClass('unit-active')){
          var yesterdayMax  = Math.round(dataYd.observations[0].tempm);
          var yesterdayMin  = Math.round(dataYd.observations[0].dewptm);
          var yesterdayWind  = Math.round(dataYd.observations[0].wspdm);
        }
        var yesterdayCond  = dataYd.observations[0].conds;
        var yesterdayIcon  = dataYd.observations[0].icon;
        var yesterdayHum  = dataYd.observations[0].hum;
        var yesterdayPop  = dataYd.observations[0].rain;

        var weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var today = data10Days.forecastday[0].date.weekday;
        var yesterday;
        for (i in weekday){
          if(today == weekday[i]){
            yesterday = weekday[i-1];
            // console.log(yesterday);
          }else if(today == 'Sunday'){
            yesterday = 'Saturday';
          }
        }
        create10days('yesterday',1,yesterday);
        $('#n-day-date1').html(yesterdayDate);
        $('#name-d1').html(yesterday);
        $('#n1dMax').html(yesterdayMax);
        $('#n1dMin').html(yesterdayMin);
        callWeatherIcon('#n1dCondImg',icon);
        $("#n1dCond").text(yesterdayCond);
        var windUnit;
        if ($('.f').hasClass('unit-active')){
          windUnit = "<span class='wind-unit'> mph</span>";
        } else if ($('.c').hasClass('unit-active')){
          windUnit = "<span class='wind-unit'> kmh</span>";
        }
        $('#n1dWind').html(yesterdayWind + windUnit);
        $('#n1dHumidity').html(yesterdayHum + percent);
        $('#n1dPop').html(yesterdayPop + percent);
      }// end yesterday

      //create and call tide()
      function callTide(){
        var summary = datatide[0].tide.tideSummaryStats[0]
        ,   sumHigh = Math.round(summary.maxheight,2)
        ,   sumLow  = Math.round(summary.minheight,2)
        ,   details = datatide[0].tide.tideSummary
        ;

        $('.tide-content').append("<li class='summary'></li>");
        $('.summary').append("<span class='sumHigh'>High: "+sumHigh+"</span>");
        $('.summary').append("<span class='sumLow'>Low: "+sumLow+"</span>");
        // $('.tide-content').append("<li class='tide-date-wrapper'></li>");
        // $('.tide-date-wrapper').append("<span class=''>"+tideMonth[0]+"</span>");
        for (counter = 1; counter<=5;counter++){
          $('.summary').append("<span class='select-date' id='select-date"+counter+"' data-date='"+counter+"'></span>");
        }

        $('.select-date').each(function(){
          var count = $(this).data('date');
          $('#select-date'+count).on('click',function(){
            $('.tide-item'+count).css({'visibility':'visible'});
            $('.tide-content').animate({scrollTop:(225*(count-1))},
              '500', 'swing', function() {
             });
          });
        });

        var l            = details.length;
        var tideTime     = [];
        var tideItemHigh = [];
        var tideItemType = [];

        var tideHour     = [];
        var tideMin      = [];
        var tideDate     = [];
        var tideMonth    = [];
        var tideYear     = [];
        var intDate      = [];

        $('.tide-content').append("<ul class='details'></ul>");
        for (i = 0; i <= l; i++){

          tideItemHigh[i] = details[i].data.height;
          tideItemType[i] = details[i].data.type;

          tideHour[i]     = details[i].date.hour;
          tideMin[i]      = details[i].date.min;
          tideDate[i]     = details[i].date.mday;
          tideMonth[i]    = details[i].date.mon;
          tideYear[i]     = details[i].date.year;

          tideTime.push(tideTime[i]);
          tideItemHigh.push(tideItemHigh[i]);
          tideItemType.push(tideItemType[i]);

          tideHour.push(tideHour[i]);
          tideMin.push(tideMin[i]);
          tideDate.push(tideDate[i]);
          tideMonth.push(tideMonth[i]);
          tideYear.push(tideYear[i]);

          if(tideItemHigh[i]==""){
            tideItemHigh[i]="n/a";
          }

          var months = ['January','Febuary','March','April','May','June','July','August','September','October','November','December'];
          tideMonth[i] = parseInt(tideMonth[i]);
          tideMonth[i] = months[tideMonth[i]-1];
          console.log('tidemonth: '+tideMonth[1]);

          var counter=0;
          if((tideDate[i])-(tideDate[0]) == 0){
            counter=1;
            $('.details').append("<li  id='tide-item"+(i+1)+"' class='tide-item"+(counter)+"'></li>");
            $('#select-date'+counter).html(tideDate[i]);
            $('#select-date'+counter).data('date',tideDate[i]);
          }
          else if((tideDate[i])-(tideDate[0])==1){
            counter = 2;
            $('.details').append("<li  id='tide-item"+(i+1)+"' class='tide-item"+counter+"'></li>");
            $('#select-date'+counter).html(tideDate[i]);
            $('#select-date'+counter).data('date',tideDate[i]);
          }
          else if((tideDate[i])-(tideDate[0])==2){
            counter = 3;
            $('.details').append("<li  id='tide-item"+(i+1)+"' class='tide-item"+counter+"'></li>");
            $('#select-date'+counter).html(tideDate[i]);
            $('#select-date'+counter).data('date',tideDate[i]);
          }
          else if((tideDate[i])-(tideDate[0])==3){
            counter = 4;
            $('.details').append("<li  id='tide-item"+(i+1)+"' class='tide-item"+counter+"'></li>");
            $('#select-date'+counter).html(tideDate[i]);
            $('#select-date'+counter).data('date',tideDate[i]);
          }
          else if((tideDate[i])-(tideDate[0])==4){
            counter = 5;
            $('.details').append("<li  id='tide-item"+(i+1)+"' class='tide-item"+counter+"'></li>");
            $('#select-date'+counter).html(tideDate[i]);
            $('#select-date'+counter).data('date',tideDate[i]);
          }

          function setDateUp(tideDate){
            if((tideDate == 1)||(tideDate == 21)||(tideDate == 31)){
              tideDate = tideDate +'<span><sup>st</sup></span>';
              console.log('1');
            }
            else if((tideDate == 2)||(tideDate==22)){
              tideDate = tideDate+'<span><sup>nd</sup></span>';
              console.log('2');
            }
            else if((tideDate == 3)||(tideDate==23)){
              tideDate = tideDate +'<span><sup>rd</sup></span>';
              console.log('3');
            }
            else if(tideDate >=4 || tideDate<=20){
              tideDate = tideDate +'<span><sup>th</sup></span>';
            }
          }
          $('#tide-item'+(i+1)).append("<div class='tide-item-time'></div>");
          $('#tide-item'+(i+1)).append("<div class='tide-item-high'></div>");
          $('#tide-item'+(i+1)).append("<div class='tide-item-type'></div>");

          $('#tide-item'+(i+1) +' .tide-item-time').html(tideHour[i]+":"+tideMin[i]+" "+ tideMonth[i]+" "+ tideDate[i]+ ", "+ tideYear[i]);
          $('#tide-item'+(i+1) +' .tide-item-high').html(tideItemHigh[i]);
          $('#tide-item'+(i+1) +' .tide-item-type').html(tideItemType[i]);
        }
      }
      // callTide();




    });//end of multiple ajax


  });//end of search btn function
   //  ###    ###   #   #   ###
   // #          #  #   #  #   #
   //  ###    ####   # #   #####
   //     #  #   #   # #   #
   // ####    ####    #     ###
  $('.save').on('click', function() {
    var cityArr = [];
    if(localStorage.length >0 ){
      var value = JSON.parse(localStorage.getItem('cityArr')).length;
      ftrCount = value;
      var xx  = JSON.parse(localStorage.getItem('cityArr'));
      for (i=0; i<=xx.length-1;i++){
        cityArr.push(xx[i]);
      }
      //clear storage memory
      $('.saving-clear').on('click',function(){
        //toggle hidesaved class
        if ($('.right').hasClass('hideSaved')){
          $('.right').removeClass('hideSaved');
        }
        else{
          $('.right').addClass('hideSaved');
        }
        localStorage.clear();
        $('.right').children('*').remove();
      });//clear storage memory END
    }
    else{
      ftrCount = 0;
    }
    ftrCount++;
    if (ftrCount === 9) {
      return false;
    }
    cityText = $('.search-text').val();
    createFtr(ftrCount);
    if (ftrCount === 9) {
      return false;
    }
    var temp      =  parseInt($('.tempr-content').html())
    ,   minx      =  parseInt($('.min').html())
    ,   minCond   =  $('.condition').html()
    ,   imgSrc    =  $('.condition-icon').attr('src')
    ,   condText  =  $('.condition').html()
    ;

    // add city# values to localstorage array
    cityArr.push({'city': cityText, 'temp': temp, 'minx': minx, 'minCond': minCond, 'imgSrc': imgSrc});
    localStorage.setItem('cityArr', JSON.stringify(cityArr));
    var value = JSON.parse(localStorage.getItem('cityArr'));

    //set value for feature windows
    $("#city" + (ftrCount)).html(value[ftrCount - 1].city);
    $("#tempr" + (ftrCount)).html(value[ftrCount - 1].temp);
    $("#min" + (ftrCount)).html(value[ftrCount - 1].minx);
    $("#imgSrc" + (ftrCount)).attr('src',imgSrc);
    $("#minCond" + (ftrCount)).html(value[ftrCount - 1].minCond);
  });


  // data-index="'+(ftrCount)+'"
  //define createFtr items
  function createFtr(ftrCount) {
    var ftrDiv       =  $('<li class="ftr"  id="ftr'+(ftrCount)+'"></li>');
    var cityTitleDiv =  $('<div class="city-title" id="city' + (ftrCount) + '"></div>');
    var temprDiv     =  $('<div class="tempr" id="tempr' + (ftrCount) + '"></div>');
    var minxDiv      =  $('<div class="minx" id="min' + (ftrCount) + '"></div>');
    var minCondDiv   =  $('<div class="minCond" id="minCond' + (ftrCount) + '"></div>');
    var imgSrcDiv    =  $('<img class="imgSrc" id="imgSrc' + (ftrCount) + '">');
    var closeDiv     =  $('<div class="save-close" id="close' + (ftrCount) + '">Close</div>');
    console.log(ftrCount);
    //append saved features
    $('.right').append(ftrDiv);
         ftrDiv.append(cityTitleDiv);
         ftrDiv.append(temprDiv);
         ftrDiv.append(minxDiv);
         ftrDiv.append(imgSrcDiv);
         ftrDiv.append(minCondDiv);
         ftrDiv.append(closeDiv);

    $('.ftr').each(function() {
      $(this).on('click', function() {
        city = $(this).children('.city-title').html();
        $('.search-text').val(city);
        $('.search').trigger('click');
      });
    });

    //test
    $('.save-close').each(function(i){
      $(this).on('click',function(){
        $(this).parent('.ftr').remove();
        //clear the current index of this

      });
      $(this).attr('id','ftr'+(i+1));
      // var ftrArr = [];
      // var len = $('.ftr').length;
      // // ftrCount = len;
      //
      // for (x = 1; x <= len; x++){
      //   ftrArr.push(x);
      // }

      // $('.ftr').each(function(){
      //   $(this).attr('id','');
      //   $(this).attr('id','ftr');
      // });

    });

  } // END local storage

  // searching input autocomplete
  function enableAutocomplete() {
    $(".search-text").autocomplete({
      source: function(request, response) {
        $.ajax({
          url: "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + request.term,
          dataType: 'jsonp',
          async: false,
          type: 'GET',
          crossDomain:true,
          success: function(data) {
            response(data);
          }
        });
      },
      minLength: 2,
      select: function(event, ui) {
        var selectedObj = ui.item;
        //get right syntax string
        var ctryR = /,\s\w+,/gi;
        var notUS = selectedObj.value.replace(ctryR, ',');
        city = notUS;
        //check country outsides U.S.
        var checkCtryR = /^(\w+\s\w+,\s)|\w+,\s/g;
        // WORKS >> ^(\w+\s\w+,\s)|\w+,\s
        var countryName = selectedObj.value.replace(checkCtryR, '');
        // console.log(countryName);

        //ajax
        countryList = 'child/data/country.json';
        $.ajax({
          url      : countryList,
          type     : 'GET',
          dataType : 'json',
          async    : false,
          success  : function(country){
          }
        });//end ajax

        if (countryName == 'United States') {
            $(".search-text").val(selectedObj.value.replace(", United States", ""));
        } else {
          $('.search-text').val(notUS);
        }
        $('.bot-content').children('*').remove();
        $('.hourly-content').children('*').remove();
        $('.hourly-content').css({'visibility':'visible'});
        $('.yesterday-content').children('*').remove();
        $('.tide-content').children('*').remove();
        $('.search').trigger('click');
        return false;
      }
    });
  }

  // call autocomplete search
  enableAutocomplete();
  $(".search-text").autocomplete("option", "delay", 10);

}); // END OF FILE
