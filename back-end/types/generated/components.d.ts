import type { Schema, Struct } from '@strapi/strapi';

export interface EducationSectionEducation extends Struct.ComponentSchema {
  collectionName: 'components_education_section_educations';
  info: {
    displayName: 'Section-Education';
  };
  attributes: {
    universityDate: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    universityName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    universityPara: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ExperienceResume extends Struct.ComponentSchema {
  collectionName: 'components_experience_resumes';
  info: {
    description: '';
    displayName: 'experience';
  };
  attributes: {
    bullets: Schema.Attribute.JSON & Schema.Attribute.Required;
    dates: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    position: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    type: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ProjectProjects extends Struct.ComponentSchema {
  collectionName: 'components_project_projects';
  info: {
    displayName: 'projects';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    imageSrc: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Schema.Attribute.Required;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    url: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ResumeResume extends Struct.ComponentSchema {
  collectionName: 'components_resume_resumes';
  info: {
    description: '';
    displayName: 'resume';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    education: Schema.Attribute.Component<'education.section-education', false>;
    experiences: Schema.Attribute.Component<'experience.resume', true>;
    frameworks: Schema.Attribute.JSON & Schema.Attribute.Required;
    languages: Schema.Attribute.JSON & Schema.Attribute.Required;
    others: Schema.Attribute.JSON & Schema.Attribute.Required;
    tagline: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
  };
}

export interface ServiceServices extends Struct.ComponentSchema {
  collectionName: 'components_service_services';
  info: {
    displayName: 'services';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SocialSocial extends Struct.ComponentSchema {
  collectionName: 'components_social_socials';
  info: {
    description: '';
    displayName: 'social';
  };
  attributes: {
    Email: Schema.Attribute.Email;
    link: Schema.Attribute.String & Schema.Attribute.Unique;
    title: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.DefaultTo<'title'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'education.section-education': EducationSectionEducation;
      'experience.resume': ExperienceResume;
      'project.projects': ProjectProjects;
      'resume.resume': ResumeResume;
      'service.services': ServiceServices;
      'social.social': SocialSocial;
    }
  }
}
