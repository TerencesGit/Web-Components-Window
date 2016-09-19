require.config({
	paths: {
		jquery: 'jquery/jquery.min'
	}
})
define(['jquery','Window'], function($,w){
	$('.btn').click(function(){
		new w.Window().alert('Welcome!',function(){
			alert('you click the button!')
		});
	})
})