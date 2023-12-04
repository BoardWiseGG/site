import * as React from "react"

export const FieldContext = React.createContext<{
  required?: boolean
  disabled?: boolean
  error?: string | boolean
}>({})

function Wrapper(props: React.ComponentPropsWithoutRef<"div">) {
  const fieldContext = React.useContext(FieldContext)
  const { children, ...other } = props

  return (
    <>
      <div {...other}>{children}</div>
      {typeof fieldContext?.error === "string" && (
        <p className="pt-2 text-sm text-amber-800">{fieldContext?.error}</p>
      )}
    </>
  )
}

type WrapperProps<T extends React.ElementType> =
  React.ComponentPropsWithoutRef<T> & {
    slotProps?: {
      root?: React.ComponentPropsWithoutRef<"div">
    }
  }

export const Field = React.forwardRef<
  HTMLDivElement,
  WrapperProps<"div"> & {
    required?: boolean
    disabled?: boolean
    error?: string | boolean
  }
>(function Field(props, ref) {
  const { children, slotProps, required, disabled, error, ...other } = props

  return (
    <FieldContext.Provider value={{ required, disabled, error }}>
      <div ref={ref} {...other}>
        <Wrapper {...slotProps?.root}>{children}</Wrapper>
      </div>
    </FieldContext.Provider>
  )
})

export const FieldSet = React.forwardRef<
  HTMLFieldSetElement,
  WrapperProps<"fieldset"> & {
    required?: boolean
    disabled?: boolean
    error?: string | boolean
  }
>(function FieldSet(props, ref) {
  const { children, slotProps, required, disabled, error, ...other } = props

  return (
    <FieldContext.Provider value={{ required, disabled, error }}>
      <fieldset ref={ref} {...other}>
        <Wrapper {...slotProps?.root}>{children}</Wrapper>
      </fieldset>
    </FieldContext.Provider>
  )
})
