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
			handlerAlertBtn: null,
			handlerCloseBtn: null,
			hasCloseBtn: false,
			skinClassName: null,
			hasMask: true,
			isDraggable: true,
			dragHandle: null
		};
	}
	Window.prototype = $.extend({},new widget.Widget(),{
		renderUI: function(){
			this.boundingBox = $(
				'<div class="window_boundingBox">'+
				'<div class="window-header">'+this.cfg.title+'</div>'+
				'<div class="window-body">'+this.cfg.content+'</div>'+
				'<div class="window-footer"><button class="btn window_alertBtn">'+this.cfg.alertBtnText+'</button></div>'+
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
			})
			if(this.cfg.handlerAlertBtn){
				this.on('alert', this.cfg.handlerAlertBtn)
			}
			if(this.cfg.handlerCloseBtn){
				this.on('close', this.cfg.handlerCloseBtn)
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
			$.extend(this.cfg,cfg)
			this.render()
			return this
		},
		confirm: function(){},
		prompt: function(){}
	})
	return {
		Window: Window
	}
})