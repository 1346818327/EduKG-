<template>
    <div ref="graph"></div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import * as d3 from 'd3';
  
  const graph = ref(null);
  
  onMounted(() => {
    const data = {
    nodes: [
      { id: 'OSI_Model', label: 'OSI模型' },
      { id: 'Physical_Layer', label: '物理层' },
      { id: 'Data_Link_Layer', label: '数据链路层' },
      { id: 'Network_Layer', label: '网络层' },
      // 添加中心节点
      { id: 'Center', label: '中心', fixed: true }
    ],
    links: [
      { source: 'OSI_Model', target: 'Physical_Layer', value: 1 },
      { source: 'Physical_Layer', target: 'Center', value: 1 },
      { source: 'Data_Link_Layer', target: 'Center', value: 1 },
      { source: 'Network_Layer', target: 'Center', value: 1 },
    ]
  };
    const width = 297;
    const height = 207;
  
    const svg = d3.select(graph.value)
      .append('svg')
      .attr('width', width)
      .attr('height', height);
  
    const simulation = d3.forceSimulation(data.nodes)
      .force('link', d3.forceLink(data.links).id(d => d.id).distance(70) )
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));
  
    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(data.links)
      .enter().append('line')
      .attr('stroke-width', d => Math.sqrt(d.value));
  
    const nodesG = svg.append('g');
    const nodes = nodesG.selectAll('.node')
      .data(data.nodes)
      .enter()
      .append('g')
      .attr('class', 'node');
  
    nodes.append('circle')
      .attr('r', 8)
      .attr('fill', 'blue');
  
    nodes.append('title')
      .text(d => d.id);
  
    nodes.append('text')
      .text(d => d.label)
      .style('text-anchor', 'middle') // 使文本居中
      .style('fill', 'black') // 文本颜色
      .style('font-size', '10px') // 文本大小
      .attr('y', 20); // 将文本向下移动，使其不与圆点重叠
  
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
  
      nodesG.selectAll('.node')
        .attr('transform', d => `translate(${d.x},${d.y})`);
    });
  
    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
  
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
  
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
  
      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  
    nodes.call(drag(simulation));
  });
  </script>
  
  <style>
  </style>