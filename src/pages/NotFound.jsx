import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    return (
        <div>
            <h2>404 -- Page not found</h2>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <Link to='/'>Go back to Home</Link>
        </div>
    )
}