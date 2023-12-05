import * as React from "react"
import { SelectProps } from "@mui/base/Select"

import type { Language } from "../types/Language"

import { Select, Option } from "./Select"
import { useFetchLanguages } from "../utils/queries"

export type SelectLanguageProps = SelectProps<{}, boolean>

export const SelectLanguage = React.forwardRef(function SelectLanguage(
  props: SelectLanguageProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const id = React.useId()
  const [options, setOptions] = React.useState<Language[] | null>(null)
  const { defaultValue, ...other } = props
  const { isLoading, data } = useFetchLanguages()

  React.useEffect(() => {
    if (data) {
      setOptions(data)
    }
  }, [data])

  return (
    <Select
      ref={ref}
      // Use key to force re-render and ensure the defaultValue takes effect.
      key={!options && isLoading ? `${id}-loading` : `${id}-loaded`}
      className={!options && isLoading ? "text-slate-900/60" : ""}
      defaultValue={!options && isLoading ? [""] : defaultValue}
      {...other}
    >
      {options?.map((lang, index) => {
        return (
          <Option key={index} value={lang.code}>
            {lang.name}
          </Option>
        )
      })}
    </Select>
  )
})
