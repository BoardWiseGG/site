// Used when overriding slot props. `SlotComponentProps` (the generic type being
// overridden) is one of the following:
//
// 1. `Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides`
// 2. `(ownerState: TOwnerState) =>
//       Partial<React.ComponentPropsWithRef<TSlotComponent>> & TOverrides`
//
// Refer to `mui/base/utils/types.d.ts`. The following checks which of the two
// we're working with and returns the `Partial` type.
export const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === "function" ? fn(args) : fn
