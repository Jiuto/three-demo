import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Index = () => {
    useEffect(()=>{
        document.getElementById('demo6').appendChild(init())
    })
    const init = ()=>{
        /**
         * 创建场景对象Scene
         */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        // //创建两个网格模型mesh1、mesh2
        // var geometry = new THREE.BoxGeometry(100, 100, 100);
        // var material = new THREE.MeshLambertMaterial({color: 0x0000ff});
        // var group = new THREE.Group();
        // var mesh1 = new THREE.Mesh(geometry, material);
        // var mesh2 = new THREE.Mesh(geometry, material);

        // mesh2.translateX(150);
        // //把mesh1型插入到组group中，mesh1作为group的子对象
        // group.add(mesh1);
        // //把mesh2型插入到组group中，mesh2作为group的子对象
        // group.add(mesh2);
        // //沿着Y轴平移mesh1和mesh2的父对象，mesh1和mesh2跟着平移
        // group.translateY(100);
        // //父对象缩放，子对象跟着缩放
        // group.scale.set(0.5,0.5,0.5);
        // //父对象旋转，子对象跟着旋转
        // group.rotateY(Math.PI/6)
        
        // //把group插入到场景中作为场景子对象
        // scene.add(group);

        // console.log(group.children)
        // console.log(scene.children);

        // 删除父对象group的子对象网格模型mesh1
        // group.remove(mesh1)

        // // 头部网格模型和组
        // var headMesh = sphereMesh(10, 0, 0, 0);
        // headMesh.name = "脑壳"
        // var leftEyeMesh = sphereMesh(1, 8, 5, 4);
        // leftEyeMesh.name = "左眼"
        // var rightEyeMesh = sphereMesh(1, 8, 5, -4);
        // rightEyeMesh.name = "右眼"
        // var headGroup = new THREE.Group();
        // headGroup.name = "头部"
        // headGroup.add(headMesh, leftEyeMesh, rightEyeMesh);
        // // 身体网格模型和组
        // var neckMesh = cylinderMesh(3, 10, 0, -15, 0);
        // neckMesh.name = "脖子"
        // var bodyMesh = cylinderMesh(14, 30, 0, -35, 0);
        // bodyMesh.name = "腹部"
        // var leftLegMesh = cylinderMesh(4, 60, 0, -80, -7);
        // leftLegMesh.name = "左腿"
        // var rightLegMesh = cylinderMesh(4, 60, 0, -80, 7);
        // rightLegMesh.name = "右腿"
        // var legGroup = new THREE.Group();
        // legGroup.name = "腿"
        // legGroup.add(leftLegMesh, rightLegMesh);
        // var bodyGroup = new THREE.Group();
        // bodyGroup.name = "身体"
        // bodyGroup.add(neckMesh, bodyMesh, legGroup);
        // // 人Group
        // var personGroup = new THREE.Group();
        // personGroup.name = "人"
        // personGroup.add(headGroup, bodyGroup)
        // personGroup.translateY(50)
        // scene.add(personGroup);

        // // 球体网格模型创建函数
        // function sphereMesh(R, x, y, z) {
        //     var geometry = new THREE.SphereGeometry(R, 25, 25); //球体几何体
        //     var material = new THREE.MeshPhongMaterial({
        //         color: 0x0000ff
        //     }); //材质对象Material
        //     var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
        //     mesh.position.set(x, y, z);
        //     return mesh;
        // }
        // // 圆柱体网格模型创建函数
        // function cylinderMesh(R, h, x, y, z) {
        //     var geometry = new THREE.CylinderGeometry(R, R, h, 25, 25); //球体几何体
        //     var material = new THREE.MeshPhongMaterial({
        //         color: 0x0000ff
        //     }); //材质对象Material
        //     var mesh = new THREE.Mesh(geometry, material); // 创建网格模型对象
        //     mesh.position.set(x, y, z);
        //     return mesh;
        // }


        // scene.traverse(function(obj) {
        //     if (obj.type === "Group") {
        //         // console.log(obj.name);
        //     }
        //     if (obj.type === "Mesh") {
        //         // console.log('  ' + obj.name);
        //         obj.material.color.set(0xffff00);
        //     }
        //     if (obj.name === "左眼" | obj.name === "右眼") {
        //         obj.material.color.set(0x000000)
        //     }
        //     // 打印id属性
        //     console.log(obj.id,obj.name);
        //     // // 打印该对象的父对象
        //     // console.log(obj.parent);
        //     // // 打印该对象的子对象
        //     // console.log(obj.children);
        // })

        // 遍历查找scene中复合条件的子对象，并返回id对应的对象
        // var idNode = scene.getObjectById ( 13 );
        // console.log(idNode);
        // 遍历查找对象的子对象，返回name对应的对象（name是可以重名的，返回第一个）
        // var nameNode = scene.getObjectByName ( "左腿" );
        // nameNode.material.color.set(0xff0000);

        var geometry = new THREE.BoxGeometry(100, 100, 100);
        var material = new THREE.MeshLambertMaterial({color: 0x0000ff});
        var mesh = new THREE.Mesh(geometry, material);
        // mesh的本地坐标设置为(50, 0, 0)
        mesh.position.set(50, 0, 0);
        var group = new THREE.Group();
        // group本地坐标设置和mesh一样设置为(50, 0, 0)
        // mesh父对象设置position会影响得到mesh的世界坐标
        group.position.set(50, 0, 0);
        group.add(mesh);
        scene.add(group);

        // .position属性获得本地坐标
        console.log('本地坐标',mesh.position);

        // getWorldPosition()方法获得世界坐标
        //该语句默认在threejs渲染的过程中执行,如果渲染之前想获得世界矩阵属性、世界位置属性等属性，需要通过代码更新
        scene.updateMatrixWorld(true);
        var worldPosition = new THREE.Vector3();
        mesh.getWorldPosition(worldPosition);
        console.log('世界坐标',worldPosition);

        var axisHelper = new THREE.AxisHelper(300);
        scene.add(axisHelper);

        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 400, 300); //点光源位置
        scene.add(point); //点光源添加到场景中

        //环境光
        var ambient = new THREE.AmbientLight(0x444444);
        scene.add(ambient);
        
        // 一次删除场景中多个对象
        // scene.remove(point,ambient)

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
        return renderer.domElement
    }
    return <div id="demo6"></div>;
};

export default Index;
