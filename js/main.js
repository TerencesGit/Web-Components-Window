require.config({
	paths: {
		jquery: 'jquery/jquery.min'
	}
})
define(['jquery','Window'], function($,w){
	$('.btn').click(function(){
		var win = new w.Window();
		win.alert({
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
})