import { TIcon } from '@/modules'

interface IProps {
  /**
   * Имя файла
   */
  icon: TIcon
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

export { IProps }
