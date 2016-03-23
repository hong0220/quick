$(function () {
    $(".wenzi ul").hide();
    $(".wenzi .kd").click(function () {
        $(".wenzi ul").hide();
        $(this).next("li").children('ul').slideDown();
        excuteNLPIR($.trim($(this).attr("val")));
    });

    $(".wenzi .kd").hover(
        function () {
            $(this).addClass("bg");
        },

        function () {
            $(this).removeClass("bg");
        }
    );

    $(".wenzi .btn").click(function () {
        $(".wenzi ul").hide();
        excuteNLPIR($.trim($(this).attr("val")));
    });


});

function excuteNLPIR(id) {
    var content = $.trim($("#content").val());
    if (content.length > 3000) {
        alert("输入的文字上限为：3000");
        return;
    }
    var params = {"id": id, "content": content};
    var nMaxKeyLimit = 100;
    if (id == "keywords") {
        nMaxKeyLimit = $.trim($("#nMaxKeyLimit_keywords").val());
    } else if (id == 'summary') {
        nMaxKeyLimit = $.trim($("#nMaxKeyLimit_summary").val());
    } else if (id == 'newwords') {
        nMaxKeyLimit = $.trim($("#nMaxKeyLimit_newwords").val());
    }

    if (nMaxKeyLimit == "" || isNaN(nMaxKeyLimit)) {
        alert("请输入有效数字");
        return;
    }
    params.nMaxKeyLimit = nMaxKeyLimit;
    $.post("index/getAllContent.do", params, function (data) {
        var json = eval('(' + data + ')');
        var al = json;
        if (id == "docExtrator") {
            return;
        } else if (id == "summary") {
            $("#result").val(al[0]);
        } else if (id == "nlpir") {
            var value = "抽取的人名：" + al[1] + "\r\n" +
                "抽取的地名：" + al[2] + "\r\n" +
                "抽取的机构名:" + al[3] + "\r\n" +
                "抽取的关键词：" + al[4] + "\r\n" +
                "抽取的中心人物：" + al[5] + "\r\n" +
                "抽取的媒体：" + al[6] + "\r\n" +
                "抽取的国家：" + al[7] + "\r\n" +
                "抽取的省份：" + al[8] + "\r\n" +
                "抽取的摘要：" + al[9] + "\r\n" +
                "文章情感值：" + al[10] + "\r\n";
            $("#result").val(value);
        } else {
            $("#result").val(al);
        }
        ;
    });

}


