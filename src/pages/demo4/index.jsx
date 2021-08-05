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
        var geometry1 = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        var material1 = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        }); //材质对象Material
        var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
        var mesh2 = mesh1.clone();
        // mesh1.scale.set(0.5, 1.5, 2)
        // mesh1.scale.x = 2.0;
        // mesh1.position.y = 100;
        // mesh1.position.set(100,100,100);
        //向量Vector3对象表示方向
        var axis = new THREE.Vector3(1, 1, 1);
        axis.normalize(); //向量归一化
        //沿着axis轴表示方向平移100
        mesh1.translateOnAxis(axis, 100);
        // mesh1.rotateX(Math.PI/4);//绕x轴旋转π/4
        var axis2 = new THREE.Vector3(0,1,0);//向量axis
        mesh1.rotateOnAxis(axis2,Math.PI/8);//绕axis轴旋转π/8
        
        geometry1.scale(1.5,1.5,1.5);
        
        scene.add(mesh1,mesh2); //网格模型添加到场景中

        var axisHelper = new THREE.AxisHelper(250);
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
