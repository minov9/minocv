
import { CVData } from './types';
import { v4 as uuidv4 } from 'uuid';

export const defaultCVData: CVData = {
  basicInfo: {
    name: '张小明',
    role: '高级前端工程师',
    location: '北京市朝阳区',
    email: 'xiaoming.zhang@example.com',
    website: 'www.xiaoming.dev',
    phone: '138-0000-0000',
    github: 'github.com/xiaoming',
    linkedin: 'linkedin.com/in/xiaoming',
    photo: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBVcGxvYWRlZCB0bzogU1ZHIFJlcG8sIHd3dy5zdmdyZXBvLmNvbSwgR2VuZXJhdG9yOiBTVkcgUmVwbyBNaXhlciBUb29scyAtLT4NCjxzdmcgaGVpZ2h0PSI4MDBweCIgd2lkdGg9IjgwMHB4IiB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIA0KCSB2aWV3Qm94PSIwIDAgNDgwIDQ4MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8Zz4NCgk8Zz4NCgkJPGNpcmNsZSBzdHlsZT0iZmlsbDojQjhCQUMwOyIgY3g9IjI0MCIgY3k9IjI0MCIgcj0iMjQwIi8+DQoJPC9nPg0KCTxnPg0KCQk8Zz4NCgkJCTxwYXRoIHN0eWxlPSJmaWxsOiNGRkZGRkY7IiBkPSJNMjQwLDM2MC4wN2MtMjcuOTQ0LDAtNTMuMjk3LTExLjk5MS03Mi4wMDMtMzEuMzcyYy0wLjAxNCwxMS42MTUtMC40MzYsMjguMzc5LTMuNTE2LDQwLjYxMQ0KCQkJCWMyLjAyLDEuMjM1LDMuNTg4LDMuMjYyLDMuODk0LDUuNzg0YzMuOTkyLDMyLjQ4NCwzNC43ODEsNTYuOTc3LDcxLjYyNSw1Ni45NzdjMzYuODM2LDAsNjcuNjI1LTI0LjQ5Niw3MS42MjUtNTYuOTc3DQoJCQkJYzAuMzEtMi41MjUsMS44NDQtNC41NDksMy44OTUtNS43OGMtMy4wOC0xMi4yMzMtMy41MDMtMjguOTk5LTMuNTE3LTQwLjYxNUMyOTMuMjk3LDM0OC4wNzksMjY3Ljk0NCwzNjAuMDcsMjQwLDM2MC4wN3oiLz4NCgkJPC9nPg0KCTwvZz4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBzdHlsZT0iZmlsbDojRDdEQkUwOyIgZD0iTTMxMC40NCwzMzAuMTc0Yy0xOC41NDksMTguNDc3LTQzLjI0MiwyOS44OTYtNzAuNDQsMjkuODk2DQoJCQkJYy0yNy45NDQsMC01My4yOTctMTEuOTkxLTcyLjAwMy0zMS4zNzJjLTAuMDE0LDExLjYxNS0wLjQzNiwyOC4zNzktMy41MTYsNDAuNjExYzIuMDIsMS4yMzUsMy41ODgsMy4yNjIsMy44OTQsNS43ODQNCgkJCQljMS43NjUsMTQuMzU5LDguNzc4LDI3LjE0NCwxOS4yMjMsMzYuOTU0QzIzNS43NjYsNDA1LjI2NSwyOTAuNDM3LDM1Ny43MDIsMzEwLjQ0LDMzMC4xNzR6Ii8+DQoJCTwvZz4NCgk8L2c+DQoJPGc+DQoJCTxnPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zMTIsMTYwLjA3SDE3NmMtMjIuMDU1LDAtNDAsMTcuOTQ1LTQwLDQwdjQ4YzAsNjEuNzU4LDQ2LjY1NiwxMTIsMTA0LDExMnMxMDQtNTAuMjQyLDEwNC0xMTINCgkJCQl2LTU2QzM0NCwxNzQuNDI2LDMyOS42NDgsMTYwLjA3LDMxMiwxNjAuMDd6Ii8+DQoJCTwvZz4NCgk8L2c+DQoJPGc+DQoJCTxnPg0KCQkJPHBhdGggc3R5bGU9ImZpbGw6IzVDNTQ2QTsiIGQ9Ik0yOTYsNzIuMDdIMTkyYy0xNS4wNDcsMC0yNy42OTUsMTAuNDM4LTMxLjEwMiwyNC40NDlDMTMzLjM1OSwxMDAuMDIsMTEyLDEyMy41OTgsMTEyLDE1Mi4wN3Y0MA0KCQkJCWMwLDIwLjYxNyw4Ljc1MiwzOS44NTEsMjQsNTMuNTJ2LTQ1LjUyYzAtMjIuMDU1LDE3Ljk0NS00MCw0MC00MGgxMzZjMTcuNjQ4LDAsMzIsMTQuMzU1LDMyLDMydjUzLjUxMQ0KCQkJCWMxNS4yNTEtMTMuNjY3LDI0LTMyLjg5OSwyNC01My41MTF2LTQ4QzM2OCwxMDQuMzcxLDMzNS43MDMsNzIuMDcsMjk2LDcyLjA3eiIvPg0KCQk8L2c+DQoJPC9nPg0KCTxnPg0KCQk8cGF0aCBzdHlsZT0iZmlsbDojNUM1NDZBOyIgZD0iTTYxLjYzMiw0MDAuNTQ0QzEwNS41NjIsNDQ5LjMxOSwxNjkuMTkxLDQ4MCwyNDAsNDgwczEzNC40MzgtMzAuNjgxLDE3OC4zNjgtNzkuNDU2DQoJCQljLTcuNjYtMTAuMzU2LTE4LjQ2Mi0xOC43Ny0zMi4zNTItMjIuNjU5Yy0wLjMyLTAuMDktMC42NDEtMC4xNi0wLjk2OS0wLjIwN2wtNjMuODU5LTkuNTgyYy0wLjM5MS0wLjA1OS0xLjIyNy0wLjA5LTEuNjI1LTAuMDkNCgkJCWMtNC4wMzksMC03LjQ0NSwzLjAxMi03LjkzOCw3LjAyM2MtNCwzMi40OC0zNC43ODksNTYuOTc3LTcxLjYyNSw1Ni45NzdjLTM2Ljg0NCwwLTY3LjYzMy0yNC40OTItNzEuNjI1LTU2Ljk3Nw0KCQkJYy0wLjUtNC4xMjktNC4yMTktNy4yMzQtOC4xNDEtNy4wMmMtMC40NjktMC4wMjctMC45MywwLjAxMi0xLjQyMiwwLjA4NmwtNjMuODU5LDkuNTgyYy0wLjMyOCwwLjA0Ny0wLjY0OCwwLjExNy0wLjk2OSwwLjIwNw0KCQkJQzgwLjA5NCwzODEuNzc1LDY5LjI5MiwzOTAuMTg4LDYxLjYzMiw0MDAuNTQ0eiIvPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg=='
  },
  summary: {
    content: '拥有 8 年以上前端开发经验，专注于构建高性能用户界面和流畅的交互体验。热衷于代码质量、性能优化和无障碍设计。精通 React、TypeScript 和现代前端技术栈，具备独立负责从架构设计到产品落地的全流程能力。'
  },
  experiences: [
    {
      id: uuidv4(),
      role: '高级前端工程师',
      company: '字节跳动',
      startDate: '2020-03-01',
      endDate: '2023-06-01',
      current: false,
      achievements: [
        '带领 5 人团队使用 React + TypeScript 重构核心产品，页面性能提升 40%，用户留存率提高 15%',
        '主导设计并落地前端组件库，被 3 个业务线采用，新功能开发效率提升 30%',
        '推动移动端响应式设计标准化，移动端转化率提升 25%'
      ]
    },
    {
      id: uuidv4(),
      role: '前端工程师',
      company: '阿里巴巴',
      startDate: '2017-07-01',
      endDate: '2020-02-01',
      current: false,
      achievements: [
        '使用 D3.js 开发数据可视化大屏，支持实时监控百万级数据',
        '优化首屏加载时间，通过代码分割和懒加载将加载速度提升 60%',
        '与 UX 团队紧密合作，落地用户体验优化方案，用户满意度提升 35%'
      ]
    }
  ],
  education: [
    {
      id: uuidv4(),
      degree: '计算机科学与技术 硕士',
      institute: '北京大学',
      location: '北京',
      startDate: '2015-09-01',
      endDate: '2017-06-01',
      current: false
    },
    {
      id: uuidv4(),
      degree: '软件工程 学士',
      institute: '清华大学',
      location: '北京',
      startDate: '2011-09-01',
      endDate: '2015-06-01',
      current: false
    }
  ],
  skills: [
    {
      id: uuidv4(),
      title: '前端开发',
      details: 'React, Vue.js, TypeScript, JavaScript ES6+, HTML5, CSS3, Tailwind CSS, Next.js'
    },
    {
      id: uuidv4(),
      title: 'UI/UX 设计',
      details: 'Figma, 响应式设计, 原型设计, 用户研究, 交互设计'
    },
    {
      id: uuidv4(),
      title: '性能优化',
      details: '代码分割, 懒加载, 包体积分析, Core Web Vitals, Lighthouse 审计'
    }
  ],
  projects: [
    {
      id: uuidv4(),
      name: '电商平台重构',
      company: '某头部电商',
      details: [
        '主导月活 200 万用户的电商平台前端重构，采用微前端架构',
        '实现团队独立部署能力，发布效率提升 50%',
        '优化购物车流程，购物车放弃率降低 18%'
      ]
    },
    {
      id: uuidv4(),
      name: '医疗数据看板',
      company: '某医疗科技公司',
      details: [
        '为医护人员开发患者数据实时监控看板',
        '使用 WebSocket + D3.js 实现实时数据可视化',
        '确保符合医疗数据安全合规要求'
      ]
    }
  ],
  activeTheme: 'nordic',
  sectionConfig: {
    visibility: {
      basicInfo: true,
      summary: true,
      experiences: true,
      education: true,
      skills: true,
      projects: true
    },
    titles: {
      summary: '个人简介',
      experiences: '工作经历',
      education: '教育背景',
      skills: '专业技能',
      projects: '项目经历'
    },
    order: ['summary', 'experiences', 'education', 'skills', 'projects']
  }
};
