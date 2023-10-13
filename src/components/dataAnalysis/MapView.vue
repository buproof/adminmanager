<template>
  <div class="map-view">
    <div id="main"></div>
  </div>
</template>

<script>
import geoJson from "@/assets/data.json";
export default {
  data() {
    return {};
  },
  mounted() {
    // 初始化echarts实例对象
    let myChart = this.$echarts.init(document.getElementById("main"));
    // 注册可用的地图，只在geo组件或者map图表类型中使用
    // registerMap('地图名',geoJson)
    this.$echarts.registerMap("china", geoJson);

    let option = {
      backgroundColor: "rgb(121, 145, 209)",
      // 地图坐标系组件geo
      geo: {
        // 注册的地图名称
        map: "china",
        aspectScale: 0.75, //scale地图的长宽比
        // 当前视角的缩放比
        zoom: 1.1,
        itemStyle: {
          // 默认状态下的样式
          normal: {
            areaColor: {
              type: "radial",
              x: 0.5,
              y: 0.5,
              r: 0.8, // 半径
              colorStops: [
                {
                  offset: 0,
                  color: "rgb(31,54,150)", // 0%处的颜色
                },
                {
                  offset: 1,
                  color: "rgb(89,128,142)", // 100%处的颜色
                },
              ],
              globalCoord: true,
            },
            // 设置阴影(在normal里设置)，形成层级效果
            shadowColor: "rgb(58,115,192)",
            shadowOffsetX: 10,
            shadowOffsetY: 11,
          },
        },
        regions: [
          {
            name: "南海诸岛",
            itemStyle: {
              opacity: 0,
            },
          },
        ],
      },
      // geo函数定义了 地图省份文字的样式，series中定义了每个系列的特效
      series: [
        {
          // 配置地图相关参数，绘制地图，这个对象是关于地图图表的相关配置
          type: "map",
          // 图形上的文本标签
          label: {
            normal: {
              show: true,
              textStyle: {
                color: "#1DE9B6",
              },
            },
            emphasis: {
              textStyle: {
                color: "rgb(183,185,14)",
              },
            },
          },
          zoom: 1.1,
          map: "china",
          itemStyle: {
            normal: {
              backgroundColor: "rgb(147,235,248)",
              borderWidth: 1,
              areaColor: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.8, // 半径
                colorStops: [
                  {
                    offset: 0,
                    color: "rgb(31,54,150)", // 0%处的颜色 渐变
                  },
                  {
                    offset: 1,
                    color: "rgb(89,128,142)", // 100%处的颜色 渐变
                  },
                ],
                globalCoord: true,
              },
            },
            // 图形在高亮状态下的样式（鼠标移入）
            emphasis: {
              areaColor: "rgb(46,229,206)",
              borderWidth: 0.1,
            },
          },
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>

<style lang="scss">
.map-view {
  width: 100%;
  #main {
    width: 100%;
    height: 600px;
  }
}
</style>