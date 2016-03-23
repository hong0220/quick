/********************************************
 * 玉琴蝶园之ExtJs例子资料
 * 作者：迷蝶
 * 创建时间：2010-05-18
 * 联系方式：
 * 		E-Mail：leader1212@sina.com.cn
 * 		  CSDN：http://hi.csdn.net/leadergg
 * 说明：如需直接使用本站的例子代码，请保留此说明
 *
 ******************************************/
Ext.onReady(function() {
    UploadDialog = function() {
        UploadDialog.superclass.constructor.call(this, {
            // 上传地址，这里后台没有实现上传，只是直接返回成功{success:true}。
            url: 'upload.php?method=upload',
            width: 450,
            modal: false,
            height: 300,
            minWidth: 450,
            minHeight: 300,
            draggable: true,
            resizable: true,
            reset_on_hide: true,
            // 关闭窗口，继续上传
            allow_close_on_upload: false,
            // 是否自动上传图片，选择图片后就自动上传
            upload_autostart: false
        });
        /**
         * dialog事件有很多，如下：
         * filetest - fires before file is added into the queue, parameters:
       			dialog - reference to dialog
       			filename - file name
	         If handler returns false then file will not be queued.
         * fileadd - fires when file is added into the queue, parameters:
	         dialog - reference to dialog
	         filename - file name
         * fileremove - fires when file is removed from the queue, parameters:
	         dialog - reference to dialog
	         filename - file name
	         record - file record
         * resetqueue - fires when upload queue is resetted, parameters:
	         dialog - reference to dialog
         * beforefileuploadstart - fires when file as about to start uploading:
	         dialog - reference to dialog
	         filename - uploaded file name
	         record - file record
	         If handler returns false then file upload will be canceled.
         * fileuploadstart - fires when file has started uploading:
	         dialog - reference to dialog
	         filename - uploaded file name
	         record - file record
         * uploadsuccess - fires when file is successfuly uploaded, parameters:
	         dialog - reference to dialog
	         filename - uploaded file name
	         data - js-object builded from json-data returned from upload handler response.
	         record - file record
         * uploaderror - fires when file upload error occured, parameters:
	         dialog - reference to dialog
	         filename - uploaded file name
	         data - js-object builded from json-data returned from upload handler response.
	         record - file record
         * uploadfailed - fires when file upload failed, parameters:
	         dialog - reference to dialog
	         filename - failed file name
	         record - file record
         * uploadcanceled - fires when file upload canceled, parameters:
	         dialog - reference to dialog
	         filename - failed file name
	         record - file record
         * uploadstart - fires when upload process starts, parameters:
	         dialog - reference to dialog
         * uploadstop - fires when upload process stops, parameters:
	         dialog - reference to dialog
         * uploadcomplete - fires when upload process complete (no files to upload left), parameters:
	         dialog - reference to dialog
         */
        this.on('uploadsuccess', this.onUploadSuccess);
    }
    
    Ext.extend(UploadDialog, Ext.ux.UploadDialog.Dialog, {
        onUploadSuccess: function(dialog, filename) {
            Ext.Msg.alert("提示", "上传成功！" + filename);
        }
    });
    new UploadDialog().show();
	
	var hideMask = function () {
        Ext.get('loading').remove();
        Ext.fly('loading-mask').fadeOut({
            remove:true
        });
    }.defer(250);
});
