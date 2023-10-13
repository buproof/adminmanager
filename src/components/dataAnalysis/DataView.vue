<template>
  <div class="data-view">
    <el-card>
      <div id="main1"></div>
    </el-card>
    <el-card>
      <div id="main2"></div>
    </el-card>
  </div>
</template>

<script>
import { dataview } from "@/api/api.js";
export default {
  data() {
    return {};
  },
  created() {
    // 第二个图表的绘制
    dataview()
      .then((res) => {
        if (res.data.status === 200) {
          // 解构赋值   res.data.data={[],[],[]}
          let { legend, xAxis, series } = res.data.data;
          this.draw(legend, xAxis, series);
        }
      })
      .catch((err) => {
        throw err;
      });
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    let myChart = this.$echarts.init(document.getElementById("main1"));
    // 给实例对象指定图表的配置项和数据
    myChart.setOption({
      title: {
        text: "vue项目",
      },
      tooltip: {},
      xAxis: {
        data: ["一班", "二班", "三班", "四班", "五班", "六班"],
      },
      yAxis: {},
      series: [
        {
          name: "人数",
          type: "bar", //柱状图
          data: [45, 50, 48, 46, 52, 40],
        },
      ],
    });
  },
  methods: {
    draw(legend, xAxis, series) {
      let myChart1 = this.$echarts.init(document.getElementById("main2"));
      let option = {
        title: {
          text: "会客量",
        },
        // 提示框组件
        tooltip: {
          // 坐标轴触发
          trigger: "axis",
        },
        // 图例组件
        legend: {
          data: legend,
          right: 0,
        },
        xAxis: {
          type: "category",
          data: xAxis,
        },
        yAxis: {
          type: "value",
        },
        series: series,
      };
      myChart1.setOption(option);
    },
  },
};
</script>

<style lang="scss">
.data-view {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 50%;
    #main1,
    #main2 {
      height: 500px;
    }
  }
}
</style>