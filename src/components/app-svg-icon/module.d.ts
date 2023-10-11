import { Component } from 'vue'

interface IProps {
  /**
   * Имя файла
   */
  icon: InstanceType<typeof Component>
  /**
   * Ширина
   */
  width?: number | string
  /**
   * Высота
   */
  height?: number | string
  /**
   * Ширина и высота одного размера
   */
  size?: number | string
}

type TIcon = {
  render: () => { props: { height: number; width: number } }
}

export { IProps }
