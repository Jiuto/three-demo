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
         * 创建骨骼网格模型SkinnedMesh
         */
        // 创建一个圆柱几何体，高度120，顶点坐标y分量范围[-60,60]
        var geometry = new THREE.CylinderGeometry(5, 10, 120, 50, 300);  //CylinderBufferGeometry
        geometry.translate(0, 60, 0); //平移后，y分量范围[0,120]

        var vertices = geometry.attributes.position,    //顶点坐标
            vertex = new THREE.Vector3(), //创建一个三维向量用于保存顶点坐标
            skinIndices = [],
            skinWeights = [],
            weight;
        /**
         * 设置几何体对象Geometry的蒙皮索引skinIndices、权重skinWeights属性
         * 实现一个模拟腿部骨骼运动的效果
         */
        //遍历几何体顶点，为每一个顶点设置蒙皮索引、权重属性
        //根据y来分段，0~60一段、60~100一段、100~120一段
        for (var i = 0; i < vertices.count; i++) {
            vertex.fromBufferAttribute(vertices,i); //第i个顶点         
            if (vertex.y <= 60) {
                weight = vertex.y / 60
                skinIndices.push(0, 0, 0, 0);
                skinWeights.push(1 - weight, weight, 0, 0);
            } else if (60 < vertex.y && vertex.y <= 100) {
                weight = (vertex.y - 60) / 40
                skinIndices.push(0, 1, 0, 0);
                skinWeights.push(1 - weight, weight, 0, 0);
            } else if (100 < vertex.y && vertex.y <= 120) {
                weight = (vertex.y - 100) / 20
                skinIndices.push(1, 2, 0, 0);
                skinWeights.push(1 - weight, weight, 0, 0);
            }
        }
        geometry.setAttribute( 'skinIndex', new THREE.Uint16BufferAttribute( skinIndices, 4 ) ); //几何体中添加skinIndex属性
        geometry.setAttribute( 'skinWeight', new THREE.Float32BufferAttribute( skinWeights, 4 ) ); //几何体中添加skinWeight属性
        
        // 材质对象
        var material = new THREE.MeshPhongMaterial({
            skinning: true, //允许蒙皮动画
        });

        /**
         * 骨骼系统
         */
        var Bone1 = new THREE.Bone(); //关节1，用来作为根关节
        var Bone2 = new THREE.Bone(); //关节2
        var Bone3 = new THREE.Bone(); //关节3
        // 设置关节父子关系   多个骨头关节构成一个树结构
        Bone1.add(Bone2);
        Bone2.add(Bone3);
        // 设置关节之间的相对位置
        //根关节Bone1默认位置是(0,0,0)
        Bone2.position.y = 60; //Bone2相对父对象Bone1位置
        Bone3.position.y = 40; //Bone3相对父对象Bone2位置

        // 所有Bone对象插入到Skeleton中，全部设置为.bones属性的元素
        var skeleton = new THREE.Skeleton([Bone1, Bone2, Bone3]); //创建骨骼系统

        // 创建骨骼网格模型
        var SkinnedMesh = new THREE.SkinnedMesh(geometry, material);

        //骨骼关联网格模型
        SkinnedMesh.add(Bone1); //根骨头关节添加到网格模型
        SkinnedMesh.bind(skeleton); //网格模型绑定到骨骼系统

        SkinnedMesh.position.set(50, 120, 50); //设置网格模型位置
        SkinnedMesh.rotateX(Math.PI); //旋转网格模型
        scene.add(SkinnedMesh); //网格模型添加到场景中

        /**
         * 骨骼辅助显示
         */
        var skeletonHelper = new THREE.SkeletonHelper(SkinnedMesh);
        scene.add(skeletonHelper);
        
        // 转动关节带动骨骼网格模型出现弯曲效果  好像腿弯曲一样
        // skeleton.bones[1].rotation.x = 0.3;
        // skeleton.bones[2].rotation.x = 0.3;



        /**
         * 创建网格模型，并给模型的几何体设置多个变形目标
         */
        // 创建一个几何体具有8个顶点
        var geometry1 = new THREE.BoxGeometry(50, 50, 50); //立方体几何对象
        console.log(geometry1);
        // 为geometry提供变形目标的数据
        var box1 = new THREE.BoxGeometry(100, 5, 100); //为变形目标1提供数据
        var box2 = new THREE.BoxGeometry(5, 200, 5); //为变形目标2提供数据
        var morphPositions1 = []
        var positions1 = box1.attributes.position.array
        for (let i = 0; i < positions1.length; i++) {
            morphPositions1.push(positions1[i] * 0.5)
        }
        var morphAttribute1 = new THREE.BufferAttribute(Float32Array.from(morphPositions1), 3)
        morphAttribute1.name = 'target1'
        var morphPositions2 = []
        var positions2 = box2.attributes.position.array
        for (let i = 0; i < positions2.length; i++) {
            morphPositions2.push(positions2[i] * 0.5)
        }
        var morphAttribute2 = new THREE.BufferAttribute(Float32Array.from(morphPositions2), 3)
        morphAttribute2.name = 'target2'
        // 设置变形目标的数据
        geometry1.morphAttributes.position = [morphAttribute1,morphAttribute2];

        var material1 = new THREE.MeshLambertMaterial({
            morphTargets: true, //允许变形
            color: 0x0000ff
        }); //材质对象
        var mesh = new THREE.Mesh(geometry1, material1); //网格模型对象
        mesh.translateX(100)
        scene.add(mesh); //网格模型添加到场景中

        mesh.morphTargetInfluences[0] = 0.5;
        mesh.morphTargetInfluences[1] = 1;

        /**
         * 设置关键帧数据
         */
        // 设置变形目标1对应权重随着时间的变化
        var Track1 = new THREE.KeyframeTrack('.morphTargetInfluences[0]', [0,10,20], [0,1, 0]);
        // 设置变形目标2对应权重随着时间的变化
        var Track2 = new THREE.KeyframeTrack('.morphTargetInfluences[1]', [20,30, 40], [0, 1,0]);
        // 创建一个剪辑clip对象，命名"default"，持续时间40
        var clip = new THREE.AnimationClip("default", 40, [Track1,Track2]);
        /**
         * 播放编辑好的关键帧数据
         */
        var mixer = new THREE.AnimationMixer(mesh); //创建混合器
        var AnimationAction = mixer.clipAction(clip); //返回动画操作对象
        AnimationAction.timeScale = 5; //默认1，可以调节播放速度
        // AnimationAction.loop = THREE.LoopOnce; //不循环播放
        // AnimationAction.clampWhenFinished=true;//暂停在最后一帧播放的状态
        AnimationAction.play(); //开始播放

 
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



        // var n = 0;
        // var T = 30;
        // var step = 0.01;

        // 创建一个时钟对象Clock
        var clock = new THREE.Clock();

        // 执行渲染操作   指定场景、相机作为参数
        function render() {
            renderer.render(scene,camera);//执行渲染操作
            requestAnimationFrame(render);

            // n += 1;
            // if (n < T) {
            //     // 改变骨关节角度
            //     skeleton.bones[0].rotation.x -= step;
            //     skeleton.bones[1].rotation.x += step;
            //     skeleton.bones[2].rotation.x += 2 * step;
            // }
            // if (n < 2 * T && n > T) {
            //     skeleton.bones[0].rotation.x += step;
            //     skeleton.bones[1].rotation.x -= step;
            //     skeleton.bones[2].rotation.x -= 2 * step;
            // }
            // if (n === 2 * T) {
            //     n = 0;
            // }

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
