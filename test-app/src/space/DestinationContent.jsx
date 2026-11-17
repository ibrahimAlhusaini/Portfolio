import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaArrowDown, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { profile, projects, resume, skills } from './content';

const publicFile = (filename) => `${process.env.PUBLIC_URL || ''}/${encodeURIComponent(filename)}`;

function ContactForm({ copy }) {
  const [status, setStatus] = useState('idle');

  async function sendMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus('sending');

    try {
      await emailjs.sendForm('service_8o769i9', 'template_up4nw3y', form, 'jG7XCvmJokOPAE34v');
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <div className="contact-links">
        {profile.links.map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer">{label} <FaArrowUpRightFromSquare /></a>
        ))}
        <a href={`mailto:${profile.email}`}>{copy.email} <FaArrowUpRightFromSquare /></a>
      </div>
      <form className="contact-form" onSubmit={sendMessage}>
        <label>{copy.nameLabel}<input name="user_name" autoComplete="name" dir="auto" required /></label>
        <label>{copy.email}<input type="email" name="user_email" autoComplete="email" required /></label>
        <label>{copy.subject}<input name="subject" dir="auto" required /></label>
        <label>{copy.message}<textarea name="message" rows="4" dir="auto" required /></label>
        <button className="primary-action" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? copy.sending : copy.send}
        </button>
        <p className="form-status" role="status">
          {status === 'sent' && copy.sent}
          {status === 'error' && copy.error}
        </p>
      </form>
    </>
  );
}

export default function DestinationContent({ destination, language, copy }) {
  switch (destination) {
    case 'about':
      return (
        <>
          <h2 className="about-role">{copy.aboutRole}</h2>
          <p className="panel-lead">{copy.about}</p>
          <h2 className="personal-heading">{copy.personal}</h2>
          <dl className="profile-facts">
            <div><dt>{copy.nameLabel}</dt><dd>{copy.fullName}</dd></div>
            <div><dt>{copy.ageLabel}</dt><dd>{copy.age}</dd></div>
            <div><dt>{copy.locationLabel}</dt><dd>{copy.location}</dd></div>
            <div><dt>{copy.email}</dt><dd><a dir="ltr" href={`mailto:${profile.email}`}>{profile.email}</a></dd></div>
          </dl>
        </>
      );
    case 'skills':
      return (
        <div className="skill-groups">
          {skills.map(({ items, ...group }) => (
            <section key={group.en}>
              <h3>{group[language]}</h3>
              <ul>{items.map((item) => Array.isArray(item)
                ? <li key={item[0]}>{item[language === 'ar' ? 1 : 0]}</li>
                : <li key={item} dir="ltr">{item}</li>)}</ul>
            </section>
          ))}
        </div>
      );
    case 'projects':
      return projects.map(({ name, href, file, ...description }) => (
        <article className="project-entry" key={name}>
          <h3 dir="auto">{name}</h3>
          <p>{description[language]}</p>
          {href && <a href={href} target="_blank" rel="noreferrer">{copy.visit} <FaArrowUpRightFromSquare /></a>}
          {file && <a href={publicFile(file)} download>{copy.report} <FaArrowDown /></a>}
        </article>
      ));
    case 'resume':
      return (
        <>
          <a className="primary-action resume-download" href={publicFile('IBRAHIM ALHUSAINI CV.pdf')} download>
            {copy.cv} <FaArrowDown />
          </a>
          {Object.entries(resume[language]).map(([category, entries]) => (
            <section className="resume-group" key={category}>
              <h3>{copy[category]}</h3>
              {entries.map(({ title, subTitle, description }) => (
                <article className="project-entry" key={title}>
                  <h4>{title.replace(/,$/, '')}</h4>
                  <p>{subTitle}</p>
                  <ul>{description.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </section>
          ))}
        </>
      );
    case 'contact':
      return <ContactForm copy={copy} />;
    default:
      return null;
  }
}
