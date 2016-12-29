var snapRange = 60;
var currentId = 3;


function handle_mousedown(e) {
    window.my_dragging = {};
    my_dragging.pageX0 = e.pageX;
    my_dragging.pageY0 = e.pageY;
    my_dragging.elem = this;
    my_dragging.offset0 = $(this).offset();

    function handle_dragging(e) {
        var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
        var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
        $(my_dragging.elem)
            .offset({
                top: top,
                left: left
            });
    }

    function handle_mouseup(e) {
        $('body')
            .off('mousemove', handle_dragging)
            .off('mouseup', handle_mouseup);

        $(".snapable").each(function (index) {
            if (this != my_dragging.elem && typeof this == "object") {
                if (canSnap(my_dragging.elem, this)==true){
                    var newCords=$(this).position();
                    console.log($(this).position().top,$(my_dragging.elem).position().top);
                    if ($(this).position().top>$(my_dragging.elem).position().top){
                        newCords.top-=$(this).height();
                    } else {
                        newCords.top+=$(this).height();
                    }
                    $(my_dragging.elem).css({top: newCords.top, left: newCords.left});
                }
            }

        });



    }
    $('body')
        .on('mouseup', handle_mouseup)
        .on('mousemove', handle_dragging);
}

function canSnap(element1, element2) {
    
    var el1=$(element1).position();
    var el2=$(element2).position();
    
    el2.top+=$(element2).height();
    el2.left+=$(element2).width()/2;
    el1.top+=$(element1).height();
    el1.left+=$(element1).width()/2;
    
    var distance = Math.floor(Math.hypot(el2.left - el1.left, el2.top - el1.top));
    if (distance <= snapRange) {
        return true;
    } else {
        return false;
    }
}

function initialize(element) {
    element.snapInfo = {
        attachedTo: false, //Ok this is confusing but here is the difference! AttachedTo is the block it has snapped to and snappedTo is the block that snapped to it.
        snappedTo:false,
        
    };
}

$('.draggables').mousedown(handle_mousedown);

for (var i = 0; i < $('.draggables').length; i++) {
    initialize($('.draggables')[i]);
}
