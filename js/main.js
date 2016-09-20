require.config({
	paths: {
		jquery: 'jquery/jquery.min'
	}
})
define(['jquery','Window'], function($,w){
	$('.btn').click(function(){
		new w.Window().alert({
			title: '提示',
			content: 'Welcome!',
			handler: function(){
				// alert('you click the button!')
			},
			width: 400,
			height: 250,
			y: 200,
			alertBtnText: 'Confirm',
			hasCloseBtn: true,
			// skinClassName: 'blue_window',
			// hasMask: false
		});
	})
})