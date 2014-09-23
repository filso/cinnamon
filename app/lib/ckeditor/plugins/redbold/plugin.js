(function(){
    var a= {
        exec:function(editor){
			var command = editor.getCommand(b);
			if (command.state == CKEDITOR.TRISTATE_OFF){
				editor.fire('saveSnapshot');	
				var styles = new CKEDITOR.style({element : 'span',styles : { 'font-weight' : 'bold' }});	
				styles.apply( editor.document ); 	
				var styles = new CKEDITOR.style({ element : 'span', styles : { 'color' : 'red' }});
				styles.apply( editor.document ); 
				command.setState( CKEDITOR.TRISTATE_ON );				
				editor.fire('saveSnapshot');
				console.log('true');
			}
			else{
				editor.fire('saveSnapshot');	
				var styles = new CKEDITOR.style({element : 'span',styles : { 'font-weight' : 'normal' }});	
				styles.apply( editor.document ); 	
				var styles = new CKEDITOR.style({ element : 'span', styles : { 'color' : 'black' }});
				styles.apply( editor.document ); 
				editor.fire('saveSnapshot');
				command.setState( CKEDITOR.TRISTATE_OFF );				
			}
			
     	}
    },
    b='redbold';
    CKEDITOR.plugins.add(b,{
        init:function(editor){
            editor.addCommand(b,a,editor);
            editor.ui.addButton('redbold',{
                label:'Red + Bold', 
                icon: this.path + 'redbold.gif',
                command:b
            });
        }
    });    
})();
