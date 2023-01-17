import React from 'react'
import "./User.css"

export default function User() {
  return (
    <div className='bodyy'>
    <form className='form-signin'>
      <div className='text-center mb-4'>
        <img className='mb-4' src={"https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"} alt="icon" width="72" height="72" />
        <h1 class="h3 mb-3 font-weight-normal">כניסת משתמש</h1>
        <p>Build form controls with floating labels via the <code>:placeholder-shown</code> pseudo-element. <a href="https://caniuse.com/#feat=css-placeholder-shown">Works in latest Chrome, Safari, and Firefox.</a></p>
      </div>

      <div class="form-label-group">
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
        <label for="inputEmail">Email address</label>
      </div>

      <div class="form-label-group">
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
        <label for="inputPassword">Password</label>
      </div>

      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me" /> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <p class="mt-5 mb-3 text-muted text-center">&copy; 2022-2023</p>
    </form>
    </div>
  )
}
