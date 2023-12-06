import * as React from "react"

const SvgComponent = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
    <path d="M23.961 5.99a6.144 6.144 0 0 0-1.03.065c-4.414-1.996-5.841-4.914-7.812-4.914-1.705 0-1.62 3.149 4.884 6.521l-.035.046c-.496.68-6.986-3.097-8.985-3.093-2.692.006 1.257 6.368 7.689 5.369.61-.095-.302.909-.227 1.48.023.176.065.345.123.506-6.275-.164-10.188.982-12.463 2.774-1.616-.903-1.672-4.089-3.337-3.265-1.77.876-.679 5.582.831 7.142-1.022 4.432 2.247 9.722 4.846 11.331h20.509c1.112-.789.487-1.41 0-1.997-.602-.725-2.461-1.199-3.993-.998-2.23-.908 5.444-5.973.027-11.95 1.021.058 2.186-.023 3.2-.342l.071.049.045-.086c.931-.313 1.723-.836 2.137-1.648.51-.998-3.303-6.922-6.479-6.989zm.996 4.983a.998.998 0 1 1 0-1.996.998.998 0 0 1 0 1.996z" />
  </svg>
)

export default SvgComponent
