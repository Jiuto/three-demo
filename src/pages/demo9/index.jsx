import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Index = () => {
    useEffect(()=>{
        document.getElementById('demo9').appendChild(init())
    })
    const init = ()=>{
        /**
         * 创建场景对象Scene
         */
        var scene = new THREE.Scene();

        var texture = new THREE.TextureLoader().load("/static/snow.png");
        // 创建组对象，包含所有精灵对象
        let group = new THREE.Group();
        // 文件加载对象
        // var loader = new THREE.FileLoader().setResponseType('json');
        // loader.load('/static/data/demo9.json', function(data) {
        //     //遍历数据
        //     data.forEach(elem => {
            for(let i = 0; i < 300; i++){
                let value = Math.random() * 300,
                    x = Math.random() * 600 * (Math.random() > 0.5 ? 1 : -1),
                    y = Math.random() * 300 * (Math.random() > 0.5 ? 1 : -1);
                // 精灵材质
                var spriteMaterial = new THREE.SpriteMaterial({
                    map: texture, //设置精灵纹理贴图
                    transparent: true,
                    opacity: 0.5,
                });
                // 创建精灵模型对象
                var sprite = new THREE.Sprite(spriteMaterial);
                
                // 控制精灵大小，使用数据大小设置精灵模型的大小
                // 注意适当缩放,以便得到更好的显示效果
                var k = value / 12
                sprite.scale.set(k, k, 1);
                //获得城市坐标设置精灵模型对象的位置
                sprite.position.set(x, y, 1)

                group.add(sprite);
            }
            // });
            scene.add(group);//把精灵群组插入场景中
        // })

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

        camera.position.set(10,80,300); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
        /**
         * 创建渲染器对象
         */
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);//设置渲染区域尺寸
        renderer.setClearColor(0x111111, 1); //设置背景颜色
        // 执行渲染操作   指定场景、相机作为参数
        function render() {
            renderer.render(scene,camera);//执行渲染操作
            requestAnimationFrame(render);
            group.children.forEach(sprite => {
                // 雨滴的y坐标每次减1
                sprite.position.y -= 1;
                if (sprite.position.y < -300) {
                  // 如果雨滴落到地面，重置y，从新下落
                  sprite.position.y = 200;
                }
            });
        }
        render()
        new OrbitControls(camera,renderer.domElement);//创建控件对象
        return renderer.domElement
    }
    return <div id="demo9"></div>;
};

export default Index;
