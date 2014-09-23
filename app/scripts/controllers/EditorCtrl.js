angular.module('cinnamon')
  .controller('EditorCtrl', function($scope, $timeout, $compile, thesaurus) {
    $scope.post = {
      title: 'Post title',
      content: ''
    };

    var editableElm = $('.editor__editable');
    var lastHtml;

    function generateTooltip(elmIndex, list) {
      var html = '';
      list.forEach(function(word, index) {
        html += _.template('<a href="" ng-click="useWord(<%= elmIndex %>, \'<%= word %>\')"><%= word %></a>')({word: word, elmIndex: elmIndex});
        if (index.length - 1 !== list.length) {
          html += ', ';
        }
      });
      return html;
    }

    function updateSelectors() {
      var html = editableElm.text();

      var newHtml = html.replace(/(\w+)/g, 
        "<span class='candidate' data-toggle='tooltip' data-placement='top'>$1</span>");

      // hack
      html.replace('&nbsp;&nbsp;', '&nbsp;');
      html.replace('&nbsp;&nbsp;', '&nbsp;');
      html.replace('&nbsp;&nbsp;', '&nbsp;');
      html.replace('&nbsp;&nbsp;', '&nbsp;');
      html.replace('&nbsp;&nbsp;', '&nbsp;');
      html.replace('&nbsp;&nbsp;', '&nbsp;');
      html.replace('&nbsp;&nbsp;', '&nbsp;');
      html.replace('&nbsp;&nbsp;', '&nbsp;');

      if (newHtml != html) {
        $('.tooltip').hide();
        editableElm.html(newHtml);

        placeCaretAtEnd(editableElm[0]);

        $('.candidate', editableElm).each(function(elmIndex, elm) {
          elm = $(elm);
          if (!elm.data('editable')) {
            elm.data('editable', true);
            var word = elm.text();

            thesaurus.findWord(word).then(function(list) {
              console.log('tooltip', elmIndex, word);

              elm.addClass('word editable editable-click editable-open');
              elm.tooltip({
                html: true,
                title: $compile(generateTooltip(elmIndex, list))($scope),
                trigger: 'click',
                position: 'bottom',
                container: 'body'
              });

            }, function() {
              // console.log('not found:', word);
              elm.removeClass('word editable editable-click editable-open');
            });

          }
        });
      }

    }

    function initElm() {
      editableElm.wysiwygEvt();
      lastHtml = '';
      updateSelectors();
      editableElm.on('change', updateSelectors);
    }
    $timeout(initElm);

    $scope.useWord = function(elmIndex, word) {
      console.log(elmIndex, word);
      $('.candidate', editableElm).eq(elmIndex).text(word);
    };

  });