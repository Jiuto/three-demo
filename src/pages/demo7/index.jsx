import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const Index = () => {
    useEffect(()=>{
        document.getElementById('demo7').appendChild(init())
    })
    const init = ()=>{
        /**
         * 创建场景对象Scene
         */
        var scene = new THREE.Scene();
        /**
         * 创建网格模型
         */
        // var curve = new THREE.EllipseCurve(
        //     0,  0,            // ax, aY
        //     10, 20,           // xRadius, yRadius
        //     0,  2 * Math.PI,  // aStartAngle, aEndAngle
        //     false,            // aClockwise
        //     0                 // aRotation
        // );
        // var points = curve.getPoints( 50 ); // 圆弧线按照一定的细分精度返回沿着圆弧线分布的顶点坐标
        // var geometry = new THREE.BufferGeometry().setFromPoints( points );
        // var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
        // var ellipse = new THREE.Line( geometry, material );
        // scene.add(ellipse)

        // var geometry = new THREE.BufferGeometry(); //声明一个几何体对象Geometry
        // 直线
        // var p1 = new THREE.Vector3(50, 0, 0); //顶点1坐标
        // var p2 = new THREE.Vector3(0, 70, 0); //顶点2坐标
        // // 三维直线LineCurve3
        // var LineCurve = new THREE.LineCurve3(p1, p2);
        // // 二维直线LineCurve
        // // var LineCurve = new THREE.LineCurve(new THREE.Vector2(50, 0), new THREE.Vector2(0, 70));
        // var pointArr = LineCurve.getPoints(10);

        // 三维样条曲线
        var curve = new THREE.CatmullRomCurve3([
            new THREE.Vector3(-50, 20, 90),
            new THREE.Vector3(-10, 40, 40),
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(60, -60, 0),
            new THREE.Vector3(70, 0, 80)
        ]);

        // 三维二次贝赛尔曲线
        // var p1 = new THREE.Vector3(-80, 0, 0);
        // var p2 = new THREE.Vector3(20, 100, 0);
        // var p3 = new THREE.Vector3(80, 0, 0);
        // var curve = new THREE.QuadraticBezierCurve3(p1, p2, p3);

        // 组合曲线
        var R = 80;
        // var arc = new THREE.ArcCurve(0, 0, R, 0, Math.PI, true);
        // // var p1 = new THREE.Vector3(R, 0, 0);
        // // var p3 = new THREE.Vector3(0, -R, 0);
        // // var p5 = new THREE.Vector3(-R, 0, 0);
        // // var line3 = new THREE.CatmullRomCurve3([p1,p3,p5])
        // var line1 = new THREE.LineCurve3(new THREE.Vector3(R, 100, 0), new THREE.Vector3(R, 0, 0));
        // var line2 = new THREE.LineCurve3(new THREE.Vector3(-R, 0, 0), new THREE.Vector3(-R, 100, 0));
        // // 创建组合曲线对象CurvePath
        // var curve = new THREE.CurvePath();
        // // 把多个线条插入到CurvePath中
        // curve.curves.push(line1, arc, line2);

        // var pointArr = curve.getPoints(100);
        // geometry.setFromPoints(pointArr);



        // 管道
        // 创建多段线条的顶点数据
        // var p1 = new THREE.Vector3(-85.35, -35.36, 0)
        // var p2 = new THREE.Vector3(-50, 0, 0);
        // var p3 = new THREE.Vector3(0, 50, 0);
        // var p4 = new THREE.Vector3(50, 0, 0);
        // var p5 = new THREE.Vector3(85.35, -35.36, 0);
        // // 创建线条一：直线
        // let line1 = new THREE.LineCurve3(p1,p2);
        // // 重建线条2：三维样条曲线
        // var line3 = new THREE.CatmullRomCurve3([p2, p3, p4]);
        // // 创建线条3：直线
        // let line2 = new THREE.LineCurve3(p4,p5);
        // var curve = new THREE.CurvePath();// 创建CurvePath对象
        // curve.curves.push(line1, line3, line2);// 插入多段线条

        // var geometry = new THREE.TubeGeometry(curve, 100, 5, 25, false);


        // var material = new THREE.LineBasicMaterial({
        //     color: 0xffff00,
        // });//材质对象
        // //线条模型对象
        // var line = new THREE.Line(geometry, material);
        // scene.add(line); //线条对象添加到场景中

        // 旋转
        // var points = [
        //     new THREE.Vector2(50,60),
        //     new THREE.Vector2(25,0),
        //     new THREE.Vector2(50,-60)
        // ];
        // var geometry = new THREE.LatheGeometry(points,30);
        
        // 光滑面
        // var shape = new THREE.Shape();//创建Shape对象
        // var points = [//定位定点
        //     new THREE.Vector2(50,60),
        //     new THREE.Vector2(25,0),
        //     new THREE.Vector2(50,-60)
        // ];
        // shape.splineThru(points);//顶点带入样条插值计算函数
        // var splinePoints = shape.getPoints(20);//插值计算细分数20
        // var geometry = new THREE.LatheGeometry(splinePoints,30);//旋转造型

        // shape和轮廓填充ShapeGeometry
        // var points = [
        //     new THREE.Vector2(0, 100),
        //     new THREE.Vector2(60, 0),
        //     new THREE.Vector2(10, 0),
        //     new THREE.Vector2(-10, 60),
        //     new THREE.Vector2(-60, 60),
        //     new THREE.Vector2(0, 100),
        // ]
        // // 通过顶点定义轮廓
        // var shape = new THREE.Shape(points);
        // // shape可以理解为一个需要填充轮廓
        // // 所谓填充：ShapeGeometry算法利用顶点计算出三角面face3数据填充轮廓

        // 圆
        // var shape = new THREE.Shape();
        // shape.absarc(0,0,100,0,2*Math.PI);//圆弧轮廓

        // 矩形
        // var shape = new THREE.Shape();
        // shape.moveTo(0,0);//起点
        // shape.lineTo(0,100);//第2点
        // shape.lineTo(100,100);//第3点
        // shape.lineTo(100,0);//第4点
        // shape.lineTo(0,0);//第5点

        // 外轮廓和内轮廓
        
        // 圆弧与直线连接
        // var shape = new THREE.Shape(); //Shape对象
        // var R = 50;
        // // 绘制一个半径为R、圆心坐标(0, 0)的半圆弧
        // shape.absarc(0, 0, R, 0, Math.PI);
        // //从圆弧的一个端点(-R, 0)到(-R, -200)绘制一条直线
        // shape.lineTo(-R, -200);
        // // 绘制一个半径为R、圆心坐标(0, -200)的半圆弧
        // shape.absarc(0, -200, R, Math.PI, 2 * Math.PI);
        // //从圆弧的一个端点(R, -200)到(-R, -200)绘制一条直线
        // shape.lineTo(R, 0);

        // 一个外轮廓圆弧嵌套三个内圆弧轮廓
        // var shape = new THREE.Shape(); //Shape对象
        // //外轮廓
        // shape.arc(0, 0, 100, 0, 2 * Math.PI);
        // // 内轮廓1
        // var path1 = new THREE.Path();
        // path1.arc(0, 0, 40, 0, 2 * Math.PI);
        // // 内轮廓2
        // var path2 = new THREE.Path();
        // path2.arc(80, 0, 10, 0, 2 * Math.PI);
        // // 内轮廓3
        // var path3 = new THREE.Path();
        // path3.arc(-80, 0, 10, 0, 2 * Math.PI);
        // //三个内轮廓分别插入到holes属性中
        // shape.holes.push(path1, path2, path3);

        // var geometry = new THREE.ShapeGeometry(shape, 25);

        
        // 轮廓对象1
        // var shape=new THREE.Shape();
        // shape.arc(-50,0,30,0,2*Math.PI);
        // // 轮廓对象2
        // var shape2=new THREE.Shape();
        // shape2.arc(50,0,30,0,2*Math.PI);
        // // 轮廓对象3
        // var shape3=new THREE.Shape();
        // shape3.arc(0,50,30,0,2*Math.PI);
        // // 多个shape作为元素组成数组,每一个shpae可以理解为一个要填充的轮廓
        // var geometry = new THREE.ShapeGeometry([shape,shape2,shape3], 30);


        // var material=new THREE.MeshPhongMaterial({
        //     color:0x0000ff,//三角面颜色
        //     side:THREE.DoubleSide//两面可见
        // });//材质对象
        // // material.wireframe = true;//线条模式渲染(查看细分数)
        // var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
        // scene.add(mesh);//旋转网格模型添加到场景中

        // 拉伸成模型
        var shape = new THREE.Shape();
        /**四条直线绘制一个矩形轮廓*/
        shape.moveTo(0,0);//起点
        shape.lineTo(0,10);//第2点
        shape.lineTo(10,10);//第3点
        shape.lineTo(10,0);//第4点
        shape.lineTo(0,0);//第5点

        // var geometry = new THREE.ExtrudeGeometry(//拉伸造型
        //     shape,//二维轮廓
        //     //拉伸参数
        //     {
        //         amount:120,//拉伸长度
        //         bevelEnabled:false//无倒角
        //     }
        // );

        /**创建轮廓的扫描轨迹(3D样条曲线)*/
        var geometry = new THREE.ExtrudeGeometry(//拉伸造型
            shape,//二维轮廓
            //拉伸参数
            {
                bevelEnabled:false,//无倒角
                extrudePath:curve,//选择扫描轨迹
                steps:50//扫描方向细分数
            }
        );

        var material=new THREE.PointsMaterial({
            color:0x0000ff,
            size:5.0//点对象像素尺寸
        });//材质对象
        // var mesh=new THREE.Points(geometry,material);//点模型对象
        var mesh=new THREE.Mesh(geometry,material);//旋转网格模型对象
        scene.add(mesh);//点模型添加到场景中


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
    return <div id="demo7"></div>;
};

export default Index;
