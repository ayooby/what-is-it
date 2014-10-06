var z;
(function(){
	window.App = {
		Models: {},
		Collections: {},
		Views: {},
		Router: {}
	};

	window.vent = _.extend({}, Backbone.Events);

	App.template = function(id){
		return _.template( $('#' + id).html() );
	}






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












	App.Views.Posts = Backbone.View.extend({
		tagName: 'section',
		className: 'posts row',

		render: function(){
			this.collection.each(this.addOne, this);
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
			'click a.single-post': 'showSinglePost',
			'click .play:not(.playing)': 'play',
			'click .play.playing': 'stop'
		},

		render: function(){
			this.$el.html( this.template( this.model.toJSON() ) );
			return this;
		},
		play: function(e){
			e.stopPropagation();
			this.$el.addClass('hover');
			$(e.target).addClass('playing');
			console.log('playing "'+ this.model.get('audio')+'"');
			this.model.audio = new Audio('/audios/'+this.model.get('audio'));
			this.model.audio.play();
		},
		stop: function(e){
			e.stopPropagation();
			this.$el.removeClass('hover');
			$(e.target).removeClass('playing');
			console.log('Stoped"'+ this.model.get('audio')+'"')
			this.model.audio.pause();
		},
		showSinglePost: function(e){
			e.stopPropagation();
			e.preventDefault();
			console.log('going to show single post#'+this.model.get('id'));
		}

	});



/*

	//fetch & update
	var post = new App.Models.Post({id: 1});
	post.fetch().then(function(){
		post.set('image', '22.jpg');
		post.save();		
	});

	//delete
	var deleteMe = new App.Models.Post({id: 3});
	deleteMe.fetch({
		error: function(){
			console.log('Post(3) not exists to delete!');
		}
	}).then(function(){
		deleteMe.destroy();
	});


	//create
	var newPost = new App.Models.Post;
	var rand = Math.round(Math.random()*1000);
	newPost.set('title', rand+'what is Backbone?');
	newPost.set('image', rand+'backbonejs.jpg');
	newPost.set('audio', rand+'backbonejs.ogg');
	newPost.save();


*/

	var posts = new App.Collections.Posts;
	posts.fetch().then(function(){
		var postsView = new App.Views.Posts({ collection: posts });
		postsView.render();
		$('#main').append(postsView.el);


	});




	


})();