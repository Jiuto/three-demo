import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Index = () => {
    useEffect(()=>{
        document.getElementById('demo3').appendChild(init())
    })
    const init = ()=>{
        /**
         * 创建场景对象Scene
         */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        // var geometry = new THREE.SphereGeometry(100, 25, 25); //创建一个球体几何对象
        // // 创建一个点材质对象
        // var material = new THREE.PointsMaterial({
        //     color: 0x0000ff, //颜色
        //     size: 3, //点渲染尺寸
        // });
        // //点模型对象  参数：几何体  点材质
        // var point = new THREE.Points(geometry, material);
        // scene.add(point); //网格模型添加到场景中

        var geometry = new THREE.SphereGeometry(100, 25, 25);//球体

        // 直线基础材质对象
        // var material = new THREE.LineBasicMaterial({
        //     color: 0x0000ff
        // });
        // var line = new THREE.Line(geometry, material); //线模型对象

        // 虚线材质对象：产生虚线效果
        var material = new THREE.LineDashedMaterial({
            color: 0x0000ff,
            dashSize: 10,//显示线段的大小。默认为3。
            gapSize: 5,//间隙的大小。默认为1
        });
        var line = new THREE.Line(geometry, material); // 线模型对象
        // computeLineDistances方法 计算LineDashedMaterial所需的距离数组
        line.computeLineDistances();

        scene.add(line); //点模型添加到场景中

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
    return <div id="demo3"></div>;
};

export default Index;
