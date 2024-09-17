import { Box, Link } from '@mui/material'
import styles from './styles.module.scss'

export default function Header() {
  return (
    <Box component="section">
        <div className="container">
            <Box component="div" className={styles.header}>
                <Box component="div" className={styles.locale}>

                </Box>
                <Box component="div" className={styles.headerWrapper}>
                  <Link><img src="" alt="logo" /></Link>
                </Box>
            </Box>
        </div>
    </Box>
  )
}

