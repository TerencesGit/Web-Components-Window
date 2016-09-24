require.config({
	paths: {
		jquery: 'jquery/jquery.min',
		//jqueryUI: 'jquery-ui/jquery-ui.min'
		jqueryUI: 'https://code.jquery.com/ui/1.10.3/jquery-ui.min'
	}
})
define(['jquery','Window'], function($,w){
	$('.btn-alert').click(function(){
		new w.Window().alert({
			title: '提示',
			content: 'Welcome!',
			handlerAlertBtn: function(){
				alert('you click the alert button!')
			},
			width: 400,
			height: 250,
			y: 200,
			alertBtnText: 'OK',
			hasCloseBtn: true,
			handlerCloseBtn: function(){
				alert('you click the close button!')
			},
			 skinClassName: 'blue_window',
			// hasMask: false,
			dragHandle: '.window-header'
		}).on('alert', function(){
			alert('you click the alert button again!')
		}).on('alert', function(){
			alert('you click the alert button third!')
		}).on('close', function(){
			alert('you click the close button again!')
		})
	})
	$('.btn-confirm').click(function(){
		new w.Window().confirm({
			content: '要确认删除这个文件吗？',
			confirmBtnText: '是',
			cancelBtnText: '否',
			handlerConfirmBtn: function(input){
				alert('you click confirm button')
			},
			handlerCancelBtn: function(){}
		}).on('confirm', function(){
			alert('you click the confirm button again!')
		}).on('cancel', function(){
			alert('you click the cancel button!')
		}) 
	})
	$('.btn-prompt').click(function(){
		new w.Window().prompt({
			width: 300,
			height: 200,
			promptBtnText: '提交',
			//isPromptInputPassword: true,
			handlerPromptBtn: function(inputText){
				alert('你输入的内容是' + inputText)
			},
			handlerCancelBtn: function(){
				alert('you click the cancel button!')
			}
		}).on('prompt',function(inputText){
			alert('你输入的内容是' + inputText)
		}).on('cancel',function(){
			alert('you click the cancel button!')
		})
	})
})