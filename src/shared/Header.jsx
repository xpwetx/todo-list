import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header({ title }) {
    return (
        <header className={styles.header}>
        <h1>{title}</h1>
        <nav>
        <NavLink
        to='/'
        className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
    }
    >
    Home
    </NavLink>
    <NavLink
    to='/about'
    className={({ isActive }) =>
        isActive ? styles.active : styles.inactive
}
>
About
</NavLink>   
 </nav>
 </header>
    )
}