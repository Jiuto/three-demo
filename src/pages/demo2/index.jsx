import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Index = () => {
    useEffect(()=>{
        document.getElementById('demo2').appendChild(init())
    })
    const init = ()=>{
        /**
         * 创建场景对象Scene
         */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
        //类型数组创建顶点数据
        var vertices = new Float32Array([
            0, 0, 0, //顶点1坐标
            50, 0, 0, //顶点2坐标
            0, 100, 0, //顶点3坐标

            0, 0, 0, //顶点4坐标
            0, 0, 100, //顶点5坐标
            50, 0, 0, //顶点6坐标
        ]);
        // 设置几何体attributes属性的位置属性
        geometry.attributes.position = new THREE.BufferAttribute(vertices, 3);;

        //类型数组创建顶点颜色color数据
        var colors = new Float32Array([
            1, 0, 0, //顶点1颜色
            0, 1, 0, //顶点2颜色
            0, 0, 1, //顶点3颜色

            1, 1, 0, //顶点4颜色
            0, 1, 1, //顶点5颜色
            1, 0, 1, //顶点6颜色
        ]);
        // 设置几何体attributes属性的颜色color属性
        geometry.attributes.color = new THREE.BufferAttribute(colors, 3); //3个为一组,表示一个顶点的颜色数据RGB
        
        // 设定顶点法向量
        var normals = new Float32Array([
            0, 0, 1, //顶点1法向量
            0, 0, 1, //顶点2法向量
            0, 0, 1, //顶点3法向量

            0, 1, 0, //顶点4法向量
            0, 1, 0, //顶点5法向量
            0, 1, 0, //顶点6法向量
        ]);
        // 设置几何体attributes属性的位置normal属性
        geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的法向量数据

        // 三角面(网格)渲染模式
        var material = new THREE.MeshLambertMaterial({
            color: 0xffff00,
            // vertexColors: THREE.VertexColors, //以顶点颜色为准
            side: THREE.DoubleSide //两面可见
        }); //材质对象
        var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
        scene.add(mesh);

        // 点渲染模式
        // var material = new THREE.PointsMaterial({
        //     // color: 0xff0000,
        //     vertexColors: THREE.VertexColors, //以顶点颜色为准
        //     size: 10.0 //点对象像素尺寸
        // }); //材质对象
        // var points = new THREE.Points(geometry, material); //点模型对象
        // scene.add(points); //点对象添加到场景中

        // 线条渲染模式
        // var material=new THREE.LineBasicMaterial({
        //     // color:0xff0000 //线条颜色
        //     vertexColors: THREE.VertexColors, //以顶点颜色为准
        // });//材质对象
        // var line=new THREE.Line(geometry,material);//线条模型对象
        // scene.add(line);//线条对象添加到场景中

        // 绘制一个矩形
        var geometry1 = new THREE.BufferGeometry()

        var vertices1 = new Float32Array([
            0, 0, 0,
            0, 100, 0,
            0, 100, 100,
            0, 0, 100,
        ])
        geometry1.attributes.position = new THREE.BufferAttribute(vertices1, 3)

        var normals1 = new Float32Array([
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
        ])
        geometry1.attributes.normal = new THREE.BufferAttribute(normals1, 3)

        // 顶点索引
        var indexes = new Uint16Array([
            0, 1, 2,
            0, 2, 3,
        ])
        // 索引数据赋值给几何体的index属性
        geometry1.index = new THREE.BufferAttribute(indexes, 1); //1个为一组

        var material1 = new THREE.MeshLambertMaterial({
            color: 0x00ff00,
        });
        var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
        scene.add(mesh1);


        var axisHelper = new THREE.AxisHelper(250);
        scene.add(axisHelper);
        /**
         * 光源设置
         */
        //点光源
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300); //点光源位置
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
    return <div id="demo2"></div>;
};

export default Index;
