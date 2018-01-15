var ImageSequence = function( $dom, sequenceLength, filesName, ext, path, fps ){
	this.$dom = $dom;
	this.sequenceLength = sequenceLength;
	this.name = filesName;
	this.ext = ext;
	this.path = path;
	this.currentFrame = 0;
	this.fps = fps

	this.$dom.find('img').css({ 'opacity': 1 });
}

ImageSequence.prototype.playTo = function( index ){
	var self = this;

	clearInterval( self.loop );

	this.loop = setInterval(function(){
		if( self.currentFrame < index ){
			self.currentFrame++;
			self.render();
		}
		else if( self.currentFrame == index ){
			clearInterval( self.loop );
		}
	}, 1000 / this.fps);
}

ImageSequence.prototype.revertTo = function( index ){
	var self = this;

	clearInterval( self.loop );

	this.loop = setInterval(function(){
		if( self.currentFrame > index ){
			self.currentFrame--;
			self.render();
		}
		else if( self.currentFrame == index ){
			clearInterval( self.loop );
		}
	}, 1000 / this.fps);
}

ImageSequence.prototype.to = function( to ){
	var self = this;

	if( to < self.currentFrame ){
		self.revertTo( to );
	}
	else if( to > self.currentFrame ){
		self.playTo( to );
	}
}

ImageSequence.prototype.fromTo = function( from, to ){
	var self = this;
	self.currentFrame = from;

	if( to < from ){
		self.revertTo( to );
	}
	else if( to > from ){
		self.playTo( to );
	}
}

ImageSequence.prototype.render = function(){
	this.$dom.find('img').attr({ 'src': this.path + this.name + this.currentFrame + this.ext });
}
