import './App.css';
import {useState} from "react";
import Header from "./components/Header";
import initialEmails from './data/emails'

function App() {
  const [hided, setHided] = useState(false)

  const [emails, setEmails] = useState(initialEmails)

  function toggleRead(email) {
    return !email.read
  }

  function toggleStar(email) {
    return !email.starred
  }

  function toggleHideRead() {
    setHided(!hided)
  }

  function updateReadState(id, read) {
    let index = emails.findIndex(email => email.id === id)
    emails[index].read = read
    let emailsUpdated = [...emails]
    setEmails(emailsUpdated)
  }

  function updateStarState(id, star) {
    let starIndex = emails.findIndex(email => email.id === id)
    emails[starIndex].starred = star
    let starUpdatedEmails = [...emails]
    setEmails(starUpdatedEmails)
  }

  let emailsDisplayed = emails

  if (setHided === true) {
    emailsDisplayed = emailsDisplayed.filter(email => !email.read)
  }

  return (
      <div className="app">
        <Header />

        <nav className="left-menu">
          <ul className="inbox-list">
            <li
                className="item active"
                // onClick={() => {}}
            >
              <span className="label">Inbox</span>
              <span className="count">?</span>
            </li>
            <li
                className="item"
                // onClick={() => {}}
            >
              <span className="label">Starred</span>
              <span className="count">?</span>
            </li>

            <li className="item toggle">
              <label for="hide-read">Hide read</label>
              <input
                  id="hide-read"
                  type="checkbox"
                  checked={hided}
                  onClick={toggleHideRead}
              />
            </li>
          </ul>
        </nav>
        <main>
          <ul className="emails">
            {emailsDisplayed.map(function (email) {
              return (
                  <li className={`email ${email.read ? 'read' : 'read-email'}`}>
                    <input type="checkbox" checked={email.read} onClick={function () {
                      const changedRead = toggleRead(email)
                      updateReadState(email.id, changedRead)
                    }} />
                    <input class="star-checkbox" type="checkbox" checked={email.starred}
                           onClick={function () {
                             const changeStar = toggleStar(email)
                             updateStarState(email.id, changeStar)
                           }}
                    />
                    <span className='title'>{email.sender}</span>
                    <span className='title'>{email.title}</span>
                  </li>
              )
            })}
          </ul>
        </main>
      </div>
  )
}

export default App;
