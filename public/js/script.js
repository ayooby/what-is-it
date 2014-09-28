$=jQuery;
$().ready(function(){
		$.Isotope.prototype._getMasonryGutterColumns = function() {
			var gutter = this.options.masonry && this.options.masonry.gutterWidth || 0;
				containerWidth = this.element.width();
				this.masonry.columnWidth = this.options.masonry && this.options.masonry.columnWidth || this.$filteredAtoms.outerWidth(true) || containerWidth;
			this.masonry.columnWidth += gutter;
			this.masonry.cols = Math.floor( ( containerWidth + gutter ) / this.masonry.columnWidth );
			this.masonry.cols = Math.max( this.masonry.cols, 1 );
		};
		$.Isotope.prototype._masonryReset = function() {
			this.masonry = {};
			this._getMasonryGutterColumns();
			var i = this.masonry.cols;
			this.masonry.colYs = [];
			while (i--) {
				this.masonry.colYs.push( 0 );
			}
		};
		$.Isotope.prototype._masonryResizeChanged = function() {
			var prevSegments = this.masonry.cols;
			this._getMasonryGutterColumns();
			return ( this.masonry.cols !== prevSegments );
		};
		var $window = $(window);
		var $container = $('#main');
		$container.imagesLoaded( function(){
			reLayout();
			$window.smartresize( reLayout );
		});
		function reLayout() {
			var mediaQueryId = getComputedStyle( document.body, ':after' ).getPropertyValue('content');
			if (navigator.userAgent.match('MSIE 8') == null) {
				mediaQueryId = mediaQueryId.replace( /"/g, '' );
			}
			var windowSize = $window.width();
			var masonryOpts;
			switch ( mediaQueryId ) {
				case 'large' :
					masonryOpts = {
					  columnWidth: $container.width() / 4
					};
				break;
				case 'big' :
					masonryOpts = {
					  columnWidth: $container.width() / 4
					};
				break;
				case 'medium' :
					masonryOpts = {
					  columnWidth: $container.width() / 4
					};
				break;
				case 'small' :
					masonryOpts = {
						columnWidth: $container.width() / 2
					};
				break;
				case 'tiny' :
				masonryOpts = {
				  columnWidth: $container.width() / 1
				};
				break;
			}
			console.log(masonryOpts)
			$container.isotope({
			  resizable: false,
			  itemSelector : '.post',
			  masonry: masonryOpts
			}).isotope( 'reLayout' );
		}

});