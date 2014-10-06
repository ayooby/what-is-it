<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>What is it</title>
	{{ HTML::style('http://getbootstrap.com/dist/css/bootstrap.min.css') }}
	{{ HTML::style('css/style.css') }}
</head>
<style>

</style>
<body>
<div id="main" class="container-fluid"></div>



<script type="text/template" id="post-template">
	<div class="content-wrapper">
		<div class="post-thumbnail clearfix">
			<img class="img" src="img/<%= image %>" alt="<%= title %>">
			<div class="post-view">
				<h1><%= title %></h1>
				<ul class="tags">
					<% _.each(tags, function(tag) { %>
						<li><a href="#/tags/<%= tag.name %>"><%= tag.name %></a></li>
					<% }); %>
				</ul>
				<span class="play"></span>
				<a href="#/posts/<%= id %>" class="single-post">
					<button class="btn btn-danger">Details</button>
				</a>
			</div>
		</div>
	</div>
</script>

{{ HTML::script('//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js') }}
{{ HTML::script('//cdnjs.cloudflare.com/ajax/libs/jquery.isotope/2.0.0/isotope.pkgd.min.js') }}
{{ HTML::script('//underscorejs.org/underscore.js') }}
{{ HTML::script('//backbonejs.org/backbone.js') }}
{{ HTML::script('js/main.js') }}
</body>
</html>