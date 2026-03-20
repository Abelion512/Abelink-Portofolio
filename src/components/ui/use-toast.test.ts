import { renderHook, act } from "@testing-library/react"
import { useToast, toast } from "./use-toast"
import { describe, it, expect } from "vitest"

describe("toast()", () => {
  it("adds a toast to the state and returns control methods", () => {
    const { result } = renderHook(() => useToast())

    let toastObj: any
    act(() => {
      toastObj = toast({
        title: "Test Toast",
        description: "Test Description",
      })
    })

    expect(toastObj).toBeDefined()
    expect(toastObj.id).toBeDefined()
    expect(typeof toastObj.dismiss).toBe("function")
    expect(typeof toastObj.update).toBe("function")

    expect(result.current.toasts).toHaveLength(1)
    expect(result.current.toasts[0]).toMatchObject({
      title: "Test Toast",
      description: "Test Description",
      open: true,
    })
  })

  it("dismisses a toast using the returned dismiss function", () => {
    const { result } = renderHook(() => useToast())

    let toastObj: any
    act(() => {
      toastObj = toast({
        title: "Dismiss Me",
      })
    })

    expect(result.current.toasts[0].open).toBe(true)

    act(() => {
      toastObj.dismiss()
    })

    expect(result.current.toasts[0].open).toBe(false)
  })

  it("updates a toast using the returned update function", () => {
    const { result } = renderHook(() => useToast())

    let toastObj: any
    act(() => {
      toastObj = toast({
        title: "Original Title",
      })
    })

    expect(result.current.toasts[0].title).toBe("Original Title")

    act(() => {
      toastObj.update({
        id: toastObj.id,
        title: "Updated Title",
      })
    })

    expect(result.current.toasts[0].title).toBe("Updated Title")
  })
})

describe("useToast()", () => {
  it("provides current toasts and a dismiss function", () => {
    const { result } = renderHook(() => useToast())

    expect(Array.isArray(result.current.toasts)).toBe(true)
    expect(typeof result.current.dismiss).toBe("function")
    expect(typeof result.current.toast).toBe("function")
  })

  it("can dismiss toasts by ID", () => {
    const { result } = renderHook(() => useToast())

    let toastObj: any
    act(() => {
      toastObj = toast({
        title: "Dismiss by ID",
      })
    })

    expect(result.current.toasts[0].open).toBe(true)

    act(() => {
      result.current.dismiss(toastObj.id)
    })

    expect(result.current.toasts[0].open).toBe(false)
  })
})
