import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Index = () => {
    useEffect(()=>{
        document.getElementById('demo8').appendChild(init())
    })
    const init = ()=>{
        /**
         * 创建场景对象Scene
         */
        var scene = new THREE.Scene();
        
        // var geometry = new THREE.PlaneGeometry(200, 200, 4, 4); //矩形平面
        var geometry1 = new THREE.BoxGeometry(100, 100, 100); //立方体
        // var geometry2 = new THREE.SphereGeometry(60, 25, 25); //球体

        /**
         * 创建一个设置重复纹理的管道
         */
        // var curve = new THREE.CatmullRomCurve3([
        //     new THREE.Vector3(-80, -40, 0),
        //     new THREE.Vector3(-70, 40, 0),
        //     new THREE.Vector3(70, 40, 0),
        //     new THREE.Vector3(80, -40, 0)
        // ]);
        // var tubeGeometry = new THREE.TubeGeometry(curve, 100, 1, 50, false);


        var textureLoader = new THREE.CubeTextureLoader();
        textureLoader.setPath('/static/');


        // TextureLoader创建一个纹理加载器对象，可以加载图片作为几何体纹理
        // var textureLoader = new THREE.TextureLoader();

        // 执行load方法，加载纹理贴图成功后，返回一个纹理对象Texture
        // ['cube1.jpg', 'cube2.jpg', 'cube3.jpg', 'cube4.jpg', 'cube5.jpg', 'cube6.jpg']
        var texture = textureLoader.load(['posx.jpg', 'negx.jpg', 'posy.jpg', 'negy.jpg', 'posz.jpg', 'negz.jpg'])

        // 设置阵列模式   默认ClampToEdgeWrapping  RepeatWrapping：阵列  镜像阵列：MirroredRepeatWrapping
        // texture.wrapS = THREE.RepeatWrapping;
        // texture.wrapT = THREE.RepeatWrapping;
        // // uv两个方向纹理重复数量
        // texture.repeat.set(10, 10);

        // 不设置重复  偏移范围-1~1
        // texture.offset = new THREE.Vector2(0.3, 0.1)

        // // 设置纹理旋转角度
        // texture.rotation = Math.PI/4;
        // // 设置纹理的旋转中心，默认(0,0)
        // texture.center.set(0.5,0.5);

        // 设置x方向的偏移(沿着管道路径方向)，y方向默认1
        //等价texture.repeat= new THREE.Vector2(20,1)
        // texture.repeat.x = 20;

        // console.log(texture);

        // canvas画布对象作为CanvasTexture的参数重建一个纹理对象
        // canvas画布可以理解为一张图片
        // var canvas = document.createElement("canvas");
        // canvas.width = 512;
        // canvas.height = 128;
        // var c = canvas.getContext('2d');
        // // 矩形区域填充背景
        // c.fillStyle = "grey";
        // c.fillRect(0, 0, 512, 128);
        // c.beginPath();
        // // 文字
        // c.beginPath();
        // c.translate(256,64);
        // c.fillStyle = "#ffffff"; //文本填充颜色
        // c.font = "bold 48px 宋体"; //字体样式设置
        // c.textBaseline = "middle"; //文本与fillText定义的纵坐标
        // c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
        // c.fillText("hello", 0, 0);
        // var texture1 = new THREE.CanvasTexture(canvas);

        /**
         * 创建纹理对象的像素数据
         */
        // var w = 32; //纹理宽度
        // var h = 32; //纹理高度
        // var size = w * h; //像素大小
        // var data = new Uint8Array(size * 3); //size*3：像素在缓冲区占用空间
        // for (let i = 0; i < size * 3; i += 3) {
        //     // 随机设置RGB分量的值
        //     data[i] = 255 * Math.random()
        //     data[i + 1] = 255 * Math.random()
        //     data[i + 2] = 255 * Math.random()
        // }
        // var data = new Uint8Array(size * 4); //size*4：像素在缓冲区占用空间
        // for (let i = 0; i < size * 4; i += 4) {
        //     // 随机设置RGB分量的值
        //     data[i] = 255 * Math.random()
        //     data[i + 1] = 255 * Math.random()
        //     data[i + 2] = 255 * Math.random()
        //     // 设置透明度分量A
        //     data[i + 3] = 255 * 0.5
        // }
        // // 创建数据文理对象   RGB格式：THREE.RGBFormat
        // // var texture_custom = new THREE.DataTexture(data, w, h, THREE.RGBFormat);
        // var texture_custom = new THREE.DataTexture(data, w, h, THREE.RGBAFormat);
        // texture_custom.needsUpdate = true; //纹理更新

        var material = new THREE.MeshBasicMaterial({
            // color: 0xffffff,
            // 设置颜色纹理贴图：Texture对象作为材质map属性的属性值
            // map: texture_custom,//设置颜色贴图属性值
            // transparent: true,
            envMap: texture, //设置环境贴图
        }); //材质对象Material

        // var material_normal = new THREE.MeshPhongMaterial({
        //     map: texture,//设置颜色贴图属性值
        //     color: 0xffffff,
        //     normalMap: texture, //法线贴图
        //     normalScale: new THREE.Vector2(3,3),
        // });

        // var material_bump = new THREE.MeshPhongMaterial({
        //     // map: texture,//设置颜色贴图属性值
        //     // bumpMap:texture,//凹凸贴图
        //     // bumpScale:3,//设置凹凸高度，默认值1
        // })

        // var geometry = new THREE.BufferGeometry(); //声明一个空几何体对象
        // //类型数组创建顶点位置position数据
        // var vertices = new Float32Array([
        //     0, 0, 0, //顶点1坐标
        //     80, 0, 0, //顶点2坐标
        //     80, 80, 0, //顶点3坐标
        //     0, 80, 0, //顶点4坐标
        // ]);
        // // 创建属性缓冲区对象
        // var attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组
        // // 设置几何体attributes属性的位置position属性
        // geometry.attributes.position = attribue
        // var normals = new Float32Array([
        //     0, 0, 1, //顶点1法向量
        //     0, 0, 1, //顶点2法向量
        //     0, 0, 1, //顶点3法向量
        //     0, 0, 1, //顶点4法向量
        // ]);
        // // 设置几何体attributes属性的位置normal属性
        // geometry.attributes.normal = new THREE.BufferAttribute(normals, 3); //3个为一组,表示一个顶点的xyz坐标
        // // Uint16Array类型数组创建顶点索引数据
        // var indexes = new Uint16Array([
        //     0, 1, 2, 0, 2, 3,
        // ])
        // // 索引数据赋值给几何体的index属性
        // geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组
        // /**纹理坐标*/
        // var uvs = new Float32Array([
        //     0,0, //图片左下角
        //     1,0, //图片右下角
        //     1,1, //图片右上角
        //     0,1, //图片左上角
        // ]);
        // // 设置几何体attributes属性的位置normal属性
        // geometry.attributes.uv = new THREE.BufferAttribute(uvs, 2); //2个为一组,表示一个顶点的纹理坐标

        // var material2 = new THREE.MeshLambertMaterial({
        //     color: 0x0000ff,
        // });
        // var material3 = new THREE.MeshLambertMaterial({
        //     color: 0x00ff00,
        // });
        // var materials = [material,material2,material3,material,material2,material3]

        // var tubeMaterial = new THREE.MeshPhongMaterial({
        //     map: texture,
        //     transparent: true,
        // });

        var mesh = new THREE.Mesh(geometry1, material); //网格模型对象Mesh
        // var mesh1 = new THREE.Mesh(geometry1, material); //网格模型对象Mesh
        // var mesh2 = new THREE.Mesh(geometry2, material); //网格模型对象Mesh
        // var mesh3 = new THREE.Mesh(geometry2, material_normal); //网格模型对象Mesh
        // var mesh4 = new THREE.Mesh(geometry, material_bump); //网格模型对象Mesh
        // mesh4.translateX(250); //球体网格模型沿Y轴正方向平移120
        // mesh.rotateX(-Math.PI / 2);
        // var mesh = new THREE.Mesh(tubeGeometry,tubeMaterial)
        scene.add(mesh); //网格模型添加到场景中

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

        /**
         * 相机设置
         */
        var width = window.innerWidth; //窗口宽度
        var height = window.innerHeight; //窗口高度

        var camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);

        // var k = width / height; //窗口宽高比
        // var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        // var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);

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
            // 使用加减法可以设置不同的运动方向
            // 设置纹理偏移
            // texture.offset.x -= 0.06
        }
        render()
        new OrbitControls(camera,renderer.domElement);//创建控件对象

        // onresize 事件会在窗口被调整大小时发生
        window.onresize=function(){
            // 重置渲染器输出画布canvas尺寸
            renderer.setSize(window.innerWidth,window.innerHeight);

            // OrthographicCamera 正投影相机
            // // 重置相机投影的相关参数
            // k = window.innerWidth/window.innerHeight;//窗口宽高比
            // camera.left = -s*k;
            // camera.right = s*k;
            // camera.top = s;
            // camera.bottom = -s;

            // PerspectiveCamera 透视投影相机
            camera.aspect = window.innerWidth/window.innerHeight;

            // 渲染器执行render方法的时候会读取相机对象的投影矩阵属性projectionMatrix
            // 但是不会每渲染一帧，就通过相机的属性计算投影矩阵(节约计算资源)
            // 如果相机的一些属性发生了变化，需要执行updateProjectionMatrix ()方法更新相机的投影矩阵
            camera.updateProjectionMatrix ();
        };
        return renderer.domElement
    }
    return <div id="demo8"></div>;
};

export default Index;
