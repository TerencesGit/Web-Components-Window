require.config({
	paths: {
		jquery: 'jquery/jquery.min'
	}
})
define(['jquery'], function($){
	function Window(){}
	Window.prototype = {
		alert: function(content, handler, cfg){
			var boundingBox = $('<div class="window_boundingBox"></div>')
			boundingBox.appendTo('body');
			boundingBox.html(content)
			var btn = $('<button class="btn">确定</button>');
			btn.appendTo(boundingBox);
			btn.click(function(){
				handler && handler()
				boundingBox.remove()
			})
			this.cfg = {
				width: 500,
				height: 300
			}
			$.extend(this.cfg, cfg)
			console.log((window.innerHeight ))
			boundingBox.css({
				width: this.cfg.width,
				height: this.cfg.height,
				left: this.cfg.x || (window.innerWidth - this.cfg.width)/2,
				top: this.cfg.y || (window.innerHeight - this.cfg.height)/2
			})
		},
		confirm: function(){},
		prompt: function(){}
	}
	return {
		Window: Window
	}
})