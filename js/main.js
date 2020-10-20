$(document).ready(function(){

  let counter = 0;
  let counter_2 = 0;

  var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  $( "body" ).append( renderer.domElement );

  scene.add(camera);
  camera.position.z = 6;

  let light = new THREE.PointLight( 0xffffff, 3, 100 );
  light.position.set( 0, 0, camera.position.z );
  scene.add( light );

  let width = 3;
  let height = 3;
  let depth = 3;

  let malla = new THREE.Object3D();
  scene.add(malla);

  for(let i = 0; i < width; i++){
    for(let j = 0; j < height; j++){
      for(let k = 0; k < depth; k++){
        let geometry = new THREE.BoxGeometry(0.3, 0);
        let material = new THREE.MeshLambertMaterial({color:  0x0000FF});
        let nodo = new THREE.Mesh(geometry, material);
        geometry.computeFlatVertexNormals();
        nodo.position.x = -( width/2 ) + i;
        nodo.position.y = -( height/2 ) + j;
        nodo.position.z = -( depth/2 ) + k;
        malla.add(nodo);
      }
    }
  }

  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

    malla.children[ counter*2 ].material.color.g = 1.0;
    malla.children[ counter*2 ].material.color.r = 1.0;

    if( counter > 0){
      malla.children[ counter - 1 ].material.color.r = 1.0;
    }

    if(counter == malla.children.length -1){
      malla.children[ counter ].material.color.g = 0.0;
      malla.children[ counter ].material.color.r = 0.0;
    }

    counter++;

    if(counter*2 > malla.children.length -1){
      counter = 1;
    }

    malla.rotation.y;

  };
  animate();

  $(document).keyup( function (e){
    if( e.key == "ArrowRight" && counter_2 >= 0 && counter_2 <= (malla.children.length - 1)){
      counter_2++;
    }

    if( e.key == "ArrowLeft" && counter_2 > 0 ){
      counter_2--;
    }

    for( let i = 0; i < malla.children.length; i++){
      malla.children[ i ].scale.x = 1;
      malla.children[ i ].scale.y = 1;
      malla.children[ i ].scale.z = 1;
      malla.children[ i ].verticesNeedUpdate;
    }

    malla.children[ counter_2 ].scale.x = 1.5;
    malla.children[ counter_2 ].scale.y = 1.5;
    malla.children[ counter_2 ].scale.z = 1.5;
    malla.children[ counter_2 ].verticesNeedUpdate;
  });

});//document ready
