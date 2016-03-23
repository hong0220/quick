var dataset = [];
var title = [];

//获取url的get值
var $_GET = (function () {
    var url = window.document.location.href.toString();
    var u = url.split("?");
    if (typeof(u[1]) == "string") {
        u = u[1].split("&");
        var get = {};
        for (var i in u) {
            var j = u[i].split("=");
            get[j[0]] = j[1];
        }
        return get;
    } else {
        return {};
    }
})();

var num = $_GET['page'];
if (num == undefined) {
    num = 0;
} else {
    if (num < 0) {
        alert("已是第一条记录");
        num = 0;
    }
    if (num > 19) {
        alert("已是最后一条记录");
        num = 19;
    }
}

function chart(num) {

    $.ajaxSettings.async = false;
    $.getJSON("data.json", function (data) {
        $.each(data[num], function (key, value) {
            if (key != "http" && key != 't.cn') {
                title.push(key);
                dataset.push(value.toFixed(6));
            }
        });
    });

    var width = 1200;    //设置图表宽度
    var height = 800;    //设置图表高度

    /*
     for(var i = 0; i < num ; i++){
     var tempnum = Math.floor( Math.random() * 50 );   // 目前随机返回 0~49整数,我们要注入自己的数据
     dataset.push(tempnum);     //插入我们之前设置好的dataset数组
     title.push("关键词"+i);
     }
     */

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);     //建立SVG,输入图表大小


    //绘制坐标轴
    var xAxisScale = d3.scale.ordinal()              //scale为比例尺,domain为定义域,range值域
        .domain(d3.range(dataset.length))   //定义域[0,15],值域[0,500],比例函数： y = 33.3x;
        .rangeRoundBands([0, 500]);
    //.rangeRoundBands([0,1100]);

    var yAxisScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([500, 0]);
    //.range([700,0]);

    var xAxis = d3.svg.axis()    //定义x坐标轴
        .scale(xAxisScale)   //使用之前定义好的比例尺
        .orient("bottom");   //置于底部

    var yAxis = d3.svg.axis()
        .scale(yAxisScale)
        .orient("left");

    //绘制柱状图
    var xScale = d3.scale.ordinal()
        .domain(d3.range(dataset.length))
        .rangeRoundBands([0, 500], 0.05);    //??(500 - 0.05 * 15)/15 = 33.3
    //.rangeRoundBands([0,1100],0.1);
    /*  参数0.05为柱与柱之间的间隔
     We’ll also be using rangeRoundBands to divide the width across the chart bars.
     We’ll modify the xRange using ordinal scale and rangeRoundBands as shown below.
     Notice that we have also set the spacing between the bars to 0.05.
     */

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([0, 500]);
    //.range([0,700]);

    //绘制柱形图
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        //x,y为在页面上的定位
        .attr("x", function (d, i) {
            return 400 + xScale(i);
        })
        .attr("y", function (d, i) {
            return 50 + 500 - yScale(d);
            //return 50 + 700 - yScale(d) ;
        })
        //柱的高度与宽度
        .attr("width", function (d, i) {
            return xScale.rangeBand();
        })
        .attr("height", yScale)
        .attr("fill", "green");   //改变颜色

    //添加柱状图中的字
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .attr("x", function (d, i) {
            return 400 + xScale(i);
        })
        .attr("y", function (d, i) {
            return 50 + 500 - yScale(d);
            //return 50 + 700 - yScale(d) ;
        })
        .attr("dx", function (d, i) {
            return xScale.rangeBand() / 12;
        })
        .attr("dy", 15)
        .attr("text-anchor", "begin")
        .attr("font-size", 12)
        .attr("fill", "white")
        .text(function (d, i) {
            return d;
        });

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(400,550)")
        //.attr("transform","translate(30,750)")
        .call(xAxis)
        .selectAll("text")
        .text(function (d) {
            return title[d];
        });

    svg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(400,50)")
        .call(yAxis);
}

chart(num);

// 监听函数
$("#next").bind("click", function () {
    num++;
    location = "index.html?page=" + num;
});

// 监听函数
$("#pre").bind("click", function () {
    num--;
    location = "index.html?page=" + num;
});

