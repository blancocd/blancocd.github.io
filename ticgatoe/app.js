function hmsph(radius, ctr, offx, offy) {
    var fields = $('.' + ctr + ' div'),
      container = $('.' + ctr),
      width = container.width(),
      height = container.height();
    var angle = 0,
      step = (2 * Math.PI) / fields.length;
    fields.each(function() {
      var x = Math.round(width / 2 + radius * Math.cos(angle) - $(this).width() / 2);
      var y = Math.round(height / 2 + radius * Math.sin(angle) - $(this).height() / 2);
      $(this).css({
        left: x + offx + 'px',
        top: y + offy + 'px'
      });
      angle += step;
    });
  }
  hmsph(0, "containerW", 0, 0)
  inlyr = 25
  hmsph(inlyr, "container", 0, 0)
  hmsph(inlyr, "container1O", 0, 0)
  hmsph(inlyr, "container1X", 0, 0)
  hmsph(inlyr, "container2X", 0, 0)
  
  midlyr = 58
  hmsph(midlyr, "container2", 0, 0)
  hmsph(midlyr, "container1O2", 0, 0)
  hmsph(midlyr, "container1X2", 0, 0)
  hmsph(midlyr, "container2X2", 0, 0)
  
  outlyr = 132
  hmsph(outlyr, "container3", 0, 0)
  hmsph(outlyr, "container1O3", 0, 0)
  hmsph(outlyr, "container1X3", 0, 0)
  hmsph(outlyr, "container2X3", 0, 0)
  //////////////////////////////////////////////////////////////////////// 
  ////////////////////////////////////////////////////////////////////////
  let x = true;
  let over = false;
  let onetap = false;
  let lyrX = new Array(3).fill(false).map(() => new Array(12).fill(false))
  let lyrO = new Array(3).fill(false).map(() => new Array(12).fill(false))
  const isTrue = (currentValue) => currentValue == true;
  
  function showX(id) {
      player = '1X-'+id
      document.getElementById(player).style.backgroundColor = "white"
      player = '2X-'+id
      document.getElementById(player).style.backgroundColor = "white"
  }
  function showO(id) {
      player = 'O-'+id
      document.getElementById(player).style.backgroundColor = "white"
      player = '1X-'+id
      document.getElementById(player).style.backgroundColor = "white"
      document.getElementById(player).style.height = "0px"
      player = '2X-'+id
      document.getElementById(player).style.backgroundColor = "white"
      document.getElementById(player).style.height = "0px"
  }
  function contig(layer) {
    if (x) {
      for (let i = 0; i < 8; i++) {
        segm = lyrX[layer-1].slice(i,i+4)
        if (segm.every(isTrue)) {
          return true;
        }
      }
    } else {
      for (let i = 0; i < 8; i++) {
        segm = lyrO[layer-1].slice(i,i+4)
        if (segm.every(isTrue)) {
          return true;
        }
      }
    }
    return false;
  }
  function line(layer, slice) {
    if (x  &&  lyrX[0][slice] && lyrX[0][slice+4]) {
      center = lyrX[1][slice] && lyrX[1][slice+4]
      right  = lyrX[1][slice] && lyrX[2][slice]
      left   = lyrX[1][slice+4] && lyrX[2][slice+4]
      return (center || right || left)
    } else if (lyrO[0][slice] && lyrO[0][slice+4]) {
      center = lyrO[1][slice] && lyrO[1][slice+4]
      right  = lyrO[1][slice] && lyrO[2][slice]
      left   = lyrO[1][slice+4] && lyrO[2][slice+4]
      return (center || right || left)
    }
    return false;
  }
  function wckr(layer, slice) {
    if (x) {
      try {
        lyrX[layer-1][slice+8] = true
      } catch { }
      if (contig(layer) || line(layer, slice)) {
        document.getElementById("OW").style.height = "0px"
        document.getElementById("X1W").style.backgroundColor = "grey"
        document.getElementById("X2W").style.backgroundColor = "grey"
        over = true
      }
    } else {
      try {
        lyrO[layer-1][slice+8] = true
      } catch { }
      if (contig(layer) || line(layer, slice)) {
        document.getElementById("OW").style.backgroundColor = "grey"
        over = true
      }
    }
  }
  function restart() {
    onetap = false
    x = true;
    over = false;
    lyrX = new Array(3).fill(false).map(() => new Array(11).fill(false))
    lyrO = new Array(3).fill(false).map(() => new Array(11).fill(false))
    for (let i = 0; i < 8; i++) {
      slice = i.toString()
      for (let j = 1; j < 4; j++) {
        layer = j.toString()
        player = 'O-'+layer+"-"+slice
        document.getElementById(player).style.backgroundColor = ""
        player = '1X-'+layer+"-"+slice
        document.getElementById(player).style.backgroundColor = ""
        document.getElementById(player).style.height = ""
        player = '2X-'+layer+"-"+slice
        document.getElementById(player).style.backgroundColor = ""
        document.getElementById(player).style.height = ""
        player = '1X-'+layer+"-"+slice
        document.getElementById(player).style.backgroundColor = ""
        player = '2X-'+layer+"-"+slice
        document.getElementById(player).style.backgroundColor = ""
      }
    }
    document.getElementById("OW").style.height = ""
    document.getElementById("X1W").style.backgroundColor = ""
    document.getElementById("X2W").style.backgroundColor = ""
    document.getElementById("OW").style.backgroundColor = ""
  }
  
  function clic(elem){
    const id = elem.id
    if (id == "containerW") {
      if (onetap) {
        restart()
        return
      } else {
        onetap = true
        return
      }
    }
    onetap = false
    console.log(id)
    const layer = parseInt(id.split('-')[0])
    const slice = parseInt(id.split('-')[1])
    if (x && !lyrX[layer-1][slice] && !lyrO[layer-1][slice] && !over) {
      showX(id)
      lyrX[layer-1][slice] = true
      wckr(layer, slice)
      x = false
    } else if (!lyrX[layer-1][slice] && !lyrO[layer-1][slice] && !over) {
      showO(id)
      lyrO[layer-1][slice] = true
      wckr(layer, slice)
      x = true
    }
  }
  