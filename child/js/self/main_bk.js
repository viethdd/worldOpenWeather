$(document).ready(function() {
  var city;
  var valueLength;
  var cityArr = [];
  var unit = 'imperial';

  $('form').keydown(function(e) {
      if (e.which == "enter") {
        $(".search").trigger("click");
        setTime();
      }
  });

  $('.search-text').keyup(function(e){
    if (e.which == 27){
        $(this).val('');
      }
  });

    // if(localStorage.length >0 ){
    //   $('.clear').css({'opacity':'1','cursor':'pointer'});
    //   // var cityArr = [];
    //     var value = JSON.parse(localStorage.getItem('cityArr')).length;
    //     // ftrCount = value;
    //     // console.log('localStorage ftrCount::'+ftrCount);
    //     var lcs  = JSON.parse(localStorage.getItem('cityArr'));
    //     // for (i=0; i<=xx.length-1;i++){
    //     //   cityArr.push(xx[i]);
    //     // }
    //     for (i = 1; i <= value; i++) {
    //       createFtr(i);
    //       $("#city" + (i)).html( lcs[i - 1].city);
    //       $("#tempr" + (i)).html(lcs[i - 1].temp);
    //       $("#min" + (i)).html(lcs[i - 1].minx);
    //       $("#minCond" + (i)).html(lcs[i - 1].minCond);
    //     }
    //
    //     $('.clear').on('click',function(){
    //       localStorage.clear();
    //       $('.right').children('*').remove();
    //       $('.clear').css({'opacity':'.4','cursor':'default'});
    //     });
    //     $('.clear320').on('click',function(){
    //       localStorage.clear();
    //       $('.right').children('.ftr').remove();
    //       $('.clear320').css({'opacity':'.4','cursor':'default'});
    //     });
    //   }
    //   else{
    //     $('.clear').css({'opacity':'.4','cursor':'default'});
    //     // $('.clear:hover').css({'opacity':'.4','cursor':'default','background':'#000'});
    //   }
  $('.closeBtn').on('click', function() {
      $('.search-text').val('');
      $('.search-text').focus();
  });
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

  function setTime() {
      var ctime  = new Date();
      var hour   = ctime.getHours();
      var minute = ctime.getMinutes();
      var second = ctime.getSeconds();

      function setOpacity(op) {
          $('.daynight').css('opacity', op);
      }

      if (hour > 18 && hour < 20) {
          setOpacity(0.6);
      }
      if (hour > 20 && hour < 24) {
          setOpacity(.8);
      }
      if (hour > 0 && hour < 7) {
          setOpacity(.9);
      }
      if (hour > 7 && hour < 12) {
          setOpacity(.2);
      }
      if (hour > 12 && hour < 16) {
          setOpacity(.1);
      }
      if (hour > 16 && hour < 18) {
          setOpacity(.5);
      }
  }
  setTime();
  var miniArr = [];
  var a1 = 0;
   //                                            #
   //  ##                   ##      #           #
   // #  #                   #                  #  #
   // #              ###     #     ##     ###   # #
   // #             #        #      #    #      ###
   // #  #          #        #      #    #      #  #
   //  ##            ###    ###    ###    ###   #  #


  $('.c').click(function() {

      // event.preventDefault();
      unit = 'metric';
      $('.c').addClass('active-unit');
      $('.f').removeClass('active-unit');
      $('.search').trigger('click');
      $('.unit-display').html('&deg;C');

      var fDegree = $('.tempr-content').html();
      var cDegree = Math.round((fDegree - 32) * 5 / 9);
      $('.tempr-content').html(cDegree);

      var tempF1max   = $('#tempr1').html();
      var tempToC1max = Math.round((tempF1max - 32) * 5 / 9);
      $('#tempr1').html(tempToC1max);

      var tempF1min   = $('#min1').html();
      var tempToC1min = Math.round((tempF1min - 32) * 5 / 9);
      $('#min1').html(tempToC1max);

      var tempF2max   = $('#tempr2').html();
      var tempToC2max = Math.round((tempF2max - 32) * 5 / 9);
      $('#tempr2').html(tempToC2max);

      var tempF2min   = $('#min2').html();
      var tempToC2min = Math.round((tempF2min - 32) * 5 / 9);
      $('#min2').html(tempToC2max);

      var tempF3max   = $('#tempr3').html();
      var tempToC3max = Math.round((tempF3max - 32) * 5 / 9);
      $('#tempr3').html(tempToC3max);

      var tempF3min   = $('#min3').html();
      var tempToC3min = Math.round((tempF3min - 32) * 5 / 9);
      $('#min3').html(tempToC3max);

      var tempF4max   = $('#tempr4').html();
      var tempToC4max = Math.round((tempF4max - 32) * 5 / 9);
      $('#tempr4').html(tempToC4max);

      var tempF4min   = $('#min4').html();
      var tempToC4min = Math.round((tempF4min - 32) * 5 / 9);
      $('#min4').html(tempToC4max);

      var tempF5max   = $('#tempr5').html();
      var tempToC5max = Math.round((tempF5max - 32) * 5 / 9);
      $('#tempr5').html(tempToC5max);

      var tempF5min   = $('#min5').html();
      var tempToC5min = Math.round((tempF5min - 32) * 5 / 9);
      $('#min5').html(tempToC5max);
  });

  $('.f').click(function() {
      // event.preventDefault();
      unit = 'imperial';
      $('.f').addClass('active-unit');
      $('.c').removeClass('active-unit');
      $('.unit-display').html('&deg;F');
      // console.log('funit='+unit);
      $('.search').trigger('click');

      var cDegree = $('.tempr-content').html();
      var fDegree = Math.round((cDegree * 9 / 5) - 32);
      $('.tempr-content').html(fDegree);

      var tempC1max   = $('#tempr1').html();
      var tempToF1max = Math.round((tempC1max * 9 / 5) + 32);
      $('#tempr1').html(tempToF1max);

      var tempC1min   = $('#min1').html();
      var tempToF1min = Math.round((tempC1min * 9 / 5) + 32);
      $('#min1').html(tempToF1min);

      var tempC2max   = $('#tempr2').html();
      var tempToF2max = Math.round((tempC2max * 9 / 5) + 32);
      $('#tempr2').html(tempToF2max);

      var tempC2min   = $('#min2').html();
      var tempToF2min = Math.round((tempC2min * 9 / 5) + 32);
      $('#min2').html(tempToF2min);

      var tempC3max   = $('#tempr3').html();
      var tempToF3max = Math.round((tempC3max * 9 / 5) + 32);
      $('#tempr3').html(tempToF3max);

      var tempC3min   = $('#min3').html();
      var tempToF3min = Math.round((tempC3min * 9 / 5) + 32);
      $('#min3').html(tempToF3min);

      var tempC4max   = $('#tempr4').html();
      var tempToF4max = Math.round((tempC4max * 9 / 5) + 32);
      $('#tempr4').html(tempToF4max);

      var tempC4min   = $('#min4').html();
      var tempToF4min = Math.round((tempC4min * 9 / 5) + 32);
      $('#min4').html(tempToF4min);

      var tempC5max   = $('#tempr5').html();
      var tempToF5max = Math.round((tempC5max * 9 / 5) + 32);
      $('#tempr5').html(tempToF5max);

      var tempC5min   = $('#min5').html();
      var tempToF5min = Math.round((tempC5min * 9 / 5) + 32);
      $('#min5').html(tempToF5min);
  });

  $(".search-text").on('click', function() {
      $(this).select();
  });

  // get geoIP and run >>> { working well }
  var time_url = "http://freegeoip.net/json/";
  // var time_url = "http://api.hostip.info/get_json.php";
  $.ajax({
    url: time_url,
    dataType: 'jsonp',
    success: function(api,city){
      city = api.city;
      regionCode = api.region_code;
      // $('.search-text').val(city + ',' + regionCode); // this line for freegeoip.net/json/
      $('.search-text').val(city);
      $('.search').trigger('click');
    }
  })

  //                                #     ###    #                      ##     #          #
  //                                #     #  #   #                       #                #
  //  ###    ##    ###  ###    ##   ###   ###   ###   ###          ##    #    ##     ##   # #
  // ##     # ##  #  #  #  #  #     #  #  #  #   #    #  #        #      #     #    #     ##
  //   ##   ##    # ##  #     #     #  #  #  #   #    #  #        #      #     #    #     # #
  // ###     ##    # #  #      ##   #  #  ###     ##  #  #         ##   ###   ###    ##   #  #


  $('.search').click(function(unit) {
    // $('.clear').css({'opacity':'1','cursor':'pointer'});
    $('.clear').on('click',function(){
        localStorage.clear();
        $('.right').children('*').remove();
        $('.clear').css({'opacity':'.4','cursor':'default'});
      });
    $('.clear320').on('click',function(){
        localStorage.clear();
        $('.right').children('.ftr').remove();
        $('.clear320').css({'opacity':'.4','cursor':'default'});
      });

      city = $(".search-text").val();
      // if ($('.c').hasClass('active-unit')) {
      //   unit = 'metric';
      //   dUnit = '&degC';
      // } else if ($('.f').hasClass('active-unit')) {
      //   unit = 'imperial';
      //   dUnit = '&degF';
      // }

      city = city.toLowerCase().replace(/\b[a-z]/g, function(letter) {
          return letter.toUpperCase(/\$/ig);
      });

      $('.city-content').html(city);
      // http://api.wunderground.com/api/37a973906ebb585b/hourly/q/CA/San_Francisco.json
      // var url1 = 'http://api.wunderground.com/api/37a973906ebb585b/forecast10day/q/'+city+'.json';
      // var url1 = 'http://api.wunderground.com/api/421a546215832f2b/forecast10day/q/'+city+'.json';
      // var url1 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + unit + "&APPID=d27fd46999272898331a73fbae0cc021";
      var url1 = "child/data/lynnwood.json";


      $.when(
        $.get("/feature/", function(html) {
          globalStore.html = html;
        }),

      ).then(function(){

      });


      $.ajax({
              url      : url1,
              type     : 'get',dataType : 'json',
              // dataType: 'jsonp',
        success:  function(data) {
          var sc        = data.forecast.simpleforecast.forecastday[0]
            , s         = data.forecast.simpleforecast
            , max       = s.forecastday[0].high.fahrenheit
            , min       = s.forecastday[0].low.fahrenheit
            , wind      = s.forecastday[0].maxwind.mph
            , humidity  = s.forecastday[0].avehumidity
            , condition = s.forecastday[0].conditions
            , icon      = s.forecastday[0].icon
            , pop       = s.forecastday[0].pop
            , clow      = s.forecastday[0].low.celsius
            , chigh     = s.forecastday[0].high.celsius
            ;

            console.log('clow:  ' + clow);
            console.log('chigh:  ' + chigh);

            // if(icon.indexOf('rain'||'snow'||'tstorms'||'partly')>-1){
            //   $('.pop').remove();
            //   $('.condition-wrapper').append("<p class='pop' style='color: white'>"+pop+"%</p>");
            //   console.log('change: '+ pop+'%');
            // }
            // else{
            //   $('.pop').remove();
            // }
            if (condition == 'Chance of Rain'){
              $('.condition').css({'font-size': '.9em'});
            }

            // console.log('ico '+ pop);
            $('.condition').html(condition);
            $('.tempr-content').html(max);
            $('.min').html(min);
            $('.pop').html("<p class='wind-text' style='font-weight:400'>Change of Rain </p>" +"<p class='wind-value'>"+ "<span class='wind-number'>"+humidity+"</span>" + "<span class='wind-unit' style='font-weight:400;font-size:0.7em;'> %</span></p>");
            // var popText = "<p></p>";
            // $('.pop').html();

            // $('.condition-icon').attr('src',icon);

            tempNextDayMax      = [];
            tempNextDayMin      = [];
            tempNextDayCond     = [];
            tempNextDayWind     = [];
            tempNextDayHumidity = [];
            tempNextDayPressure = [];
            for (x =0; x<=4;x++){
              tempNextDayMax[x]      =  s.forecastday[x].high.fahrenheit;
              tempNextDayMin[x]      =  s.forecastday[x].low.fahrenheit;
              tempNextDayCond[x]     = s.forecastday[x].conditions;
              tempNextDayWind[x]     = s.forecastday[x].maxwind.mph;
              tempNextDayHumidity[x] =  s.forecastday[x].avehumidity;

              tempNextDayMax.push(tempNextDayMax[x]);
              tempNextDayMin.push(tempNextDayMax[x]);
              tempNextDayCond.push(tempNextDayCond[x]);
              tempNextDayWind.push(tempNextDayWind[x]);
              tempNextDayHumidity.push(tempNextDayHumidity[x]);
            }

            console.log('tempNextDayMax2: ' + tempNextDayMax[1]);
            console.log('tempNextDayMin2: ' + tempNextDayMin[1]);
            console.log('tempNextDaycond2: ' + tempNextDayCond[1]);
            console.log('tempNextDayMax2: ' + tempNextDayWind[1]);

            if (icon.indexOf('clear')>-1) {
                $('.condition-icon').attr('src', 'child/img/sun.png').css('opacity', '1');
            } else if (icon.indexOf('rain')>-1) {
                $('.condition-icon').attr('src', 'child/img/weather_rain.png').css('opacity', '1');
                $('.daynight').css({'filter': 'blur(5px)'});
            } else if (icon.indexOf('snow')>-1) {

                $('.condition-icon').attr('src', 'child/img/weather_snow.png').css('opacity', '1');
            } else if (icon.indexOf('partlycloudy')>-1) {
                $('.condition-icon').attr('src', 'child/img/sun.png').css('opacity', '.2');
            }
            else if (icon.indexOf('tstorms')>-1) {
              // $('.condition').css({'font-size':'1.9em','line-height': '25px', 'top':'95px'});
              $('.condition-icon').attr('src', 'child/img/icon/w_sun.svg').css('opacity', '1');
            }
            else if (icon.indexOf('sun')>-1) {
              $('.condition-icon').attr('src', 'child/img/icon/sun.svg').css('opacity', '1');
            }
            else{
              // $('.condition-icon').attr('src', 'child/img/weather_cloud-01.png').css('opacity', '.2');
              console.log('design icon later');
            }

            var city = $('.search-text').val();
            var url2 = 'http://api.worldweatheronline.com/free/v1/tz.ashx?q=' + city + '&format=json&key=j7cf7epyawudqvbkf3cvc7r2';
            // console.log('url2 = '+city);
            $.ajax({
              url: url2,
              dataType: 'jsonp',
              success: function(res) {
                  var localTime   = res.data.time_zone[0].localtime;
                  var timeSliced  = localTime.replace(/\d+-\d+-\d+\s/g, '');
                  var today       = localTime.replace(/\s\d+:\d\d/g, '').replace('2014-', '') + '-2014';
                  var hour        = parseInt(localTime.replace(/\d+-\d+-\d+\s/g, '').replace(/(:\d+)/g, ''));
                  var monthNum    = parseInt(today.replace(/-\d+-\d+/g, ''));
                  var monthChar;
                  var dateOfMonth = parseInt(today.replace('-2014', '').replace(/\d+-/g, ''));
                  var year        = parseInt(today.replace(/\d+-/g, ''));
                  var th;

                  if (dateOfMonth == 1 || dateOfMonth == 21 || dateOfMonth == 31) {
                      th = '<sup>st</sup>';
                  }
                  if (dateOfMonth == 2 || dateOfMonth == 22) {
                      th = '<sup>nd</sup>';
                  }
                  if (dateOfMonth == 3 || dateOfMonth == 23) {
                      th = '<sup>rd</sup>';
                  }
                  if (dateOfMonth > 3 && dateOfMonth < 21) {
                      th = '<sup>th</sup>';
                  }
                  if (dateOfMonth > 23 && dateOfMonth < 31) {
                      th = '<sup>th</sup>';
                  }

                  // console.log('dayofmonth=='+dateOfMonth);
                  switch (monthNum) {
                      case 01:
                          monthChar = 'Jan.';
                          break;
                      case 02:
                          monthChar = 'Feb.';
                          break;
                      case 03:
                          monthChar = 'Mar.';
                          break;
                      case 04:
                          monthChar = 'Apr.';
                          break;
                      case 05:
                          monthChar = 'May.';
                          break;
                      case 06:
                          monthChar = 'Jun.';
                          break;
                      case 07:
                          monthChar = 'Jul.';
                          break;
                      case 08:
                          monthChar = 'Aug.';
                          break;
                      case 09:
                          monthChar = 'Sep.';
                          break;
                      case 10:
                          monthChar = 'Oct.';
                          break;
                      case 11:
                          monthChar = 'Nov.';
                          break;
                      default:
                          monthChar = 'Dec.';
                          break;
                  }

                  var currentTime = new Date();
                  currentTime.setDate(dateOfMonth);
                  var dateParsed = currentTime.toDateString();
                  var dateSliced = dateParsed.replace(/\s\w+/g, '').toString();
                  // function callDate(dateSliced){
                  switch (dateSliced) {
                      case 'Mon':
                          dateSliced = 'Monday';
                          break;
                      case 'Tue':
                          dateSliced = 'Tuesday';
                          break;
                      case 'Wed':
                          dateSliced = 'Wednesday';
                          break;
                      case 'Thu':
                          dateSliced = 'Thursday';
                          break;
                      case 'Fri':
                          dateSliced = 'Friday';
                          break;
                      case 'Sat':
                          dateSliced = 'Saturday';
                          break;
                      case 'Sun':
                          dateSliced = 'Sunday';
                          break;
                      default:
                          break;
                  }

                  //next day of the week names
                  var nextDate = new Date();
                  for (i = 1; i <= 5; i++) {
                    nextDate.setDate(dateOfMonth + i);
                    var nextDateSliced = nextDate.toDateString().replace(/\s\w+/g, '').toString();
                    // console.log('newDate = '+newDate);
                    // console.log('dateslice=' + newdateSliced);
                    switch (nextDateSliced) {
                      case 'Mon':
                        nextDateSliced = 'Monday';
                        break;
                      case 'Tue':
                        nextDateSliced = 'Tuesday';
                        break;
                      case 'Wed':
                        nextDateSliced = 'Wednesday';
                        break;
                      case 'Thu':
                        nextDateSliced = 'Thursday';
                        break;
                      case 'Fri':
                        nextDateSliced = 'Friday';
                        break;
                      case 'Sat':
                        nextDateSliced = 'Saturday';
                        break;
                      case 'Sun':
                        nextDateSliced = 'Sunday';
                        break;
                      default:
                        break;
                    }
                  $('#name-d' + i).html(nextDateSliced);
                  }

                  if (hour > 12) {
                    $('.time').html(timeSliced + ' PM');

                  } else {
                    $('.time').html(timeSliced + ' AM');
                  }

                  $('.date').html(dateSliced + ' ' + monthChar + ' ' + "<span style='font-weight: bold'>" + dateOfMonth + th + "</span>" + ' ' + year);
                  // console.log('hour == '+hour);

                  function setOpacity(op) {
                    $('.daynight').css('opacity', op);
                  }
                  if (hour >= 18 && hour < 20) {
                    setOpacity(0.6);
                    $('.chao').html('Good Evening');
                  }
                  if (hour >= 20 && hour < 24) {
                    setOpacity(.8);
                    $('.chao').html('Good Night');
                  }
                  if (hour >= 0 && hour < 7) {
                    setOpacity(.9);
                    $('.chao').html('Good Morning');
                  }
                  if (hour >= 7 && hour < 12) {
                    setOpacity(.1);
                    $('.chao').html('Good Morning');
                  }
                  if (hour >= 12 && hour < 16) {
                    setOpacity(.3);
                    $('.chao').html('Good Afternoon');
                  }
                  if (hour >= 16 && hour < 18) {
                    setOpacity(.5);
                    $('.chao').html('Good Evening');
                    // console.log('Good Evening');
                  }
              }
          })
   //        #                                     #
   //        #                                     #
   //  ##   ###   ###   #  #         ##    ##    ###   ##
   // #      #    #  #  #  #        #     #  #  #  #  # ##
   // #      #    #      # #        #     #  #  #  #  ##
   //  ##     ##  #       #          ##    ##    ###   ##
                        //#


        // var cityVal = $('.city-content').html();
        //     console.log('city val = ' + cityVal);
        //     ctryPattern = /\w+,\s/g;
        //     ctryNotUS = cityVal.replace(ctryPattern,'');
        // // console.log('ctry = ' + ctryNotUS);
        // var ctryJSON = 'child/data/country.json';
        // $.ajax({
        //   url:ctryJSON,
        //   dataType: 'jsonp',
        //   success:function(ctryData){

        //     // var ctryID =
        //     console.log('ctry2 = ' + ctryNotUS);
        //     var ctryIndex = $.inArray(ctryNotUS,ctryData);
        //       // $('.city-content').html(ctryIndex);
        //     var ctryID = ctryData[ctryIndex].name;
        //     console.log('index = ' + ctryIndex);
        //     alert('id='+ctryID);
        //   }
        // })

          var mps = "<span style='font-weight:400;font-size:.5em;'> mph</span>";
          var kmh = "<span style='font-weight:400;font-size:.5em;'> kmh</span>";

          var mpsMain = "<span style='font-weight:400;font-size:.8em;'> mph</span>";
          var kmhMain = "<span style='font-weight:400;font-size:.8em;'> kmh</span>";

          var windMainUnit;
          var windUnit;

          if (unit == 'imperial') {
              windUnit     = mps;
              windMainUnit = mpsMain;
          } else if (unit == 'metric') {
              windUnit     = kmh;
              windMainUnit = kmhMain;
          }

          var ww = $(window).width();
          var wh = $(window).height();
          if (ww == 320 && wh == 480) {
              $('.wind').html("<p class='wind-text' style='font-weight:400'>W: </p>" +"<p class='wind-value'>"+ "<span class='wind-number'>"+wind+"</span>" + "<span class='wind-unit' style='font-weight:400;font-size:0.7em;'> kmh</span></p>");
              $('.humidity').html("<span style='font-weight:400'>H: </span>" + humidity + "<span style='font-weight:400;font-size:.7em;'> %</span>");
          } else {
              $('.clear320').remove();
              $('.wind').html("<p class='wind-text' style='font-weight:400'>Wind </p>" +"<p class='wind-value'>"+ "<span class='wind-number'>"+wind+"</span>" + "<span class='wind-unit' style='font-weight:400;font-size:0.7em;'> mph</span></p>");
              $('.humidity').html("<p class='wind-text' style='font-weight:400'>Humidity </p>" +"<p class='wind-value'>"+ "<span class='wind-number'>"+humidity+"</span>" + "<span class='wind-unit' style='font-weight:400;font-size:0.7em;'> %</span></p>");
          }
          var percent = "<span style='font-weight:400;font-size:.5em;'> %</span>";
          var kpa = "<span style='font-weight:400;font-size:.5em;'> kPa</span>";

          for (i = 1; i<=5;i++){
            $('#n'+i+'dMax').html(tempNextDayMax[i-1]);
            $('#n'+i+'dMin').html(tempNextDayMin[i-1]);
            if(tempNextDayCond[i-1].indexOf('Showers')){
              // if (tempNextDayCond[i-1].indexOf('Showers')){
                var wholeptn = /(\w+)\s(\w+)/gi
                var scndcheckptn = /\s\w+/gi;
                var property;
                // property = tempNextDayCond[i-1].replace(wholeptn,function(letter){
                //   console.log('property z= ' + letter);
                //   console.log('$1:  ' + $1 );
                //   console.log('$2:  ' + $2 );
                //   // $('#n'+i+'dCond').html();
                // });
                property = tempNextDayCond[i-1].replace(wholeptn,"$1 <span class='property'>$2</span>");
              // }
            }
            // $('#n'+i+'dCond').html(tempNextDayCond[i-1]);
            $('#n'+i+'dCond').html(property);
            $('#n'+i+'dWind').html(tempNextDayWind[i-1]+' mph');
            $('#n'+i+'dHumidity').html(tempNextDayHumidity[i-1]+ percent);
          }
       }
      }) //tai day
      $('.search-text').blur();
  });

  var unit = 'imperial';
  var tempArr = [];

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
      console.log('localStorage ftrCount::'+ftrCount);
      var xx  = JSON.parse(localStorage.getItem('cityArr'));
      for (i=0; i<=xx.length-1;i++){
        cityArr.push(xx[i]);
      }
      $('.clear').on('click',function(){
        localStorage.clear();
        $('.right').children('*').remove();
        $('.clear').css({'opacity':'.4','cursor':'default'});
      });
      $('.clear320').on('click',function(){
        localStorage.clear();
        $('.right').children('.ftr').remove();
        $('.clear320').css({'opacity':'.4','cursor':'default'});
      });
    }
    else{
      $('.clear').css({'opacity':'.4','cursor':'default'});
      ftrCount = 0;
      console.log('localStorage ftrCount::'+ftrCount);
    }
      ftrCount++;
      if (ftrCount === 6) {
        return false;
      }
    console.log('ftrCountsss ' + ftrCount);
    cityText = $('.city-content').html();
    createFtr(ftrCount);
    if (ftrCount === 6) {
      return false;
    }
    var temp = parseInt($('.tempr-content').html())
    , minx = parseInt($('.min').html())
    , minCond = $('.condition').html()
    , imgSrc = $('.condition-icon').attr('src');
    ;

    cityArr.push({'city': cityText, 'temp': temp, 'minx': minx, 'minCond': minCond, 'imgSrc': imgSrc});
    localStorage.setItem('cityArr', JSON.stringify(cityArr));
    var value = JSON.parse(localStorage.getItem('cityArr'));
    // console.log('valueeee ' + value);

    //set value for feature windows
    $("#city" + (ftrCount)).html(value[ftrCount - 1].city);
    $("#tempr" + (ftrCount)).html(value[ftrCount - 1].temp);
    $("#min" + (ftrCount)).html(value[ftrCount - 1].minx);
    $("#minCond" + (ftrCount)).html(value[ftrCount - 1].minCond);
    $("#imgSrc" + (ftrCount)).attr('src',imgSrc);
  });

  function createFtr(ftrCount) {
    var ftrDiv       = $('<div class="ftr" id="ftr' + (ftrCount) + '"></div>');
    var cityTitleDiv = $('<div class="city-title" id="city' + (ftrCount) + '"></div>');
    var temprDiv     = $('<div class="tempr" id="tempr' + (ftrCount) + '"></div>');
    var minxDiv      = $('<div class="minx" id="min' + (ftrCount) + '"></div>');
    var minCondDiv   = $('<div class="minCond" id="minCond' + (ftrCount) + '"></div>');
    var imgSrcDiv    = $('<img class="imgSrc" id="imgSrc' + (ftrCount) + '">');

    $('.right').append(ftrDiv);
    ftrDiv.append(cityTitleDiv);
    ftrDiv.append(temprDiv);
    ftrDiv.append(minxDiv);
    ftrDiv.append(minCondDiv);
    ftrDiv.append(imgSrcDiv);

    $('.ftr').each(function() {
      $(this).on('click', function() {
        city = $(this).children('.city-title').html();
        $('.search-text').val(city);
        $('.search').trigger('click');
      });
    });
    $('.clear').css({'opacity':'1','cursor':'pointer'});
  } // END local storage

  function enableAutocomplete() {
      $(".search-text").autocomplete({
          source: function(request, response) {
            $.ajax({
              url: "http://gd.geobytes.com/AutoCompleteCity?callback=?&q=" + request.term,
              dataType: 'jsonp',
              async: true,
              success: function(data) {
                response(data);
              }
            })
          },
          minLength: 3,
          select: function(event, ui) {
            $('.tempr-content').addClass('tempr-content');
            var selectedObj = ui.item;
            //get right syntax string
            var ctryR = /,\s\w+,/gi;
            var notUS = selectedObj.value.replace(ctryR, ',');
            city = notUS;
            //check country outsides U.S.
            var checkCtryR = /^(\w+\s\w+,\s)|\w+,\s/g;
            // WORKS >> ^(\w+\s\w+,\s)|\w+,\s
            var sliceCtry = selectedObj.value.replace(checkCtryR, '');
            // console.log(sliceCtry);
            if (sliceCtry == 'United States') {
                $(".search-text").val(selectedObj.value.replace(", United States", ""));
            } else {
                $('.search-text').val(notUS);
                console.log(notUS);
                // ctryPattern = /\w+,\s/g;
                // ctryNotUS = notUS.replace(ctryPattern,'');
                // console.log('ctrynotus = ' + ctryNotUS);
                // var ctryJSON = 'child/data/country.json';
                // $.getJSON(ctryJSON,function(ctryData){
                //   // var ctryID =
                //   var ctryIndex = $.inArray(ctryNotUS,ctryData);
                //     // $('.city-content').html(ctryIndex);
                //   var ctryID = ctryData[ctryIndex].id;
                //   notUS = ctryID;
                // });
            }
            $('.search').trigger('click');
            return false;
          }
      });
  }

   enableAutocomplete();
  $(".search-text").autocomplete("option", "delay", 150);

}); // END OF FILE
