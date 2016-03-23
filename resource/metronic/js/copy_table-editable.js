var TableEditable = function () {
    var handleTable = function () {
        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }
            oTable.fnDraw();
        }

        // 编辑状态
        function editRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

//            jqTds[0].innerHTML = '<input id="aaa" class="js-example-programmatic js-states form-control" value="' + aData[0] + '">';
            jqTds[0].innerHTML = '<a href="#" id="country" data-type="select2" data-pk="1" data-value="BS" data-original-title="Select country" class="editable editable-click">Bahamas</a>';
            jqTds[1].innerHTML = '<a  id="country" data-type="select2" data-pk="1" data-value="BS" data-original-title="Select country" class="editable editable-click">Bahamas</a>';


//            jqTds[0].innerHTML = '<select type="text" id="aaa" class="form-control select2" value="' + aData[0] + '"><option value ="volvo">Volvo</option><option value ="saab">Saab</option<option value="opel">Opel</option><option value="audi">Audi</option></select>';
//            jqTds[1].innerHTML = '<input type="text" id="aaa" class="form-control select2" value="' + aData[0] + '"><option value ="volvo">Volvo</option><option value ="saab">Saab</option<option value="opel">Opel</option><option value="audi">Audi</option></select>';


       /*     $('#aaa').select2({
                placeholder: "Search Users",
                minimumInputLength: 2,
                multiple: true,
                ajax: {
                    url: "json.txt",
                    dataType: 'json',
                    data: function (term, page) {
                        return {
                            q: term
                        };
                    },
                    results: function (data, page) {
                        var data2 = {
                            results: []
                        };
                        for (var i = 0; i < data.length; ++i) {
                            var obj = data[i];
                            data2.results.push({
                                id: obj.text,
                                text: obj.id + obj.text
                            });
                        }
                        return data;
                    }
                }
            });
            jqTds[1].innerHTML = '<input id="bbb" class="js-example-programmatic js-states form-control" value="' + aData[1] + '">';


            $('#bbb').select2({
                placeholder: "Search Users",
                minimumInputLength: 2,
                multiple: true,
                ajax: {
                    url: "json.txt",
                    dataType: 'json',
                    data: function (term, page) {
                        return {
                            q: term
                        };
                    },
                    results: function (data, page) {
                        var data2 = {
                            results: []
                        };
                        for (var i = 0; i < data.length; ++i) {
                            var obj = data[i];
                            data2.results.push({
                                id: obj.text,
                                text: obj.id + obj.text
                            });
                        }
                        return data;
                    }
                }
            });
*/

            jqTds[2].innerHTML = '<input type="text" id="ccc" class="form-control" value="' + aData[2] + '">';
            jqTds[3].innerHTML = '<input type="text" id="ddd" class="form-control" value="' + aData[3] + '">';
            jqTds[4].innerHTML = '<input type="text" id="eee" class="form-control" value="' + aData[4] + '">';

            // 保存按钮
            jqTds[5].innerHTML = '<a class="edit" href="">Save</a>';
            jqTds[6].innerHTML = '<a class="cancel" href="">Cancel</a>';
        }


        function saveRow(oTable, nRow) {
          /*  console.log("nRow: " + nRow.length);
            var aData = oTable.fnGetData(nRow);
            console.log("nRow", +aData.length);
            alert(aData[0]);
            alert(aData[1]);
            $(nRow).each(function () {
                console.log("td: " + $(this).text());
                alert($(this).text());
            });*/

            /*  alert(1);
             var $trAry = nRow;
             for ($i = 0; $i < $trAry.length; $i++) {
             //$trAry[$i]本身是一个HTMLTableRowElement object，需要使用$($trAry[$i])才将其转换为jQuery object，然后可以使用html()和find()等方法。
             var $tr = $($trAry[$i]);
             alert($tr.html());
             var $tdAry = $tr.find("td");
             alert($tdAry.length);
             }*/

           var jqInputs = $('div', nRow);

             alert(jqInputs[0].value);
             alert(jqInputs[1].value);
             alert(jqInputs[2].value);
             alert(jqInputs[3].value);
             alert(jqInputs[4].value);
            /* alert('hello');

             oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
             oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
             oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
             oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
             oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);

             // 编辑按钮
             oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 5, false);
             oTable.fnUpdate('<a class="delete" href="">Delete</a>', nRow, 6, false);
             oTable.fnDraw();*/
        }

        function cancelEditRow(oTable, nRow) {
            var jqInputs = $('select,input', nRow);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
            oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);

            oTable.fnUpdate('<a class="edit" href="">Edit</a>', nRow, 5, false);
            oTable.fnDraw();
        }

        var table = $('#sample_editable_1');

        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],

            // 设置初始值
            "pageLength": 5,

            "language": {
                "lengthMenu": " _MENU_ records"
            },
            "columnDefs": [
                {
                    // 设置默认列设置
                    'orderable': true,
                    'targets': [0]
                },
                {
                    "searchable": true,
                    "targets": [0]
                }
            ],
            "order": [
                [0, "asc"]
            ]// 设置第一列作为排序(asc)
        });

        var tableWrapper = $("#sample_editable_1_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

        $('#sample_editable_1_new').click(function (e) {
            e.preventDefault();

            if (nNew && nEditing) {
                if (confirm("前面记录没有保存.你想要保存它吗 ?")) {
                    // 保存记录
                    saveRow(oTable, nEditing);
                    $(nEditing).find("td:first").html("Untitled");
                    nEditing = null;
                    nNew = false;
                } else {
                    // 不想要保存就直接删除
                    oTable.fnDeleteRow(nEditing); // cancel
                    nEditing = null;
                    nNew = false;
                    return;
                }
            }

            // 空数据
            var aiNew = oTable.fnAddData(['', '', '', '', '', '', '']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow);
            nEditing = nRow;
            nNew = true;
        });

        table.on('click', '.delete', function (e) {
            e.preventDefault();

            if (confirm("你确定要删除这条记录吗?") == false) {
                return;
            }

            var nRow = $(this).parents('tr')[0];
            oTable.fnDeleteRow(nRow);

            // 删除的同步操作
            alert("Deleted! Do not forget to do some ajax to sync with backend :)");
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
            } else {
                alert("保存原来");
                // 保存原来
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

        table.on('click', '.edit', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                // 当前有正在编辑的,但不是当前行,保存之前编辑的数据,然后继续编辑
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                // 赋值
                nEditing = nRow;
            } else if (nEditing == nRow && this.innerHTML == "Save") {
                // 编辑的这一行,想要保存
                saveRow(oTable, nEditing);
                // 置空
                nEditing = null;
                //
                alert("Updated! Do not forget to do some ajax to sync with backend :)");
            } else {
                // 不存在有正在编辑
                editRow(oTable, nRow);
                // 赋值
                nEditing = nRow;
            }
        });
    }

    return {
        // 主函数为了初始化模块功能
        init: function () {
            handleTable();
        }
    };
}();