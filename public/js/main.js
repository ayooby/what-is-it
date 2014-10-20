
(function(){
	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Router: {},
		Content: $('#main'),
		Events: _.extend({}, Backbone.Events),
		template: function(id){
			return _.template( $('#' + id).html() );
		},
	};

	var apr = Backbone.Router.extend({
		routes: {
			"posts/create": "createPost",
			"posts/:id": "showPost",
			"login" : "showLogin",
			"\_\=\_": "facebookLogedin",
			"": "index",
			"*path": "call404",
		},

		index: function(){
			console.log('Router:index');
			App.Events.trigger('posts:show');
		},
		createPost: function(){
			console.log('Router:createPost');
			App.Events.trigger('post:create');
		},
		showPost: function(id){
			console.log('Router:showPost');
			App.Events.trigger('post:show', id);
		},
		showLogin: function(){
			console.log('Router:showLogin');
			App.Events.trigger('auth:login');
			App.Content.html('<center><b>showLogin</b></center>');
		},
		facebookLogedin: function(){
			console.log('Router:facebookLogedin');
			App.Events.trigger('posts:show');
		},
		call404:function(){
			console.log('Router:call404');
			App.Content.html('<center><b>404</b></center>');
		},

	});
	App.Router = new apr;

	App.Models.Post = Backbone.Model.extend({
		defaults:{
			title: '',
			audio: '', 
			image: ''
		},
		urlRoot: 'posts'
	});

	App.Models.Tag = Backbone.Model.extend({
		defaults:{
			name: ''
		},
		urlRoot: 'tags'
	});






	App.Collections.Posts = Backbone.Collection.extend({
		model: App.Models.Post,
		url: 'posts'
	});












	App.Views.CreatePost = Backbone.View.extend({
		tagName: 'section',
		className: 'create row',
		template: App.template('create-template'),

		events:{
			'submit': 'addPost'
		},

		initialize: function(){
			App.Events.on('post:create', this.render, this);
		},

		render: function(){
			console.log('View:CreatePost:render');
			App.Content.html( this.template() );
			return this;
		},
		addPost: function(e){
			e.preventDefault();
			console.log('going to submit post')
			console.log(this.collection)
		}
	});

	App.Views.Posts = Backbone.View.extend({
		tagName: 'section',
		className: 'posts row',

		initialize: function(){
			console.log("View:Posts:initialize")
			App.Events.on('post:add', this.addOne, this);
			App.Events.on('posts:show', this.render, this);
		},

		render: function(){
			console.log('View:Posts:render');
			
			if(this.collection == undefined){
				posts = new App.Collections.Posts;
				var This = this;
				posts.fetch().then(function(){
					This.collection = posts;
					This.collection.each(This.addOne, This);
					App.Content.html( This.$el );
				}, this);

			}else{
				this.collection.each(this.addOne, this);
				App.Content.html( this.$el );
			}
		},

		addOne: function(postModel){
			var postView = new App.Views.Post({ model: postModel })
			this.$el.append( postView.render().el );
		}
	});



	App.Views.Post = Backbone.View.extend({
		tagName: 'article',
		className: 'post col-md-3 col-sm-6 col-xs-12 nopadding',
		template: App.template('post-template'),

		events: {
			'click .play:not(.playing)': 'play',
			'click .play.playing': 'stop'
		},

		render: function(){
			console.log('View:Post:render');
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		},
		play: function(e){
			e.stopPropagation();
			this.$el.addClass('hover');
			e.target.classList.add('playing');
			console.log('playing "'+ this.model.get('audio')+'"');
			this.model.audio = new Audio('/audios/'+this.model.get('audio'));
			this.model.audio.play();
			document.getElementById('player-title').innerHTML = this.model.get('title');
			document.body.classList.add('playing');
		},
		stop: function(e){
			e.stopPropagation();
			this.$el.removeClass('hover');
			$(e.target).removeClass('playing');
			console.log('Stoped"'+ this.model.get('audio')+'"')
			this.model.audio.pause();
			document.body.classList.remove('playing');
		},

	});


	App.Views.ShowPost = Backbone.View.extend({
		tagName: 'section',
		className: 'single-post',

		initialize: function(){
			App.Events.on('post:show', this.render, this);
		},

		render: function( id ){
			console.log('View:ShowPost:render');
			App.Content.html('Going to show single post #' + id);
			return this;
		},

	});








	$.ajaxSetup({
		statusCode: {
			401: function(){
				window.location.replace('/#login');
			},
			403: function() {
				window.location.replace('/#denied');
			}
		}
	});
	new App.Views.CreatePost;
	new App.Views.ShowPost;
	new App.Views.Posts;
	Backbone.history.start({pushState: false, root: '/'});

})();


function create_post( rand ){
	var newPost = new App.Models.Post;
	var title = rand+'what is Backbone?';
	var image = 'p-'+rand+'.jpg';
	var audio = 's-'+rand+'.mp3';
	var tags = ['t1111'+Math.round(Math.random()*1000), 'ttt22'+Math.round(Math.random()*1000)];
	posts.create({
		title: title,
		image: image,
		audio: audio,
		tags: tags,
	})
	App.Events.trigger('post:add', newPost);
}