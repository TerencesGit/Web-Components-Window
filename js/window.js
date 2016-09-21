require.config({
	paths: {
		jquery: 'jquery/jquery.min',
		jqueryUI: 'https://code.jquery.com/ui/1.10.3/jquery-ui.min'
	}
})
define(['widget','jquery','jqueryUI'], function(widget,$,$UI){
	function Window(){
		this.config = {
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
		// this.handlers = {};
	}
	Window.prototype = $.extend({},new widget.Widget(),{
		alert: function(config){
			console.log(new widget.Widget());
			var cfg = $.extend(this.config, config);
			var boundingBox = $(
				'<div class="window_boundingBox">'+
				'<div class="window-header">'+cfg.title+'</div>'+
				'<div class="window-body">'+cfg.content+'</div>'+
				'<div class="window-footer"><button class="btn">'+cfg.alertBtnText+'</button></div>'+
				'</div>')
			that = this
			var mask = $('<div class="window_mask"></div>');
			boundingBox.appendTo('body');
			boundingBox.css({
				width: cfg.width,
				height: cfg.height,
				left: cfg.x || (window.innerWidth - cfg.width)/2,
				top: cfg.y || (window.innerHeight - cfg.height)/2
			})
			var btn = boundingBox.find('.window-footer button')
			btn.click(function(){
				cfg.handlerAlertBtn && cfg.handlerAlertBtn()
				that.fire('alert')
				boundingBox.remove()
				mask && mask.remove()
			})
			if(cfg.handlerAlertBtn){
				this.on('alert', cfg.handlerAlertBtn)
			}
			if(cfg.hasCloseBtn){
				var closeBtn = $('<span class="window_closeBtn">&times;</span>')
				closeBtn.appendTo(boundingBox)
				closeBtn.click(function(){
					cfg.handlerCloseBtn && cfg.handlerCloseBtn()
					that.fire('close')
					boundingBox.remove()
					mask && mask.remove()
				})
			}
			if(cfg.handlerCloseBtn){
				this.on('close', cfg.handlerCloseBtn)
			}
			if(cfg.skinClassName){
				boundingBox.addClass(cfg.skinClassName)
			}
			if(cfg.hasMask){
				mask.appendTo('body')
			}
			if(cfg.isDraggable){
				if(cfg.dragHandle){
					boundingBox.draggable({
						containment: "parent",
						handle: cfg.dragHandle
					})
				}else{
					boundingBox.draggable({containment: "parent"})
				}
				
			}
			return this;
		},
		confirm: function(){},
		prompt: function(){}
		// on: function(type,handler){
		// 	if(typeof this.handlers[type] == 'undefined'){
		// 		this.handlers[type] = []
		// 	}else{
		// 		this.handlers[type].push(handler)
		// 	}
		// 	return this
		// },
		// fire: function(type,data){
		// 	if(this.handlers[type] instanceof Array){
		// 		var handlers = this.handlers[type];
		// 		for(var i = 0,len= handlers.length;i<len;i++){
		// 			handlers[i](data)
		// 		}
		// 	}
		// }
	})
	return {
		Window: Window
	}
})