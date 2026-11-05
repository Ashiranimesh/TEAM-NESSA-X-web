import React from 'react';
import { TEAM_MEMBERS } from '../data/tikiriliaData';

export default function TeamSection() {
  return (
    <section className="band" id="team">
      <div className="wrap">
        <h2>Meet our team</h2>
        <p className="sub">
          The student innovators behind Smart Tikirilia — uniting hardware, interactive software,
          and Sri Lankan cultural storytelling.
        </p>

        <div className="team-grid">
          {TEAM_MEMBERS.map(member => (
            <div key={member.id} className={`team-card ${member.colorClass}`}>
              <div className="team-avatar">
                <img
                  src={member.image}
                  alt={member.name}
                  onError={e => {
                    // Fallback to placeholder if image fails
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <h3>{member.name}</h3>
              <span className="team-role">{member.role}</span>
              <p className="team-bio">{member.bio}</p>
              <div className="team-links">
                <a href="#team" aria-label="LinkedIn" title="LinkedIn">in</a>
                <a href="#team" aria-label="GitHub" title="GitHub">gh</a>
                <a href="mailto:contact@tikirilia.lk" aria-label="Email" title="Email">✉</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
