import { ELEMEN_OPTIONS, EMPTY_FILTER, FASE_OPTIONS, isFilterActive, type CatalogFilterState } from './filter.ts'
import { FASE_INFO, type ElemenFilter, type Fase } from '../simulations/curriculum.ts'
import './CatalogFilter.css'

type ChipOption<T extends string> = {
  value: T
  label: string
  hint?: string
}

type ChipGroupProps<T extends string> = {
  label: string
  allLabel: string
  options: readonly ChipOption<T>[]
  value: T | null
  onChange: (next: T | null) => void
}

const ChipGroup = <T extends string>({ label, allLabel, options, value, onChange }: ChipGroupProps<T>) => (
  <div className="catalog-filter__group" role="group" aria-label={label}>
    <span className="catalog-filter__group-label" aria-hidden="true">
      {label}
    </span>
    <div className="catalog-filter__chips">
      <button type="button" className="catalog-filter__chip" aria-pressed={value === null} onClick={() => onChange(null)}>
        {allLabel}
      </button>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="catalog-filter__chip"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          {option.hint && <span className="catalog-filter__chip-hint"> {option.hint}</span>}
        </button>
      ))}
    </div>
  </div>
)

const FASE_CHIPS: readonly ChipOption<Fase>[] = FASE_OPTIONS.map((fase) => ({
  value: fase,
  label: FASE_INFO[fase].label,
  hint: FASE_INFO[fase].kelas,
}))

const ELEMEN_CHIPS: readonly ChipOption<ElemenFilter>[] = ELEMEN_OPTIONS.map((elemen) => ({
  value: elemen,
  label: elemen,
}))

type CatalogFilterProps = {
  value: CatalogFilterState
  onChange: (next: CatalogFilterState) => void
  total: number
  shown: number
}

/** Kolom cari dan saringan Fase serta Elemen. Keadaan dipegang oleh halaman pemanggil. */
export const CatalogFilter = ({ value, onChange, total, shown }: CatalogFilterProps) => {
  const active = isFilterActive(value)

  return (
    <div className="catalog-filter" role="search">
      <div className="catalog-filter__row">
        <label className="catalog-filter__search">
          <span className="visually-hidden">Cari simulasi atau konsep</span>
          <input
            className="catalog-filter__input"
            type="search"
            value={value.query}
            placeholder="Cari simulasi atau konsep"
            autoComplete="off"
            onChange={(event) => onChange({ ...value, query: event.target.value })}
          />
        </label>
        {active && (
          <button type="button" className="catalog-filter__reset" onClick={() => onChange(EMPTY_FILTER)}>
            Hapus filter
          </button>
        )}
      </div>

      <div className="catalog-filter__groups">
        <ChipGroup
          label="Fase"
          allLabel="Semua fase"
          options={FASE_CHIPS}
          value={value.fase}
          onChange={(fase) => onChange({ ...value, fase })}
        />
        <ChipGroup
          label="Elemen"
          allLabel="Semua elemen"
          options={ELEMEN_CHIPS}
          value={value.elemen}
          onChange={(elemen) => onChange({ ...value, elemen })}
        />
      </div>

      <p className="catalog-filter__count" role="status">
        {active ? `${shown} dari ${total} simulasi sesuai` : `${total} simulasi`}
      </p>
    </div>
  )
}
