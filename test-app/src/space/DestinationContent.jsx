import { useState } from 'react';
import { FaArrowDown, FaArrowUpRightFromSquare } from 'react-icons/fa6';
import { certification, profile, projects, resume, skills } from './content';
import { sendContactMessage } from './contactThrottle';
import { contactFailure, emailDraft, sendPortfolioEmail } from './contactEmail';
import { publicFile, resumeFile } from './publicFiles';

function ContactForm({ copy }) {
  const [status, setStatus] = useState('idle');
  const [draft, setDraft] = useState('');

  async function sendMessage(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    setDraft('');
    if ([...fields.values()].some((value) => !String(value).trim())) {
      setStatus('incomplete');
      return;
    }
    setStatus('sending');

    try {
      const sent = await sendContactMessage(() => sendPortfolioEmail(form));
      if (sent) form.reset();
      setStatus(sent ? 'sent' : 'rateLimited');
    } catch (error) {
      setStatus(contactFailure(error));
      setDraft(emailDraft(fields));
      console.warn('Portfolio contact delivery failed', error?.status ?? error?.name ?? 'unknown');
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
      <form className="contact-form" onSubmit={sendMessage} aria-busy={status === 'sending'}>
        <label>{copy.nameLabel}<input name="user_name" autoComplete="name" dir="auto" required /></label>
        <label>{copy.email}<input type="email" name="user_email" autoComplete="email" required /></label>
        <label>{copy.subject}<input name="subject" dir="auto" required /></label>
        <label>{copy.message}<textarea name="message" rows="4" dir="auto" required /></label>
        <button className="primary-action" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? copy.sending : copy.send}
        </button>
        <p className="form-status" role="status">
          {status !== 'idle' && copy[status]}
        </p>
        {draft && <a className="email-draft" href={draft}>{copy.openEmailDraft} <FaArrowUpRightFromSquare /></a>}
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
          <a className="primary-action resume-download" href={resumeFile} download>
            {copy.cv} <FaArrowDown />
          </a>
          {Object.entries(resume[language]).map(([category, entries]) => (
            <section className="resume-group" key={category}>
              <h3>{copy[category]}</h3>
              {entries.map(({ title, subTitle, period, description }) => (
                <article className="project-entry" key={title}>
                  <h4>{title}</h4>
                  <p>{subTitle}</p>
                  <p><bdi>{period}</bdi></p>
                  <ul>{description.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
              ))}
            </section>
          ))}
          <section className="resume-group">
            <h3>{copy.certifications}</h3>
            <article className="project-entry">
              <h4>{certification[language]}</h4>
              <p><bdi>{certification.issuer}</bdi> · {certification.date[language]}</p>
              <div className="credential-links">
                <a href={certification.href} target="_blank" rel="noreferrer">{copy.verify} <FaArrowUpRightFromSquare /></a>
                <a href={publicFile(certification.file)} download>{copy.certificate} <FaArrowDown /></a>
              </div>
            </article>
          </section>
        </>
      );
    case 'contact':
      return <ContactForm copy={copy} />;
    default:
      return null;
  }
}
