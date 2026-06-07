import { useEffect, type AnchorHTMLAttributes } from 'react'

const SIMPLE_PRACTICE_SCRIPT_ID = 'simplepractice-widget-script'
const SIMPLE_PRACTICE_SCRIPT_SRC =
  'https://widget-cdn.simplepractice.com/assets/integration-1.0.js'

type SimplePracticeWidgetProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> & {
  label?: string
}

export default function SimplePracticeBookWidget({
  className,
  label = 'Request Appointment',
  style,
  ...props
}: SimplePracticeWidgetProps) {
  useEffect(() => {
    const existingScript = document.getElementById(
      SIMPLE_PRACTICE_SCRIPT_ID,
    ) as HTMLScriptElement | null

    if (existingScript) {
      return
    }

    const script = document.createElement('script')
    script.id = SIMPLE_PRACTICE_SCRIPT_ID
    script.src = SIMPLE_PRACTICE_SCRIPT_SRC
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [])

  return (
    <a
      href="https://clientsecure.me/widget-redirect?scopeId=fbb4bbe6-24e5-457c-bb07-bcdb6ba3320c&applicationId=7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b&channel=professional_website&appearance=%7B%22fullScreen%22%3Atrue%7D&clinicianId=1365778"
      className={
        className ??
        'inline-block rounded border border-[#1371C8] bg-white px-3 py-1.5 text-sm font-semibold text-[#1371C8] no-underline transition hover:bg-white hover:text-[#0F5AA0] active:text-[rgba(255,255,255,.75)]'
      }
      style={style}
      data-spwidget-scope-id="fbb4bbe6-24e5-457c-bb07-bcdb6ba3320c"
      data-spwidget-scope-uri="catherine-tillinghast"
      data-spwidget-application-id="7c72cb9f9a9b913654bb89d6c7b4e71a77911b30192051da35384b4d0c6d505b"
      data-spwidget-type="OAR"
      data-spwidget-clinician-id="1365778"
      data-spwidget-autobind
      {...props}
    >
      {label}
    </a>
  )
}
