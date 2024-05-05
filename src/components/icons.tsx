type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
    logoDark: (props: IconProps) => (
        <svg width="800px" height="800px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
                <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
                <path
                    d="M36 15C38.7614 15 41 12.7614 41 10C41 7.23858 38.7614 5 36 5C33.2386 5 31 7.23858 31 10C31 12.7614 33.2386 15 36 15Z"
                    fill="#2F88FF" stroke="#ffffff" stroke-width="4"/>
                <path d="M12 16.7691L20.0031 13.998L31 19.2466L20.0031 27.4442L31 34.6834L24.0083 43.998"
                      stroke="#ffffff" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M35.3198 21.6434L38.0015 23.1018L43.9998 17.4658" stroke="#ffffff" stroke-width="4"
                      stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.849 31.5454L13.8793 35.4572L4.00391 40.9964" stroke="#ffffff" stroke-width="4"
                      stroke-linecap="round" stroke-linejoin="round"/>

        </svg>
    ),
   logoLight: (props: IconProps) => (
       <svg width="800px" height="800px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"  {...props}>
           <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
           <path
               d="M36 15C38.7614 15 41 12.7614 41 10C41 7.23858 38.7614 5 36 5C33.2386 5 31 7.23858 31 10C31 12.7614 33.2386 15 36 15Z"
               fill="#2F88FF" stroke="#000000" stroke-width="4"/>
           <path d="M12 16.7691L20.0031 13.998L31 19.2466L20.0031 27.4442L31 34.6834L24.0083 43.998" stroke="#000000"
                 stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
           <path d="M35.3198 21.6434L38.0015 23.1018L43.9998 17.4658" stroke="#000000" stroke-width="4"
                 stroke-linecap="round" stroke-linejoin="round"/>
           <path d="M16.849 31.5454L13.8793 35.4572L4.00391 40.9964" stroke="#000000" stroke-width="4"
                 stroke-linecap="round" stroke-linejoin="round"/>
       </svg>
    ),
}
