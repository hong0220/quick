var ComponentsDropdowns = function () {

    var handleSelect2 = function () {

        var select = $("#select2_sample2").select2({
            placeholder: "Select...",
            allowClear: true,
            minimumInputLength: 1,
            query: function (query) {
                $.ajax({
                    type: "get",
                    url: "json.txt",
                    dataType: "json",
                    success: function (jsonText) {
                        var data = {
                            results: []
                        }, s;
                        s = "hello";
                        data.results.push({
                            id: query.term + 1,
                            text: query.term + s
                        });
                        query.callback(data);
                    },
                    error: function () {
                    }
                });
            }
        });

        // 初始化多个值
        /*var data1 = [{id: 0, text: 'story'}, {id: 1, text: 'bug'}, {id: 2, text: 'task'}];
         var data2 = [{id: 0, text: 'content'}, {id: 1, text: 'job'}, {id: 2, text: 'test'}];
         // init for first data source
         initSelect2Input(data1);
         // destroy for new data soruce init!
         $('#select2_sample3').select2('destroy');
         // init for secound data source
         initSelect2Input(data2);*/

        //添加且选中
        select.select2("data", {id: "CA", text: "California"});
    }

    function initSelect2Input(data) {
        $('#select2_sample3').select2({
            placeholder: "Select report type",
            allowClear: true,
            data: data
        });
    }

    return {
        //main function to initiate the module
        init: function () {
            handleSelect2();
        }
    };
}();