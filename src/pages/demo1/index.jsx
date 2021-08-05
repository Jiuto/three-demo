import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Index = () => {
    useEffect(()=>{
        document.getElementById('demo1').appendChild(init())
    })
    const init = ()=>{
        /**
         * 创建场景对象Scene
         */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        var geometry1 = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
        // geometry1.scale(0.5, 1.5, 2);
        var material1 = new THREE.MeshStandardMaterial({
            color: 0xffffff,
            opacity:0.2,
            transparent:true,
        }); //材质对象Material
        var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
        scene.add(mesh1); //网格模型添加到场景中

        var geometry2 = new THREE.SphereGeometry(60, 40, 40); //创建一个球体几何对象
        var material2 = new THREE.MeshLambertMaterial({
            color:0x00ff00,
            wireframe: true,
        }); //材质对象Material
        var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
        mesh2.translateY(120); //球体网格模型沿Y轴正方向平移120
        // mesh2.scale.set(0.5, 1.5, 2)
        scene.add(mesh2); //网格模型添加到场景中

        var geometry3 = new THREE.CylinderGeometry(50, 50, 100, 25); // 圆柱体
        var material3 = new THREE.MeshPhongMaterial({
            color: 0xffff00,
            specular:0x4488ee,
            shininess:12,
        });
        var mesh3 = new THREE.Mesh(geometry3, material3); //网格模型对象Mesh
        mesh3.position.set(150,0,0);//设置mesh3模型对象的xyz坐标为120,0,0
        scene.add(mesh3);

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
        // 执行渲染操作   指定场景、相机作为参数
        function render() {
            renderer.render(scene,camera);//执行渲染操作
            requestAnimationFrame(render);
        }
        render()
        new OrbitControls(camera,renderer.domElement);//创建控件对象
        return renderer.domElement
    }
    return <div id="demo1"></div>;
};

export default Index;
