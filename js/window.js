require.config({
	paths: {
		jquery: 'jquery/jquery.min',
		jqueryUI: 'https://code.jquery.com/ui/1.10.3/jquery-ui.min'
	}
})
define(['widget','jquery','jqueryUI'], function(widget,$,$UI){
	function Window(){
		this.cfg = {
			width: 500,
			height: 300,
			title: '系统消息',
			content: '',
			alertBtnText: '确定',
			confirmBtnText: '确定',
			cancelBtnText: '取消',
			handlerAlertBtn: null,
			handlerCloseBtn: null,
			handlerConfirmBtn: null,
			handlerCancelBtn: null,
			hasCloseBtn: false,
			skinClassName: null,
			hasMask: true,
			isDraggable: true,
			dragHandle: null
		};
	}
	Window.prototype = $.extend({},new widget.Widget(),{
		renderUI: function(){
			var footContent = '';
			switch(this.cfg.winType){
				case 'alert':
					footContent = '<button class="btn window_alertBtn">'+this.cfg.alertBtnText+'</button>';
					break;
				case 'confirm':
				footContent = '<button class="btn window_confirmBtn">'+this.cfg.confirmBtnText+'</button>'+
				'<button class="btn window_cancelBtn">'+this.cfg.cancelBtnText+'</button>'
			}
			this.boundingBox = $(
				'<div class="window_boundingBox">'+
				'<div class="window-header">'+this.cfg.title+'</div>'+
				'<div class="window-body">'+this.cfg.content+'</div>'+
				'<div class="window-footer">'+footContent+'</div>'+
				'</div>')
			if(this.cfg.hasMask){
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo('body')
			}
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">&times;</span>')
			}
			this.boundingBox.appendTo('body')
		},
		bindUI: function(){
			var that = this;
			this.boundingBox.delegate('.window_alertBtn','click',function(){
				that.cfg.handlerAlertBtn && that.cfg.handlerAlertBtn()
				that.fire('alert');
				that.destroy();
			}).delegate('.window_closeBtn','click',function(){
				that.cfg.handlerCloseBtn && that.cfg.handlerCloseBtn();
				that.fire('close');
				that.destroy()
			}).delegate('.window_confirmBtn','click',function(){
				that.cfg.handlerConfirmBtn && that.cfg.handlerConfirmBtn()
				that.fire('confirm');
				that.destroy()
			}).delegate('.window_cancelBtn','click',function(){
				that.fire('cancel');
				that.destroy()
			})
			if(this.cfg.handlerAlertBtn){
				this.on('alert', this.cfg.handlerAlertBtn)
			}
			if(this.cfg.handlerCloseBtn){
				this.on('close', this.cfg.handlerCloseBtn)
			}
			if(this.cfg.handlerConfirmBtn){
				this.on('confirm', this.cfg.handlerConfirmBtn)
			}
			if(this.cfg.handlerCancelBtn){
				this.on('cancel', this.cfg.handlerCancelBtn)
			}
		},
		syncUI: function(){
			this.boundingBox.css({
				width: this.cfg.width,
				height: this.cfg.height,
				left: this.cfg.x || (window.innerWidth - this.cfg.width)/2,
				top: this.cfg.y || (window.innerHeight - this.cfg.height)/2
			})
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName)
			}
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandle){
					this.boundingBox.draggable({
						containment: "parent",
						handle: this.cfg.dragHandle
					})
				}else{
					this.boundingBox.draggable({containment: "parent"})
				}
			}
		},
		destructor: function(){
			this._mask && this._mask.remove()
		},
		alert: function(cfg){
			$.extend(this.cfg,cfg,{winType:'alert'})
			this.render()
			return this
		},
		confirm: function(cfg){
			$.extend(this.cfg,cfg,{winType:'confirm'})
			this.render()
			return this
		},
		prompt: function(){}
	})
	return {
		Window: Window
	}
})