import * as React from "react"
import { SelectProps } from "@mui/base/Select"

import { Select, Option } from "./Select"
import { Title } from "../types/Title"

interface TitleOption {
  value: Title | ""
  label: string
}

const options: TitleOption[] = [
  { value: Title.GM, label: "Grandmaster" },
  { value: Title.IM, label: "International Master" },
  { value: Title.FM, label: "FIDE Master" },
  { value: Title.CM, label: "Candidate Master" },
  { value: Title.NM, label: "National Master" },
  { value: Title.WGM, label: "Woman Grandmaster" },
  { value: Title.WIM, label: "Woman International Master" },
  { value: Title.WFM, label: "Woman FIDE Master" },
  { value: Title.WCM, label: "Woman Candidate Master" },
  { value: Title.WNM, label: "Woman National Master" },
]

export type SelectTitleProps = SelectProps<{}, boolean>

export const SelectTitle = React.forwardRef(function SelectTitle(
  props: SelectTitleProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  return (
    <Select ref={ref} {...props}>
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
