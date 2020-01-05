var posters = [];
var teasers = [];
var upcomings = [];
var k = 0;
var tchk = 0;
var nowchk = 0;
var upcom = 0;
var teasersWidth = window.innerWidth * 3/4;
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() +1;
var yyyy = today.getFullYear();

dd = dd -1;

var wd = dd -6;
if(dd < 10){
    dd = '0' + dd;
}
var wm = mm;
if(mm < 10){
    mm = '0' + mm;
}
today = yyyy+''+mm+dd;


var weekdate = "20191229";

$(document).ready(function(){
    var url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=" + today;
    $.ajax({
		url : url,
		type : "GET",
		cache : false,
		success : function(data, status){
			if(status == "success") getBoxOffice(data);
		}
    }); 

    var url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchWeeklyBoxOfficeList.json?key=430156241533f1d058c603178cc3ca0e&targetDt=" + weekdate;
    $.ajax({
		url : url,
		type : "GET",
		cache : false,
		success : function(data, status){
			if(status == "success") getWeekBoxOffice(data);
		}
    }); 

    var url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=430156241533f1d058c603178cc3ca0e&openStartDt=2020";

    $.ajax({
		url : url,
		type : "GET",
		cache : false,
		success : function(data, status){
			if(status == "success") getUpcoming(data);
		}
    }); 

    var url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=430156241533f1d058c603178cc3ca0e&openStartDt=2020&curPage=2";
    $.ajax({
		url : url,
		type : "GET",
		cache : false,
		success : function(data, status){
			if(status == "success") getUpcoming(data);
		}
    }); 
    $('#showNowIn').click(function(){
        $("#upComing").css("display", "none");
        $("#nowIn").css("display", "inline-block");
    });
    
    $('#showUpComing').click(function(){
        $("#upComing").css("display", "inline-block");
        $("#nowIn").css("display", "none");
    });
});

function doNowIn() {
    jQuery("#nowIn").srolling({
      data : posters,
      auto : true,
      item_count : 1, 
      cache_count : 10, 
      width:  200,
      height : 280,
      delay : 1000,
      delay_frame : 1000,
      move : 'left',
      prev : '#leftBtn',
      next : '#rightBtn',
    });
}; 

function doUpcoming() {
    jQuery("#upComing").srolling({
      data : upcomings,
      auto : true,
      item_count : 1, 
      cache_count : 10, 
      width:  200,
      height : 280,
      delay : 1000,
      delay_frame : 1000,
      move : 'left',
      prev : '#leftBtn',
      next : '#rightBtn',
    });
}; 

function doTeaser() {
    jQuery("#Teasers").srolling({
      data : teasers,
      auto : true,
      item_count : 1, 
      cache_count : 10, 
      width:  900,
      height : 500,
      delay : 5000,
      delay_frame : 500,
      move : 'left',
      prev : '#leftBtn',
      next : '#rightBtn',
    });
}; 

function getBoxOffice(jsonObj){
    var arr = jsonObj.boxOfficeResult.dailyBoxOfficeList;
    
    var boxrank = "";
    var moneyRankN = new Array();
    var moneyRankM = new Array();
    for(var i = 0; i < 10; i ++){
        
        boxrank += "<li>";
        boxrank += 1+i+"위 ";
        boxrank += arr[i].movieNm;
        moneyRankN[i] = arr[i].movieNm;
        moneyRankM[i] = arr[i].salesAcc;
        getRankPoster(arr[i].movieNm, i);
        boxrank += "</li>";
    }
    $("#boxrank").html(boxrank);

    for(var j=0; j < 9; j++){
        for(var k=0; k < 9 - j ; k ++){
            var mk = moneyRankM[k];
            mk *= 1;
            var n = k + 1;
            var mk1 = moneyRankM[n];
            mk1 *= 1;
            if(mk < mk1){
                var tempM = moneyRankM[k];
                moneyRankM[k] =  moneyRankM[n];
                moneyRankM[n] = tempM;
                var tempN = moneyRankN[k];
                moneyRankN[k] = moneyRankN[n];
                moneyRankN[n] = tempN;
            }
        }
    }
    var rankAudience = "";
    for(var l = 0; l < 10; l ++){
        rankAudience += "<li>";
        rankAudience += 1+l+"위 ";
        rankAudience += moneyRankN[l];
        rankAudience += "   총 매출액 : "
        rankAudience += numberWithCommas(moneyRankM[l]);
        rankAudience += "원";
        rankAudience += "</li>";
    }
    $("#rankAudience").html(rankAudience);
}

function getWeekBoxOffice(jsonObj){
    var arr = jsonObj.boxOfficeResult.weeklyBoxOfficeList;
    
    var boxrank = "";
    for(var i = 0; i < 10; i ++){
        boxrank += "<li>";
        boxrank += 1+i+"위 ";
        boxrank += arr[i].movieNm;
        boxrank += "    주말관객수 : "
        boxrank += arr[i].audiCnt;
        boxrank += "명";
        boxrank += "</li>";
    }
    $("#weekRanking").html(boxrank);
}

function getRankPoster(movieName, rank){
    checkMovieName = movieName.split(" ")[0];
    var url = "https://api.themoviedb.org/3/search/movie?api_key=55d244c83c49693b6fd6606c768103eb&language=ko-KR&query=" + checkMovieName +"&include_adult=false";
    $.ajax({
		url : url,
		type : "GET",
		cache : false,
		success : function(data, status){
			if(status == "success") getPoster(data, movieName, rank);
		}
    }); 
    
};

function getPoster(jsonObj, movieName, rank){
    var arr = jsonObj.results;
    var poster;
    var vote;
    for(var i = 0; i < arr.length; i++){
        if(((arr[i].title) == (movieName)) || (((arr[i].title).toLowerCase().split(" ").join("")).match(movieName.toLowerCase().split(" ").join(""))) ){
            poster =  arr[i].poster_path;
            vote = arr[i].vote_average;
            getTeaserId(arr[i].id, arr[i].title, rank);
            break;
        }
    }
    if(poster == null){
        poster = arr[0].poster_path;
        vote = arr[0].vote_average;
        getTeaser(arr[0].id, arr[0].title);
    }

        posters[rank] = "<img src='http://image.tmdb.org/t/p/w500" + poster +"' width='200px' height='280px' id='rankposter" + rank + ">";
        nowchk ++;
        if(nowchk == 10){
            doNowIn();
        }
    
};

function getTeaserId(id, movieName, rank){
    
    var url = "https://api.themoviedb.org/3/movie/" + id + "/videos?api_key=55d244c83c49693b6fd6606c768103eb&language=ko-KR";
    $.ajax({
		url : url,
		type : "GET",
		cache : false,
		success : function(data, status){
			if(status == "success") getTeaser(data, movieName, rank);
		}
    }); 
}

function getTeaser(data, movieName, rank){
    var arr = data.results;
    var teaser;
    if(arr != undefined){
        for(var i = 0; i < arr.length; i ++){
            if(arr[i].name.match("메인")){
                teaser = arr[i].key;
                break;
            }
        }
        
        if(teaser == null){
            for(var i = 0; i < arr.length; i ++){
                if(arr[i].name.match("예고편")){
                    teaser = arr[i].key;
                    break;
                }
            }
        }
        if(teaser != null){""
        teasers[k] = '<iframe width="900px"  height="500px" src="https://www.youtube.com/embed/' + teaser +  '" frameborder="0" allowfullscreen></iframe>';
        k ++;
        }
        tchk ++;
    }else{
        tchk ++;
    }

    if(tchk == 10){
        doUpcoming();
        doTeaser();
    }
}

function getUpcoming(jsonObj) {
    var arr = jsonObj.movieListResult.movieList;
    for(var i = 0; i < arr.length; i++){
        if(arr[i].openDt > today){
            getUpcomingPoster(arr[i].movieNm);
        }
    }
}

function getUpcomingPoster(movieName){
    checkMovieName = movieName.split(" ")[0];
    var url = "https://api.themoviedb.org/3/search/movie?api_key=55d244c83c49693b6fd6606c768103eb&language=ko-KR&query=" + checkMovieName +"&include_adult=false";
    $.ajax({
		url : url,
		type : "GET",
		cache : false,
		success : function(data, status){
			if(status == "success") getUpcomingPosters(data, movieName);
		}
    }); 
}

function getUpcomingPosters(data, movieName){
    var arr = data.results;
    var poster;
    var vote;
    var releasedate;
    for(var i = 0; i < arr.length; i++){
        if(( (arr[i].title) == (movieName) ) || (((arr[i].title).toLowerCase().split(" ").join("")).match(movieName.toLowerCase().split(" ").join(""))) ){
                if(releasedate == null) releasedate = arr[i].release_date;
                
                if(arr[i].release_date >= releasedate){
                    releasedate = arr[i].release_date;
                    poster =  arr[i].poster_path;
                }
            
            
        }
    }
    
    if(poster != null){
        upcomings[upcom] = "<img src='http://image.tmdb.org/t/p/w500" + poster +"' width='200px' height='280px'>";
        upcom++;
        
    }
    
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}