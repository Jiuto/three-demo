import React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Index = () => {
    const init = ()=>{
        /**
         * 创建场景对象Scene
         */
        var scene = new THREE.Scene();

        var geometry1 = new THREE.BoxGeometry(100, 10, 10); //创建一个立方体几何对象Geometry
        var material1 = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        }); //材质对象Material
        var mesh1 = new THREE.Mesh(geometry1, material1); //网格模型对象Mesh
        mesh1.name = "Box"; //网格模型1命名

        var geometry2 = new THREE.SphereGeometry(20, 20, 20); //创建一个球体几何对象
        var material2 = new THREE.MeshStandardMaterial({
            color: 0xffffff,
        }); //材质对象Material
        var mesh2 = new THREE.Mesh(geometry2, material2); //网格模型对象Mesh
        mesh2.name = "Sphere"; //网格模型2命名

        var group = new THREE.Group()
        group.add(mesh1); //网格模型添加到组中
        group.add(mesh2); //网格模型添加到组中

        scene.add(group)

        /**
         * 编辑group子对象网格模型mesh1和mesh2的帧动画数据
         */
        // 创建位置关键帧对象：0时刻对应位置0, 0, 0   10时刻对应位置150, 0, 0
        var posTrack = new THREE.KeyframeTrack('Box.position', [0, 10], [0, 0, 0, 150, 0, 0]);
        // 创建颜色关键帧对象：10时刻对应颜色1, 0, 0   20时刻对应颜色0, 0, 1
        var colorKF = new THREE.KeyframeTrack('Box.material.color', [10, 20], [1, 1, 1, 0, 1, 0]);
        // 创建名为Sphere对象的关键帧数据  从0~20时间段，尺寸scale缩放3倍
        var scaleTrack = new THREE.KeyframeTrack('Sphere.scale', [0, 20], [1, 1, 1, 2, 2, 2]);

        var duration = 20;
        // 多个帧动画作为元素创建一个剪辑clip对象，命名"default"，持续时间20
        var clip = new THREE.AnimationClip("default", duration, [posTrack, colorKF, scaleTrack]);

        /**
         * 播放编辑好的关键帧数据
         */
        // group作为混合器的参数，可以播放group中所有子对象的帧动画
        var mixer = new THREE.AnimationMixer(group);
        // 剪辑clip作为参数，通过混合器clipAction方法返回一个操作对象AnimationAction
        var AnimationAction = mixer.clipAction(clip);
        //通过操作Action设置播放方式
        // AnimationAction.timeScale = 5;//默认1，可以调节播放速度

        AnimationAction.loop = THREE.LoopOnce; //不循环播放
        AnimationAction.clampWhenFinished = true; //暂停在最后一帧播放的状态

        // 播放特定时间段
        AnimationAction.time = 8; //操作对象设置开始播放时间
        clip.duration = 18;//剪辑对象设置播放结束时间

        AnimationAction.play();//开始播放

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

        var camera = new THREE.PerspectiveCamera(50, width / height, 1, 1000);

        camera.position.set(200,200,300); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
        document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

        // 创建一个时钟对象Clock
        var clock = new THREE.Clock();
        // 执行渲染操作   指定场景、相机作为参数
        function render() {
            renderer.render(scene,camera);//执行渲染操作
            requestAnimationFrame(render);
            //clock.getDelta()方法获得两帧的时间间隔
            // 更新混合器相关的时间
            mixer.update(clock.getDelta());
        }
        render()
        new OrbitControls(camera,renderer.domElement);//创建控件对象

    }
    init()
    return <div></div>;
};

export default Index;
