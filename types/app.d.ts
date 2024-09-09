declare namespace App {

  type TabList = {
    id?: string
    title: string
    Component?: JSX.Element
    onClick?: () => void
  }

  type Valid = {
    key: string
    msg?: string
  }

  type Tabbar = {
    key: string
    text: string
    pagePath: string
    iconPath: string
    selectedIconPath: string
  }

}
