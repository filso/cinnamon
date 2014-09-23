/***
 * Create blank command
 */
var FCKRedBold_command = function()
{

}

/***
 * Add Execute prototype
 */
FCKRedBold_command.prototype.Execute = function()
{
        // get whatever is selected in the FCKeditor window  ---FCK.EditorDocument.getSelection();
    var selection = "";
    // if (document.getSelection) selection = FCK.EditorDocument.getSelection();
    //else if (document.selection) selection = FCK.EditorDocument.selection.createRange().text;
    var selection = "";
    if(FCK.EditorDocument.selection != null) {
      selection = FCK.EditorDocument.selection.createRange().text;
    }
    else  {
      selection = FCK.EditorDocument.getSelection();
    }
     FCK.InsertHtml('<span><font color="red"><b>' + selection + '</b></font></span>');
}

function getSelect() {
    if (document.getSelection) methodeselection = oEditor.FCK.EditorDocument.getSelection();
    else if (document.selection) methodeselection = oEditor.FCK.EditorDocument.selection.createRange().text;
    else return;
    return methodeselection;

}
/***
 * Add GetState prototype
 * - This is one of the lines I can't explain
 */
FCKRedBold_command.prototype.GetState = function()
{
        return;
}

// register the command so it can be use by a button later
FCKCommands.RegisterCommand( 'RedBold_command' , new FCKRedBold_command() ) ;

/***
 * Create the  toolbar button.
 */

// create a button with the label "Netnoi" that calls the netnoi_command
var oRedBold = new FCKToolbarButton( 'RedBold_command', 'Red & Bold' ) ;
oRedBold.IconPath = FCKConfig.PluginsPath + 'redbold/redbold.gif' ;

// register the item so it can added to a toolbar
FCKToolbarItems.RegisterItem( 'RedBold', oRedBold ) ;
