( function() {
	window.DOWNLOAD_EXPORTER = {};
	
	window.DOWNLOAD_EXPORTER.downloads = {};
	
	window.DOWNLOAD_EXPORTER.downloads_count = 0;
	
	window.DOWNLOAD_EXPORTER.interval = null;
	
	window.DOWNLOAD_EXPORTER.delimiter = ',**SPLIT**,';
	
	window.DOWNLOAD_EXPORTER.old_date = '';
	
	window.DOWNLOAD_EXPORTER.init = function() {
		window.addEventListener('keydown', window.DOWNLOAD_EXPORTER.parsePage);
		
		//window.DOWNLOAD_EXPORTER.interval = window.setInterval( window.DOWNLOAD_EXPORTER.parsePage, 500 );
	};
	
	window.DOWNLOAD_EXPORTER.parsePage = function() {
		var date = '';
		var downloads = document.querySelector("downloads-manager").shadowRoot.querySelector('iron-list').querySelectorAll('downloads-item');
		var i, l;
		var url = '';
		var name = '';
		var key;
		var addCount = 0;
		var dateCount = 0;
		
		for( i = 0, l = downloads.length; i < l; i += 1 ) {
			date = downloads[ i ].shadowRoot.querySelector('#date').innerHTML;
			url = downloads[ i ].shadowRoot.querySelector('#url').innerHTML;
			name = downloads[ i ].shadowRoot.querySelector('#name').innerHTML;
			
			if( date === "Today" || date === "Yesterday" ) { 
				date = function( str ) {
					var d = new Date();
					
					if( str === "Yesterday" ) {
						d.setDate(d.getDate() - 1);
					}
					
					var month = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
					
					return month[ d.getMonth() ] + " " + d.getDate() + ", " + d.getFullYear();
				}(date);
			}
			
			if( date ) {
				if( window.DOWNLOAD_EXPORTER.old_date ) {
					var d1 = new Date( date );
					var d2 = new Date( window.DOWNLOAD_EXPORTER.old_date );
					if( d1 < d2 ) {
						window.DOWNLOAD_EXPORTER.old_date = date;
					} else {
						date = window.DOWNLOAD_EXPORTER.old_date;
					}
				} else {
					window.DOWNLOAD_EXPORTER.old_date = date;
					date = window.DOWNLOAD_EXPORTER.old_date;
				}
			} else {
				date = window.DOWNLOAD_EXPORTER.old_date;
			}
			
			key = name + window.DOWNLOAD_EXPORTER.delimiter + url;
			
			if( typeof( window.DOWNLOAD_EXPORTER.downloads[ key ] ) === "undefined" ) {
				window.DOWNLOAD_EXPORTER.downloads[ key ] = date;
				window.DOWNLOAD_EXPORTER.downloads_count += 1;
				addCount += 1;
			}
		}
		console.log( 'Parse: ' + downloads.length + ', Add: ' + addCount + ', Date: ' + dateCount + ', Total: ' + window.DOWNLOAD_EXPORTER.downloads_count );
	};
	
	window.DOWNLOAD_EXPORTER.close = function() {
		window.clearInterval( window.DOWNLOAD_EXPORTER.interval );
		window.DOWNLOAD_EXPORTER.interval = null;
	};
		
	window.DOWNLOAD_EXPORTER.parse = function() {
		var k;
		var str = [];
		for( k in window.DOWNLOAD_EXPORTER.downloads ) {
			str.push( window.DOWNLOAD_EXPORTER.downloads[ k ] + window.DOWNLOAD_EXPORTER.delimiter + k );
		}
		console.log( str.join( "\n" ) );
	};
}() );