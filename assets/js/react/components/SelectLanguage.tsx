import * as React from "react"
import { SelectProps } from "@mui/base/Select"

import { Select, Option } from "./Select"
import { useFetchLanguages } from "../utils/queries"

export type SelectLanguageProps = SelectProps<{}, boolean>

export const SelectLanguage = React.forwardRef(function SelectLanguage(
  props: SelectLanguageProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const id = React.useId()
  const [options, setOptions] = React.useState([
    { value: "", label: "Loading..." },
  ])
  const { defaultValue, ...other } = props
  const { isLoading, data } = useFetchLanguages()

  React.useEffect(() => {
    if (!data) {
      return
    }
    setOptions(data.map((row) => ({ value: row.code, label: row.name })))
  }, [data])

  return (
    <Select
      ref={ref}
      key={isLoading ? `${id}-loading` : `${id}-loaded`}
      className={isLoading ? "text-slate-900/60" : ""}
      defaultValue={defaultValue}
      {...other}
    >
      {options.map((entry, index) => {
        return (
          <Option key={index} value={entry.value}>
            {entry.label}
          </Option>
        )
      })}
    </Select>
  )
})
