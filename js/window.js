
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
			promptBtnText: '确定',
			isPromptInputPassword: false,
			promptInputText: '请输入内容',
			maxlengthPromptInput: 10,
			handlerPromptBtn: null,
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
					break;
				case 'prompt':
					this.cfg.content += '<p class="window_promptInputWrapper">'+
					'<input type="'+(this.cfg.isPromptInputPassword ? "password" : "text")+'"'+
					'placeholder="'+this.cfg.promptInputText+'"maxlength="'+this.cfg.maxlengthPromptInput+''+
					'"class="window_promptInput"></p>';
					footContent = '<button class="btn window_promptBtn">'+this.cfg.promptBtnText+'</button>'+
					'<button class="btn window_cancelBtn">'+this.cfg.cancelBtnText+'</buttom>';
					break;
			}
			this.boundingBox = $(
				'<div class="window_boundingBox">'+
					'<div class="window-body">'+this.cfg.content+'</div>'+
				'</div>')
			if(this.cfg.winType != 'common'){
				this.boundingBox.prepend('<div class="window-header">'+this.cfg.title+'</div>')
				this.boundingBox.append('<div class="window-footer">'+footContent+'</div>')
			}
			if(this.cfg.hasMask){
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo('body')
			}
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">&times;</span>')
			}
			this.boundingBox.appendTo('body')
			this._promptInput = this.boundingBox.find('.window_promptInput')
		},
		bindUI: function(){
			var that = this;
			this.boundingBox.delegate('.window_alertBtn','click',function(){
				that.fire('alert');
				that.destroy();
			}).delegate('.window_closeBtn','click',function(){
				that.fire('close');
				that.destroy()
			}).delegate('.window_confirmBtn','click',function(){
				that.fire('confirm');
				that.destroy()
			}).delegate('.window_cancelBtn','click',function(){
				that.fire('cancel');
				that.destroy()
			}).delegate('.window_promptBtn','click',function(){
				that.fire("prompt", that._promptInput.val());
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
			if(this.cfg.handlerPromptBtn){
				this.on("prompt", this.cfg.handlerPromptBtn)
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
			$.extend(this.cfg,cfg,{winType:'alert'});
			this.render();
			return this;
		},
		confirm: function(cfg){
			$.extend(this.cfg,cfg,{winType:'confirm'});
			this.render();
			return this;
		},
		prompt: function(cfg){
			$.extend(this.cfg, cfg,{winType:'prompt'});
			this.render();
			this._promptInput.focus();
			return this;
		},
		common: function(cfg){
			$.extend(this.cfg,cfg,{winType:'common'});
			this.render();
			return this;
		}
	})
	return {
		Window: Window
	}
})