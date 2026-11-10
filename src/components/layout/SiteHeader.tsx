import { ROUTES } from '../../app/routes.ts'
import { useDisclosure } from '../../hooks/useDisclosure.ts'
import { Logo } from './Logo.tsx'
import { MENU_EXTRA_NAV, PRIMARY_NAV, type NavLink } from './navigation.ts'
import './SiteHeader.css'

const MENU_PANEL_ID = 'site-menu-panel'

const MenuIcon = () => (
  <svg aria-hidden="true" focusable="false" width="26" height="18" viewBox="0 0 38 26">
    <path d="M0 2h38M0 13h38M0 24h38" stroke="currentColor" strokeWidth="3" fill="none" />
  </svg>
)

type MenuLinksProps = {
  links: readonly NavLink[]
  onNavigate: () => void
  itemClassName?: string
}

const MenuLinks = ({ links, onNavigate, itemClassName }: MenuLinksProps) =>
  links.map(({ label, href }) => (
    <li key={label} className={itemClassName}>
      <a className="site-menu__link" href={href} onClick={onNavigate}>
        {label}
      </a>
    </li>
  ))

export const SiteHeader = () => {
  const { isOpen, toggle, close } = useDisclosure()

  return (
    <header className="site-header on-dark">
      <a className="site-header__brand" href={ROUTES.home} aria-label="1729 Lab Simulasi Matematika — beranda">
        <Logo />
      </a>

      <nav className="site-header__nav" aria-label="Utama">
        <ul className="site-header__links">
          {PRIMARY_NAV.map(({ label, href }) => (
            <li key={label}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="site-header__menu-button"
          aria-expanded={isOpen}
          aria-controls={MENU_PANEL_ID}
          aria-label="Menu"
          onClick={toggle}
        >
          <MenuIcon />
        </button>
      </nav>

      <div id={MENU_PANEL_ID} className="site-menu" hidden={!isOpen}>
        <ul className="site-menu__list">
          <MenuLinks links={PRIMARY_NAV} onNavigate={close} itemClassName="site-menu__primary" />
          <MenuLinks links={MENU_EXTRA_NAV} onNavigate={close} />
        </ul>
      </div>
    </header>
  )
}
