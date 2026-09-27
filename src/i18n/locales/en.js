const en = {
  common: {
    somethingWentWrong: { id: 'common.somethingWentWrong', defaultMessage: 'Something went wrong' },
    search: { id: 'common.search', defaultMessage: 'Search' },
    email: { id: 'common.email', defaultMessage: 'Email' },
    login: { id: 'common.login', defaultMessage: 'Login' },
    password: { id: 'common.password', defaultMessage: 'Password' },
    name: { id: 'common.name', defaultMessage: 'Name' },
    birthday: { id: 'common.birthday', defaultMessage: 'Birthday' },
    online: { id: 'common.online', defaultMessage: 'Online' },
    onlineNow: { id: 'common.onlineNow', defaultMessage: 'Online now' },
    seenToday: { id: 'common.seenToday', defaultMessage: 'Seen today at {time}' },
    seenOn: { id: 'common.seenOn', defaultMessage: 'Seen on {date}' },
    today: { id: 'common.today', defaultMessage: 'Today' },
    success: { id: 'common.success', defaultMessage: 'Success' },
    continue: { id: 'common.continue', defaultMessage: 'Continue' },
    tryAgain: { id: 'common.tryAgain', defaultMessage: 'Try again' },
    clear: { id: 'common.clear', defaultMessage: 'Clear' },
    pages: {
      home: { id: 'common.pages.home', defaultMessage: 'Home' },
      error: { id: 'common.pages.error', defaultMessage: 'Error' }
    },
    pagination: {
      prev: { id: 'common.pagination.prev', defaultMessage: 'Prev' },
      next: { id: 'common.pagination.next', defaultMessage: 'Next' },
      of: { id: 'common.pagination.of', defaultMessage: 'of' }
    },
    dateInput: {
      day: { id: 'common.dateInput.day', defaultMessage: 'Day' },
      month: { id: 'common.dateInput.month', defaultMessage: 'Month' },
      year: { id: 'common.dateInput.year', defaultMessage: 'Year' }
    },
    accountSection: {
      title: { id: 'common.accountSection.title', defaultMessage: 'Account Info' }
    },
    theme: {
      light: { id: 'common.theme.light', defaultMessage: 'Light' },
      dark: { id: 'common.theme.dark', defaultMessage: 'Dark' },
      switchToLight: { id: 'common.theme.switchToLight', defaultMessage: 'Switch to light' },
      switchToDark: { id: 'common.theme.switchToDark', defaultMessage: 'Switch to dark' }
    },
    sidebar: {
      home: { id: 'common.sidebar.home', defaultMessage: 'Home' },
      messenger: { id: 'common.sidebar.messenger', defaultMessage: 'Messenger' },
      aiProfiles: { id: 'common.sidebar.aiProfiles', defaultMessage: 'AI Profiles' },
      users: { id: 'common.sidebar.users', defaultMessage: 'Users (A)' },
      openSearch: { id: 'common.sidebar.openSearch', defaultMessage: 'Open search' }
    },
    menu: {
      profile: { id: 'common.menu.profile', defaultMessage: 'Profile' },
      settings: { id: 'common.menu.settings', defaultMessage: 'Settings' },
      logout: { id: 'common.menu.logout', defaultMessage: 'Log out' }
    }
  },
  auth: {
    signIn: { id: 'auth.signIn', defaultMessage: 'Sign In' },
    signUp: { id: 'auth.signUp', defaultMessage: 'Sign Up' },
    forgotPassword: { id: 'auth.forgotPassword', defaultMessage: 'Forgot password?' },
    login: {
      title: { id: 'auth.login.title', defaultMessage: 'Sign in' },
      description: { id: 'auth.login.description', defaultMessage: 'Enter your login details' }
    },
    registration: {
      title: { id: 'auth.registration.title', defaultMessage: 'Create your account' },
      progress: { id: 'auth.registration.progress', defaultMessage: 'Step {current} of {total}' },
      allDone: { id: 'auth.registration.allDone', defaultMessage: 'All done!' },
      instructionsSent: {
        id: 'auth.registration.instructionsSent',
        defaultMessage: 'Further instructions have been sent to your email'
      },
      steps: {
        email: {
          title: { id: 'auth.registration.steps.email.title', defaultMessage: 'Enter your email' },
          description: {
            id: 'auth.registration.steps.email.description',
            defaultMessage: 'Your email will be used to log into your account'
          }
        },
        login: {
          title: { id: 'auth.registration.steps.login.title', defaultMessage: 'Choose a username' },
          description: {
            id: 'auth.registration.steps.login.description',
            defaultMessage: 'This is how other users will find and recognize you'
          }
        },
        password: {
          title: {
            id: 'auth.registration.steps.password.title',
            defaultMessage: 'Create a password'
          },
          description: {
            id: 'auth.registration.steps.password.description',
            defaultMessage: 'Use a strong password to keep your account secure'
          }
        },
        birthday: {
          title: { id: 'auth.registration.steps.birthday.title', defaultMessage: 'Your birthday' },
          description: {
            id: 'auth.registration.steps.birthday.description',
            defaultMessage: 'Used for age verification and personalization'
          }
        }
      },
      email: {
        title: { id: 'auth.registration.email.title', defaultMessage: 'Enter your email' },
        description: {
          id: 'auth.registration.email.description',
          defaultMessage: 'Your email will be used to log into your account'
        }
      },
      login: {
        title: { id: 'auth.registration.login.title', defaultMessage: 'Enter your login' },
        description: {
          id: 'auth.registration.login.description',
          defaultMessage: 'Your login will be used to identify your account'
        }
      },
      password: {
        title: { id: 'auth.registration.password.title', defaultMessage: 'Enter your password' },
        description: {
          id: 'auth.registration.password.description',
          defaultMessage: 'Your password will be used to log into your account'
        },
        confirmation: {
          id: 'auth.registration.password.confirmation',
          defaultMessage: 'Confirmation password'
        }
      },
      birthday: {
        title: { id: 'auth.registration.birthday.title', defaultMessage: 'Enter your birthday' },
        description: {
          id: 'auth.registration.birthday.description',
          defaultMessage: 'Your birthday will be used to log into your account'
        }
      }
    },
    confirmRegistration: {
      failed: { id: 'auth.confirmRegistration.failed', defaultMessage: 'Failed' },
      completed: {
        id: 'auth.confirmRegistration.completed',
        defaultMessage: 'Sign up successfully completed'
      },
      codeNotExists: {
        id: 'auth.confirmRegistration.codeNotExists',
        defaultMessage: 'Code is not exists'
      }
    },
    resetPassword: {
      title: { id: 'auth.resetPassword.title', defaultMessage: 'Reset password' },
      description: {
        id: 'auth.resetPassword.description',
        defaultMessage: 'Enter your new password'
      },
      newPassword: { id: 'auth.resetPassword.newPassword', defaultMessage: 'New password' },
      confirmPassword: {
        id: 'auth.resetPassword.confirmPassword',
        defaultMessage: 'Confirm password'
      },
      submit: { id: 'auth.resetPassword.submit', defaultMessage: 'Reset password' },
      redirect: { id: 'auth.resetPassword.redirect', defaultMessage: 'Redirect to login page' }
    },
    initResetPassword: {
      description: { id: 'auth.initResetPassword.description', defaultMessage: 'Enter your email' },
      linkSent: {
        id: 'auth.initResetPassword.linkSent',
        defaultMessage: 'A reset link has been sent to your email address'
      },
      notReceived: {
        id: 'auth.initResetPassword.notReceived',
        defaultMessage: "Didn't receive a message?"
      },
      resendIn: { id: 'auth.initResetPassword.resendIn', defaultMessage: 'Try again in' },
      seconds: { id: 'auth.initResetPassword.seconds', defaultMessage: 'seconds' },
      submit: { id: 'auth.initResetPassword.submit', defaultMessage: 'Send reset link' }
    },
    validation: {
      emailMaxLength: {
        id: 'auth.validation.emailMaxLength',
        defaultMessage: '* The length of the entered email must be less than {count} characters'
      },
      emailMinLength: {
        id: 'auth.validation.emailMinLength',
        defaultMessage: '* The length of the entered email must be more than {count} characters'
      },
      emailPattern: {
        id: 'auth.validation.emailPattern',
        defaultMessage: '* The entered email must match the pattern'
      },
      loginMaxLength: {
        id: 'auth.validation.loginMaxLength',
        defaultMessage: '* The length of the entered login must be less than {count} characters'
      },
      loginMinLength: {
        id: 'auth.validation.loginMinLength',
        defaultMessage: '* The length of the entered login must be more than {count} characters'
      },
      loginPattern: {
        id: 'auth.validation.loginPattern',
        defaultMessage: '* The entered login must include English letters and numbers'
      },
      passwordMaxLength: {
        id: 'auth.validation.passwordMaxLength',
        defaultMessage: '* The length of the entered password must be less than {count} characters'
      },
      passwordMinLength: {
        id: 'auth.validation.passwordMinLength',
        defaultMessage: '* The length of the entered password must be more than {count} characters'
      },
      passwordMismatch: {
        id: 'auth.validation.passwordMismatch',
        defaultMessage: '* Password mismatch'
      },
      incorrectDay: { id: 'auth.validation.incorrectDay', defaultMessage: '* Incorrect day' },
      incorrectMonth: { id: 'auth.validation.incorrectMonth', defaultMessage: '* Incorrect month' },
      incorrectYear: { id: 'auth.validation.incorrectYear', defaultMessage: '* Incorrect year' },
      channelNameMaxLength: {
        id: 'auth.validation.channelNameMaxLength',
        defaultMessage: 'Name must be less than {count} characters'
      },
      channelNameMinLength: {
        id: 'auth.validation.channelNameMinLength',
        defaultMessage: 'Name must be more than {count} characters'
      },
      channelNamePattern: {
        id: 'auth.validation.channelNamePattern',
        defaultMessage: 'Name must contain valid characters'
      }
    }
  },
  admin: {
    create: { id: 'admin.create', defaultMessage: 'Create' },
    update: { id: 'admin.update', defaultMessage: 'Update' },
    edit: { id: 'admin.edit', defaultMessage: 'Edit' },
    table: {
      id: { id: 'admin.table.id', defaultMessage: 'Id' },
      image: { id: 'admin.table.image', defaultMessage: 'image' },
      tools: { id: 'admin.table.tools', defaultMessage: 'tools' }
    },
    users: {
      title: { id: 'admin.users.title', defaultMessage: 'Users' },
      status: { id: 'admin.users.status', defaultMessage: 'Status' },
      banned: { id: 'admin.users.banned', defaultMessage: 'Banned' },
      bannedStatus: { id: 'admin.users.bannedStatus', defaultMessage: 'Banned' },
      active: { id: 'admin.users.active', defaultMessage: 'Active' },
      offline: { id: 'admin.users.offline', defaultMessage: 'Offline' },
      block: { id: 'admin.users.block', defaultMessage: 'Block' },
      unblock: { id: 'admin.users.unblock', defaultMessage: 'Unblock' },
      newPassword: {
        id: 'admin.users.newPassword',
        defaultMessage: 'New password (leave empty to keep)'
      },
      requiredFields: {
        id: 'admin.users.requiredFields',
        defaultMessage: 'Fill in all required fields'
      }
    },
    aiProfiles: {
      title: { id: 'admin.aiProfiles.title', defaultMessage: 'AI Profiles' },
      model: { id: 'admin.aiProfiles.model', defaultMessage: 'Model' },
      template: { id: 'admin.aiProfiles.template', defaultMessage: 'Template' },
      temperature: { id: 'admin.aiProfiles.temperature', defaultMessage: 'Temperature' },
      apiKey: { id: 'admin.aiProfiles.apiKey', defaultMessage: 'Api key' },
      direct: { id: 'admin.aiProfiles.direct', defaultMessage: 'Direct' },
      remove: { id: 'admin.aiProfiles.remove', defaultMessage: 'Remove' },
      selectModel: { id: 'admin.aiProfiles.selectModel', defaultMessage: 'Select AI Model' },
      enterTemplate: { id: 'admin.aiProfiles.enterTemplate', defaultMessage: 'Enter template' },
      additionalKey: { id: 'admin.aiProfiles.additionalKey', defaultMessage: 'Additional key' },
      enterApiKey: { id: 'admin.aiProfiles.enterApiKey', defaultMessage: 'Enter api-key' }
    }
  },
  profile: {
    editProfile: { id: 'profile.editProfile', defaultMessage: 'Edit profile' }
  },
  chat: {
    noName: { id: 'chat.noName', defaultMessage: 'none' },
    noMessages: { id: 'chat.noMessages', defaultMessage: 'No messages yet' },
    newChannel: { id: 'chat.newChannel', defaultMessage: 'New channel' },
    createChat: { id: 'chat.createChat', defaultMessage: 'Create chat' },
    aiChat: { id: 'chat.aiChat', defaultMessage: 'AI chat' },
    members: { id: 'chat.members', defaultMessage: 'Members: {count}' },
    filter: {
      all: { id: 'chat.filter.all', defaultMessage: 'All' },
      public: { id: 'chat.filter.public', defaultMessage: 'Public' },
      private: { id: 'chat.filter.private', defaultMessage: 'Private' },
      direct: { id: 'chat.filter.direct', defaultMessage: 'Direct' }
    },
    channelType: {
      public: { id: 'chat.channelType.public', defaultMessage: 'Public' },
      private: { id: 'chat.channelType.private', defaultMessage: 'Private' },
      direct: { id: 'chat.channelType.direct', defaultMessage: 'Direct' }
    },
    channelListEmpty: {
      nothingFound: { id: 'chat.channelListEmpty.nothingFound', defaultMessage: 'Nothing found' },
      noChats: { id: 'chat.channelListEmpty.noChats', defaultMessage: 'No chats yet' },
      tryAnotherQuery: {
        id: 'chat.channelListEmpty.tryAnotherQuery',
        defaultMessage: 'Try a different search query'
      },
      createHint: {
        id: 'chat.channelListEmpty.createHint',
        defaultMessage: 'Create a chat using the + button above'
      }
    },
    messageListEmpty: {
      notFound: {
        id: 'chat.messageListEmpty.notFound',
        defaultMessage: 'No messages found for «{query}»'
      },
      startHint: {
        id: 'chat.messageListEmpty.startHint',
        defaultMessage: 'Send the first message to start the conversation'
      }
    },
    noChatSelected: {
      title: { id: 'chat.noChatSelected.title', defaultMessage: 'No chat selected' },
      subtitle: {
        id: 'chat.noChatSelected.subtitle',
        defaultMessage: 'Choose a conversation from the list or start a new one'
      }
    },
    attachment: {
      download: { id: 'chat.attachment.download', defaultMessage: 'Download {name}' },
      noName: { id: 'chat.attachment.noName', defaultMessage: 'None' },
      noExtension: { id: 'chat.attachment.noExtension', defaultMessage: 'NONE' }
    },
    newMessage: {
      placeholder: { id: 'chat.newMessage.placeholder', defaultMessage: 'Enter message' },
      image: { id: 'chat.newMessage.image', defaultMessage: 'Image' },
      file: { id: 'chat.newMessage.file', defaultMessage: 'File' },
      video: { id: 'chat.newMessage.video', defaultMessage: 'Video' }
    },
    createChannel: {
      namePlaceholder: { id: 'chat.createChannel.namePlaceholder', defaultMessage: 'Enter name' },
      create: { id: 'chat.createChannel.create', defaultMessage: 'Create' }
    },
    errors: {
      invalidChannelType: {
        id: 'chat.errors.invalidChannelType',
        defaultMessage: 'Channel type is not correct'
      },
      selectProfile: { id: 'chat.errors.selectProfile', defaultMessage: 'Please select a profile' },
      tooManyFiles: {
        id: 'chat.errors.tooManyFiles',
        defaultMessage: 'Maximum number of attached files exceeded'
      },
      filesTooLarge: {
        id: 'chat.errors.filesTooLarge',
        defaultMessage: 'Maximum size of attached files exceeded'
      }
    }
  },
  search: {
    placeholder: { id: 'search.placeholder', defaultMessage: 'Search people, channels…' },
    ariaLabel: { id: 'search.ariaLabel', defaultMessage: 'Search people and channels' },
    filter: {
      all: { id: 'search.filter.all', defaultMessage: 'All' },
      people: { id: 'search.filter.people', defaultMessage: 'People' },
      channels: { id: 'search.filter.channels', defaultMessage: 'Channels' }
    },
    sections: {
      people: { id: 'search.sections.people', defaultMessage: 'People' },
      publicChannels: { id: 'search.sections.publicChannels', defaultMessage: 'Public channels' }
    },
    seeAll: { id: 'search.seeAll', defaultMessage: 'See all →' },
    loadingMore: { id: 'search.loadingMore', defaultMessage: 'Loading more…' },
    noResults: { id: 'search.noResults', defaultMessage: 'No results for «{query}»' },
    nothingToShow: { id: 'search.nothingToShow', defaultMessage: 'Nothing to show yet' },
    publicChannel: { id: 'search.publicChannel', defaultMessage: 'Public channel' },
    join: { id: 'search.join', defaultMessage: 'Join' },
    message: { id: 'search.message', defaultMessage: 'Message' }
  },
  settings: {
    title: { id: 'settings.title', defaultMessage: 'Settings' },
    description: {
      id: 'settings.description',
      defaultMessage: 'Personalize the app to suit you'
    },
    appearance: {
      title: { id: 'settings.appearance.title', defaultMessage: 'Appearance' },
      description: {
        id: 'settings.appearance.description',
        defaultMessage: 'Customize how M7R looks on this device'
      },
      theme: { id: 'settings.appearance.theme', defaultMessage: 'Theme' },
      accentColor: { id: 'settings.appearance.accentColor', defaultMessage: 'Accent color' },
      chatBackground: {
        id: 'settings.appearance.chatBackground',
        defaultMessage: 'Chat background'
      }
    },
    language: {
      title: { id: 'settings.language.title', defaultMessage: 'Language' },
      interface: { id: 'settings.language.interface', defaultMessage: 'Interface language' }
    },
    accents: {
      purple: { id: 'settings.accents.purple', defaultMessage: 'Purple' },
      blue: { id: 'settings.accents.blue', defaultMessage: 'Blue' },
      teal: { id: 'settings.accents.teal', defaultMessage: 'Teal' },
      green: { id: 'settings.accents.green', defaultMessage: 'Green' },
      orange: { id: 'settings.accents.orange', defaultMessage: 'Orange' },
      pink: { id: 'settings.accents.pink', defaultMessage: 'Pink' }
    },
    backgrounds: {
      none: { id: 'settings.backgrounds.none', defaultMessage: 'Default' },
      aurora: { id: 'settings.backgrounds.aurora', defaultMessage: 'Aurora' },
      dots: { id: 'settings.backgrounds.dots', defaultMessage: 'Dots' },
      grid: { id: 'settings.backgrounds.grid', defaultMessage: 'Grid' },
      stripes: { id: 'settings.backgrounds.stripes', defaultMessage: 'Stripes' },
      ocean: { id: 'settings.backgrounds.ocean', defaultMessage: 'Ocean' },
      sunset: { id: 'settings.backgrounds.sunset', defaultMessage: 'Sunset' },
      forest: { id: 'settings.backgrounds.forest', defaultMessage: 'Forest' }
    },
    preview: {
      incoming: {
        id: 'settings.preview.incoming',
        defaultMessage: 'Hi! How do you like the new look?'
      },
      outgoing: { id: 'settings.preview.outgoing', defaultMessage: 'Looks great!' }
    }
  }
}

export default en
