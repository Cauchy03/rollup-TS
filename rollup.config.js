import path from "path"
import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import livereload from "rollup-plugin-livereload"
import { terser } from "rollup-plugin-terser"
import repalce from 'rollup-plugin-replace'
const isDev = () => {
   return process.env.NODE_ENV === 'development'
}
export default {
  input: "./src/index.ts", //入口

  output: {
    file: path.resolve(__dirname, './lib/index.js'),
    format: 'umd',
    sourcemap: true
  },

  plugins: [
    ts(), // 支持ts
    isDev() && livereload(), // 热更新
    terser({
      compress: {
        drop_console: true // 删除代码console
      }
    }), // 代码压缩
    repalce({
      'process.env.NODE_ENV':JSON.stringify(process.env.NODE_ENV)
    }),
    isDev() && serve({  // 开发环境下开启服务器
      open: true,
      port: 1999,
      openPage: "/public/index.html"
    })
  ]
}