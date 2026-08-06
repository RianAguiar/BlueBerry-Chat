import { Link } from "react-router-dom"
import "../styles/about.css"

function About() {
  return (
    <div className="about-page">

      <header className="about-header">
        <Link to="/" className="about-logo">
          <img src="/BlueBerry.png" alt="BlueBerry Chat" />
          <span>BlueBerry Chat</span>
        </Link>

        <Link to="/" className="back-button">
          Back 
        </Link>
      </header>


      <main className="about-content">

        <section className="about-hero">
          <img
            src="/BlueBerry.png"
            alt="BlueBerry Chat"
            className="about-logo-image"
          />

          <h1>About BlueBerry Chat</h1>

          <p>
            A simple, real-time chat platform designed for quick and
            accessible communication without requiring an account.
          </p>
        </section>


        <section className="about-section">
          <h2>What is BlueBerry Chat?</h2>

          <p>
            BlueBerry Chat is a real-time communication system that allows
            users to create or join chat rooms using a nickname and a room
            name. No traditional account or password is required to use the
            platform.
          </p>

          <p>
            Messages are transmitted in real time using WebSocket
            technology, allowing participants in the same room to
            communicate without refreshing the page.
          </p>
        </section>


        <section className="about-section">
          <h2>Privacy and Anonymity</h2>

          <div className="notice">
            <strong>⚠ Important:</strong>

            <p>
              BlueBerry Chat should not be considered a completely anonymous
              service.
            </p>
          </div>

          <p>
            Although the platform does not require users to create an
            account or provide personal information such as a real name,
            anonymity cannot be guaranteed.
          </p>

          <p>
            Depending on the system configuration, server logs, network
            information, technical data, or other information necessary for
            operating and protecting the service may be recorded or
            accessible to the system administrator.
          </p>

          <p>
            Therefore, users should never assume that their identity or
            activity is completely untraceable.
          </p>
        </section>


        <section className="about-section">
          <h2>Terms of Use</h2>

          <p>
            By using BlueBerry Chat, you agree to use the platform
            responsibly and in accordance with applicable laws.
          </p>

          <h3>Users must not use the platform to:</h3>

          <ul>
            <li>
              Plan, facilitate, encourage, or commit criminal activities.
            </li>

            <li>
              Threaten, harass, intimidate, or harm other individuals.
            </li>

            <li>
              Distribute illegal content or content that violates applicable
              laws.
            </li>

            <li>
              Attempt to gain unauthorized access to the system, its servers,
              databases, or other users' information.
            </li>

            <li>
              Exploit vulnerabilities, disrupt the service, or intentionally
              interfere with its operation.
            </li>

            <li>
              Use the platform for fraud, scams, impersonation, or other
              unlawful activities.
            </li>
          </ul>
        </section>


        <section className="about-section">
          <h2>Responsible Use</h2>

          <p>
            Users are responsible for the content they send and for how they
            use the platform.
          </p>

          <p>
            The absence of account registration does not mean that users are
            exempt from responsibility for their actions. Illegal or harmful
            activity may be subject to investigation or appropriate action
            when required by law.
          </p>
        </section>


        <section className="about-section">
          <h2>Important Disclaimer</h2>

          <div className="notice warning">
            <p>
              BlueBerry Chat is provided as a communication platform and
              should not be used as a means to conceal illegal activity or
              evade identification.
            </p>
          </div>

          <p>
            The platform does not guarantee complete anonymity, permanent
            availability, or that messages will always remain private.
          </p>

          <p>
            Do not share passwords, financial information, personal
            documents, addresses, or other sensitive information in chat
            rooms.
          </p>
        </section>


        <section className="about-section last-section">
          <h2>Use responsibly 💜</h2>

          <p>
            BlueBerry Chat was created to provide a simple and accessible
            way for people to communicate in real time. Please respect other
            users and use the platform responsibly.
          </p>
        </section>

      </main>


      <footer className="about-footer">
        <span>© 2026 BlueBerry Chat</span>

        <span>•</span>

        <span>Anonymous by design, not anonymous by guarantee.</span>

        <span>•</span>

        <span>Special Thanks to GSC</span>
      </footer>

    </div>
  )
}

export default About