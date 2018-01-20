// 获取所有的城市
let citys,weatherobj;

// 用的是jquery库里边的东西
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	// 请求类型的数据
	dataType:"jsonp",
	success:function(obj){
		citys = obj.data;
		// console.log(citys);
		for(let i in citys){
			// console.log(i);
			let section=document.createElement('section');
			let citys_title=document.createElement('h1');
			citys_title.className="citys_title";
			citys_title.innerHTML=i;
			section.appendChild(citys_title);
			for(let j in citys[i]){
				let city_list=document.createElement('ul');
				city_list.className='city_list';
				let li=document.createElement('li');
				li.innerHTML=j;
				city_list.appendChild(li);
				section.appendChild(city_list);

			}
			$(".citys_box").append(section);
		}
	}
})
$.getScript("https://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",function(){
    // getFullWeather(remote_ip_info.city);
    getFullWeather("太原");
});
// 获取当前城市所有的天气信息
function getFullWeather(nowcity){
	$(".now_city").html(nowcity);
	// 获取当前城市的天气信息
	$.ajax({
		url:"https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
		dataType:'jsonp',
		// 请dat_high_temperature
		success:function(obj){
			weatherobj = obj.data;
			console.log(weatherobj);
			// 当前的空气质量
			 $(".now_air_quality").html(weatherobj.weather.quality_level);
			 // 当前的气温
			 $(".now_temp_temp").html(weatherobj.weather.current_temperature);
			 // 当前的风向
			 $(".now_wind").html(weatherobj.weather.wind_direction);
			 // 当前的天气
			 $(".now_weather").html(weatherobj.weather.current_condition);
			 // 当前的风级
			 $(".now_wind_level").html(weatherobj.weather.wind_level+"级");
			 // 近期两天的天气情况
			 // 今天的信息
			 $(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
			 $(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
			 $(".today_weather").html(weatherobj.weather.dat_condition);
			 $(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");
			 // 明天的信息
			 $(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
			 $(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
			 $(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);
			 $(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");
			 let hours_array=weatherobj.weather.hourly_forecast;
			 for(let i=0;i<hours_array.length;i++){
				 	let hours_list=document.createElement('li');
				 	let hours_time=document.createElement('span');
				 	hours_time.className='hours_time';

				 	let hours_img=document.createElement('img');
				 	hours_img.className='hours_img';

				 	let hours_temp=document.createElement('span');
				 	hours_temp.className='hours_temp';

				 	hours_list.appendChild(hours_time);
				 	hours_list.append(hours_img);
				 	hours_list.appendChild(hours_temp);

				 	$('.hours_content').append(hours_list);
				 	// 当下的时间
				 	hours_time.innerHTML=hours_array[i].hour+":00";
				 	hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
				 	hours_temp.innerHTML=hours_array[i].temperature+"°";

				 }
			 let dates_array=weatherobj.weather.forecast_list;
			 for(let j=0;j<dates_array.length;j++){
				 	let dates_list=document.createElement('li');
				 	let dates_day=document.createElement('span');
				 	dates_day.className='dates_day';

				 	let dates_weather=document.createElement('span');
				 	dates_weather.className='dates_weather';

				 	let dates_img=document.createElement('img');
				 	dates_img.className='dates_img';

				 	let dates_temp_max=document.createElement('span');
				 	dates_temp_max.className='dates_temp_max';

				 	let dates_temp_min=document.createElement('span');
				 	dates_temp_min.className='dates_temp_min';

				 	let now_wind=document.createElement('span');
				 	now_wind.className='now_wind';

				 	let now_wind_level=document.createElement('span');
				 	now_wind_level.className='now_wind_level';


				 	dates_list.appendChild(dates_day);
				 	dates_list.append(dates_weather);
				 	dates_list.appendChild(dates_img);
				 	dates_list.appendChild(dates_temp_max);
				 	dates_list.appendChild(dates_temp_min);
				 	dates_list.appendChild(now_wind);
				 	dates_list.appendChild(now_wind_level);
				 	$('.dates_content').append(dates_list);
				 	
				 	dates_day.innerHTML = dates_array[j].date.substring(5,7)+"/"+dates_array[j].date.substring(8);
				 	dates_weather.innerHTML=dates_array[j].condition;
				 	dates_img.setAttribute('src',"img/"+dates_array[j].weather_icon_id+".png");
				 	dates_temp_max.innerHTML=dates_array[j].high_temperature+"°";
				 	dates_temp_min.innerHTML=dates_array[j].low_temperature+"°";
				 	now_wind.innerHTML=dates_array[j].wind_direction;
	 				now_wind_level.innerHTML=dates_array[j].wind_level+"级";

		}
		 	
	}
})

}
$(function(){
	$(".now_city").on("click",function(){
		$(".search").val("");
		$(".confirm").html('取消');
		$(".citys").css("display","block");
	})
	
	// 事件委派
	 $("body").delegate(".city_list li", "click", function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	 })

	 $("body").delegate(".citys_title", "click", function() {
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	 })

	
	$(".search").on("focus",function(){
		$(".confirm").html('确认');
	})

	$(".confirm").on("click",function(){
		if(this.innerText=="取消"){
			$(".citys").css("display","none");
			
		}else if(this.innerText=="确认"){
			let text=$(".search").val();
			for(let i in citys){
				if(text==i){
					getFullWeather(text);
					$(".citys").css("display","none");
					return;

				}else{
					for(let j in citys[i]){
						if(text==j){
							getFullWeather(text);
							$(".citys").css("display","none");
							return;
						}
					}
				}

			}
			alert("输入地区有误");
			$(".search").val("");
			$(".confirm").html('取消');

		}
	})
	
})

	
