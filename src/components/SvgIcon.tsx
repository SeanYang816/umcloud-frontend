import HomeIcon from 'assets/icons/ic_home.svg?react'
import LocationsIcon from 'assets/icons/ic_dashboard.svg?react'
import GroupsIcon from 'assets/icons/ic-file-download.svg?react'
import SettingsIcon from 'assets/icons/ic_setting.svg?react'

type SvgIconProps = {
  icon: keyof typeof iconComponents
  fillColor?: string
  strokeColor?: string
}

const iconComponents = {
  home: HomeIcon,
  locations: LocationsIcon,
  groups: GroupsIcon,
  settings: SettingsIcon,
}

export const SvgIcon = ({
  icon,
  fillColor = '#333',
  strokeColor = '#333',
  ...rest
}: SvgIconProps) => {
  const IconComponent = iconComponents[icon]

  if (!IconComponent) {
    console.error(`Icon component for '${icon}' not found.`)

    return null
  }

  return (
    <IconComponent style={{ fill: fillColor, stroke: strokeColor }} {...rest} />
  )
}
