import { FunctionalComponent, SVGAttributes } from 'vue/dist/vue'

interface INote {
  id: PropertyKey
  title: string
  additionalText: string
  tasks: Array<{ id: PropertyKey; name: string; done: boolean }>
}

type TIcon = FunctionalComponent<SVGAttributes> & {
  render?: () => { props: { width: number; height: number } }
}

export { INote, TIcon }
