import * as React from "react"
import { Controller, useForm } from "react-hook-form"

import { Button } from "./Button"
import { CheckBox } from "./CheckBox"
import { Field, FieldSet } from "./FieldSet"
import { Input } from "./Input"
import { Label } from "./Label"
import { Modal } from "./Modal"
import { Mode, getModeName } from "../types/Mode"
import { SelectLanguage, SelectLanguageProps } from "./SelectLanguage"
import { SelectTitle, SelectTitleProps } from "./SelectTitle"
import { Site, getSiteName } from "../types/Site"
import { Slider } from "./Slider"
import { Title } from "../types/Title"
import { RATING_MIN, RATING_MAX, SearchParams } from "../types/SearchParams"

const computeStepLabels = (
  min: number,
  max: number,
  // The number of labels (+ 1) that should be produced.
  steps: number,
  // To which value numbers should be rounded to.
  round: number
) => {
  let labels = []
  const delta = Math.floor((max - min) / steps)
  for (let i = min; i <= max; i += delta) {
    if (i % round <= round / 2) {
      labels.push(i - (i % round))
    } else {
      labels.push(i + round - (i % round))
    }
  }

  labels[labels.length - 1] = max

  return labels
}

interface SortModalProps {
  open: boolean
  defaultValues: SearchParams
  onClose: () => void
  onSubmit: (p: SearchParams) => void
}

export function SortModal({
  open,
  defaultValues,
  onClose,
  onSubmit,
}: SortModalProps) {
  const idPrefix = React.useId()

  const {
    watch,
    reset,
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchParams>({
    mode: "onChange",
    defaultValues,
  })

  // Default values are processed immediately despite the modal not being open
  // at the start. Furthermore, values are preserved after closing and
  // re-opening the modal, but we want closing the modal to signify canceling.
  // A simple workaround is to reset everytime we open the modal.
  React.useEffect(() => reset(defaultValues), [open])

  // Registration

  const registerSites = register("sites", {
    required: "Please select at least one site.",
  })

  const proxyLanguages = register("languages")
  const registerLanguages: Pick<
    SelectLanguageProps,
    "defaultValue" | "onChange"
  > = {
    ...proxyLanguages,
    defaultValue: defaultValues.languages,
    onChange: (event, value) => {
      event && proxyLanguages.onChange(event)
      setValue("languages", (value ?? []) as string[])
    },
  }

  const registerRating = register("rating")
  const registerModes = register("modes", {
    required: "Please select at least one mode.",
  })

  const proxyTitles = register("titles")
  const registerTitles: Pick<SelectTitleProps, "defaultValue" | "onChange"> = {
    ...proxyTitles,
    defaultValue: defaultValues.titles,
    onChange: (event, value) => {
      event && proxyTitles.onChange(event)
      setValue("titles", (value ?? []) as Title[])
    },
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      frame={{
        as: "form",
        title: "Sort Coaches",
        footer: (
          <Button
            className="float-right py-2"
            type="submit"
            disabled={Object.keys(errors).length > 0}
          >
            Submit
          </Button>
        ),
        onSubmit: handleSubmit(onSubmit),
      }}
    >
      <div className="flex flex-col gap-12">
        <FieldSet error={errors?.sites?.message}>
          <Label htmlFor={`${idPrefix}-rating`}>Sites:</Label>
          <p className="py-2 text-sm">
            Prioritize coaches from the selected site(s).
          </p>
          <div className="grid grid-cols-2 pt-2 text-sm">
            {(Object.values(Site) as Site[]).map((s) => (
              <div key={s} className="col-span-1 flex items-center gap-x-2">
                <CheckBox value={s} {...registerSites} />
                <div>{getSiteName(s)}</div>
              </div>
            ))}
          </div>
        </FieldSet>

        <Field>
          <Label htmlFor={`${idPrefix}-languages`}>
            Preferred Language(s):
          </Label>
          <p className="py-2 text-sm">
            Select languages you prefer communicating in. We{"'"}ll prioritize
            finding coaches that can speak fluently in at least one of your
            selections.
          </p>
          <SelectLanguage
            id={`${idPrefix}-languages`}
            slotProps={{
              root: { className: "w-full" },
            }}
            {...registerLanguages}
            multiple
          />
        </Field>

        <Field>
          <Label htmlFor={`${idPrefix}-titles`}>Titles:</Label>
          <p className="py-2 text-sm">
            Prioritize coaches with one or more of the following titles. That
            said, this is usually not an aspect of a coach that is important to
            focus on.
          </p>
          <SelectTitle
            id={`${idPrefix}-titles`}
            slotProps={{
              root: { className: "w-full" },
            }}
            {...registerTitles}
            multiple
          />
        </Field>

        <FieldSet error={errors?.modes?.message}>
          <Label htmlFor={`${idPrefix}-rating`}>Mode:</Label>
          <p className="py-2 text-sm">
            Prefer a specific game mode? We{"'"}ll prioritize coaches that
            specialize in the modes selected.
          </p>
          <div className="grid grid-cols-3 pt-2 text-sm">
            {(Object.values(Mode) as Mode[]).map((m) => (
              <div key={m} className="col-span-1 flex items-center gap-x-2">
                <CheckBox value={m} {...registerModes} />
                <div>{getModeName(m)}</div>
              </div>
            ))}
          </div>
        </FieldSet>

        <Field>
          <Label htmlFor={`${idPrefix}-rating`}>Rating:</Label>
          <p className="py-2 text-sm">
            Find coaches that have a rating within the specified range. A higher
            rating does not necessarily correspond to a better coach. If you are
            unsure of this or do not have any preference, leave as is.
          </p>
          <div id={`${idPrefix}-rating`} className="mt-2 w-full px-4">
            <Controller
              control={control}
              name={registerRating.name}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <Slider
                  ref={ref}
                  value={value}
                  onBlur={onBlur}
                  onChange={(event, newValue: any) => {
                    event && onChange(event)
                    setValue("rating.0", newValue[0])
                    setValue("rating.1", newValue[1])
                  }}
                  step={10}
                  min={RATING_MIN}
                  max={RATING_MAX}
                  marks={computeStepLabels(RATING_MIN, RATING_MAX, 7, 50).map(
                    (s) => ({ value: s, label: `${s}` })
                  )}
                />
              )}
            />
            <div className="mt-16 flex flex-wrap items-center justify-center gap-x-20 gap-y-4">
              <div>
                <label className="text-neutral-850 text-sm font-medium">
                  Min:
                </label>
                <Input value={watch("rating.0")} disabled />
              </div>
              <div>
                <label className="text-neutral-850 text-sm font-medium">
                  Max:
                </label>
                <Input value={watch("rating.1")} disabled />
              </div>
            </div>
          </div>
        </Field>
      </div>
    </Modal>
  )
}
