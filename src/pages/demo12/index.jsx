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
         * 创建网格模型，并给模型的几何体设置多个变形目标
         */
        // 创建一个几何体具有8个顶点
        var geometry = new THREE.BoxGeometry(50, 50, 50); //立方体几何对象
        // 控制台查看立方体数据
        console.log(geometry);
        // 控制台查看geometry.toJSON()结果
        console.log(geometry.toJSON());
        // JSON对象转化为字符串
        console.log(JSON.stringify(geometry.toJSON()));
        // JSON.stringify()方法内部会自动调用参数的toJSON()方法
        console.log(JSON.stringify(geometry));

        var material = new THREE.MeshLambertMaterial({
            color: 0x0000ff
        }); //材质对象
        console.log(material);
        console.log(material.toJSON());
        console.log(JSON.stringify(material));

        var mesh = new THREE.Mesh(geometry, material); //网格模型对象

        scene.add(mesh); //网格模型添加到场景中
        console.log(scene);
        console.log(scene.toJSON());

 
        var axisHelper = new THREE.AxisHelper(300)
        scene.add(axisHelper)

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

        var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);

        camera.position.set(200,200,300); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

        // 执行渲染操作   指定场景、相机作为参数
        function render() {
            renderer.render(scene,camera);//执行渲染操作
            requestAnimationFrame(render);
        }
        render()
        new OrbitControls(camera,renderer.domElement);//创建控件对象

    }
    init()
    return <div></div>;
};

export default Index;
