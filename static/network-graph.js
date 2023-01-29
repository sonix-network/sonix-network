var tippyEdge = null;

(function(){
  var toJson = function(res){ return res.json(); };

  var cy = window.cy = cytoscape({
    container: document.getElementById('cy'),

    layout: {
      name: 'avsdf',
      nodeSeparation: 120,
      padding: 50,
      animate: false,
    },
    userZoomingEnabled: false,
    userPanningEnabled: false,
    style: fetch('cy-style.json').then(toJson),
    elements: fetch('network-graph.json').then(toJson)
  });

  cy.ready(function(){
    var makeTippy = function(ele, text){
      var ref = ele.popperRef();

      // Since tippy constructor requires DOM element/elements, create a placeholder
      var dummyDomEle = document.createElement('div');

      var tip = tippy( dummyDomEle, {
        getReferenceClientRect: ref.getBoundingClientRect,
        trigger: 'manual', // mandatory
        // dom element inside the tippy:
        content: function(){ // function can be better for performance
          var div = document.createElement('div');

          div.innerHTML = text;

          return div;
        },
        // your own preferences:
        arrow: true,
        placement: 'bottom',
        hideOnClick: false,
        sticky: "reference",
        zIndex: 10,

        // if interactive:
        interactive: true,
        appendTo: document.body // or append dummyDomEle to document.body
      } );

      return tip;
    };

    cy.on('select', 'edge', function(evt){
      var edge = evt.target;
      console.log('Showing bandwidth usage for ' + edge.id() + ' (TODO)');

      if (tippyEdge != null) {
        tippyEdge.destroy();
        tippyEdge = null;
      }
      tippyEdge = makeTippy(edge, 'Bandwidth Usage Here');
      tippyEdge.show();
    });

    cy.on('unselect', 'edge', function(evt){
      if (tippyEdge != null) {
        tippyEdge.destroy();
        tippyEdge = null;
      }
    });
    makeTippy(cy.getElementById('node-kg'), 'Kista Gate').show();
    makeTippy(cy.getElementById('node-kn7'), 'KN7').show();
    makeTippy(cy.getElementById('node-shg5'), 'SHG5').show();
    makeTippy(cy.getElementById('node-sto1'), 'STO1').show();
  });

  cy.on('mouseup', function (e) {
    cy.fit(null, 50);
  })
})();

window.onresize = function() {
  cy.resize();
  cy.fit(null, 50);
}
