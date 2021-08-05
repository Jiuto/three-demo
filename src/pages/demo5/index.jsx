import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Index = () => {
    const init = ()=>{
        /**
         * 创建场景对象Scene
         */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        var geometry1 = new THREE.BoxGeometry(40, 100, 40); //创建一个立方体几何对象Geometry
        var material1 = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        }); //材质对象Material
        var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
        // 设置产生投影的网格模型
        mesh1.castShadow = true;
        scene.add(mesh1); //网格模型添加到场景中

        var axisHelper = new THREE.AxisHelper(250);
        scene.add(axisHelper);

        //创建一个平面几何体作为投影面
        var planeGeometry = new THREE.PlaneGeometry(500, 500);
        var planeMaterial = new THREE.MeshLambertMaterial({
            color: 0xffffff
        });
        // 平面网格模型作为投影面
        var planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
        planeMesh.rotateX(-Math.PI / 2); //旋转网格模型
        planeMesh.position.y = -50; //设置网格模型y坐标
        // 设置接收阴影的投影面
        planeMesh.receiveShadow = true;
        scene.add(planeMesh); //网格模型添加到场景中

        /**
         * 光源设置
         */
        //点光源
        // var point = new THREE.PointLight(0xffffff);
        // point.position.set(400, 400, 300); //点光源位置
        // scene.add(point); //点光源添加到场景中

        // 平行光
        // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // // 设置光源的方向：通过光源position属性和目标指向对象的position属性计算
        // directionalLight.position.set(60, 100, 40);
        // // 方向光指向对象网格模型，可以不设置，默认的位置是0,0,0
        // // directionalLight.target = mesh1;
        
        // // 设置用于计算阴影的光源对象
        // directionalLight.castShadow = true;
        // // 设置计算阴影的区域，最好刚好紧密包围在对象周围
        // // 计算阴影的区域过大：模糊  过小：看不到或显示不完整
        // directionalLight.shadow.camera.near = 0.5;
        // directionalLight.shadow.camera.far = 300;
        // directionalLight.shadow.camera.left = -50;
        // directionalLight.shadow.camera.right = 50;
        // directionalLight.shadow.camera.top = 200;
        // directionalLight.shadow.camera.bottom = -100;
        // // 设置mapSize属性可以使阴影更清晰，不那么模糊
        // directionalLight.shadow.mapSize.set(1024,1024)
        // scene.add(directionalLight);

        // var directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight,10);
        // scene.add(directionalLightHelper)

        // 聚光光源
        var spotLight = new THREE.SpotLight(0xffffff);
        // 设置聚光光源位置
        spotLight.position.set(100, 200, 200);
        // 聚光灯光源指向网格模型
        spotLight.target = mesh1;
        // 设置聚光光源发散角度
        spotLight.angle = Math.PI / 6
        scene.add(spotLight);//光对象添加到scene场景中
        // 设置用于计算阴影的光源对象
        spotLight.castShadow = true;
        // 设置计算阴影的区域，注意包裹对象的周围
        spotLight.shadow.camera.near = 0.5;
        spotLight.shadow.camera.far = 500;
        spotLight.shadow.camera.fov = 20;
        spotLight.shadow.mapSize.set(1024,1024)

        var spotLightHelper = new THREE.SpotLightHelper(spotLight, 'white');
        scene.add(spotLightHelper)

        //环境光
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        
        /**
         * 相机设置
         */
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度
        var k = width / height; //窗口宽高比
        var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        renderer.shadowMap.enabled = true;
        document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
        // 执行渲染操作   指定场景、相机作为参数
        // let T0 = new Date();//上次时间
        function render() {
            // let T1 = new Date();//本次时间
            // let t = T1-T0;//时间差
            // T0 = T1;//把本次时间赋值给上次时间
            renderer.render(scene,camera);//执行渲染操作
            // mesh.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
            requestAnimationFrame(render);
        }
        render()
        var controls = new OrbitControls(camera,renderer.domElement);//创建控件对象
        // controls.addEventListener('change', render);//监听鼠标、键盘事件' 与requestAnimationFrame二选一
    }
    init()
    return <div></div>;
};

export default Index;
