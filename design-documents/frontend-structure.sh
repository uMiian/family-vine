frontend/
├── public/                  # Static files
├── src/
│   ├── index.js             # Entry point
│   ├── App.js               # Main App component
│   ├── api/
│   │   ├── index.js         # API client setup
│   │   ├── auth.js          # Auth API calls
│   │   ├── documents.js     # Document API calls
│   │   ├── metadata.js      # Metadata API calls
│   │   ├── relationships.js # Relationship API calls
│   │   └── visualization.js # Visualization data API calls
│   ├── components/
│   │   ├── common/          # Reusable components
│   │   │   ├── Button.js
│   │   │   ├── Input.js
│   │   │   ├── Modal.js
│   │   │   └── ...
│   │   ├── layout/          # Layout components
│   │   │   ├── Header.js
│   │   │   ├── Sidebar.js
│   │   │   └── Footer.js
│   │   ├── auth/            # Auth components
│   │   │   ├── LoginForm.js
│   │   │   └── RegisterForm.js
│   │   ├── documents/       # Document handling components
│   │   │   ├── FileUpload.js
│   │   │   ├── FileList.js
│   │   │   └── FileDetail.js
│   │   ├── metadata/        # Metadata components
│   │   │   └── MetadataForm.js
│   │   ├── relationships/   # Relationship components
│   │   │   ├── PersonForm.js
│   │   │   └── RelationshipForm.js
│   │   └── visualization/   # Visualization components
│   │       ├── Graph.js
│   │       ├── Timeline.js
│   │       └── FilterPanel.js
│   ├── pages/               # Page components
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Dashboard.js
│   │   ├── UploadPage.js
│   │   ├── DocumentsPage.js
│   │   ├── VisualizationPage.js
│   │   └── SettingsPage.js
│   ├── context/             # React Context
│   │   ├── AuthContext.js
│   │   └── AppContext.js
│   ├── hooks/               # Custom hooks
│   │   ├── useAuth.js
│   │   ├── useDocuments.js
│   │   └── useVisualization.js
│   ├── utils/               # Utility functions
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── helpers.js
│   └── styles/              # CSS/SCSS files
│       ├── global.css
│       ├── variables.css
│       └── components/
├── package.json
└── README.md
