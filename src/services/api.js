const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_URL) {
  console.error('VITE_API_URL is not configured');
}

if (!API_KEY) {
  console.error('VITE_API_KEY is not configured');
}

console.log('API Configuration:', {
  url: API_URL,
  hasKey: !!API_KEY
});

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};

const handleResponse = async (response, endpoint) => {
  console.log(`Response from ${endpoint}:`, {
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries())
  });

  const text = await response.text();
  console.log(`Raw response from ${endpoint}:`, text);

  if (!response.ok) {
    console.error(`API Error (${endpoint}):`, {
      status: response.status,
      text: text
    });
    throw new Error(`API request to ${endpoint} failed: ${text}`);
  }

  if (!text) {
    console.log(`Empty response from ${endpoint}`);
    return {};
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error(`JSON Parse Error (${endpoint}):`, {
      error: e.message,
      text: text
    });
    throw new Error(`Failed to parse JSON response from ${endpoint}: ${e.message}`);
  }
};

const fetchWithLogging = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;
  console.log(`Fetching ${url}`, {
    method: options.method || 'GET',
    headers: options.headers
  });

  try {
    const response = await fetch(url, options);
    return await handleResponse(response, endpoint);
  } catch (error) {
    console.error(`Fetch Error (${endpoint}):`, error);
    throw error;
  }
};

export const api = {
  // Document operations
  async getDocuments() {
    try {
      const [documents, users] = await Promise.all([
        fetchWithLogging('/documents', { headers }),
        fetchWithLogging('/users', { headers })
      ]);

      const documentsWithAssignees = documents.map(doc => ({
        ...doc,
        assignee: users.find(user => user.id === doc.assigneeId?.toString())
      }));

      console.log('Processed documents:', documentsWithAssignees);
      return documentsWithAssignees;
    } catch (error) {
      console.error('Error in getDocuments:', error);
      throw error;
    }
  },

  async getDocument(id) {
    return fetchWithLogging(`/documents/${id}`, { headers });
  },

  async updateDocumentStatus(id, status, userId) {
    try {
      const updatedDoc = await fetchWithLogging(`/documents/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          status,
          updatedAt: new Date().toISOString()
        })
      });

      await fetchWithLogging('/documentHistory', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          documentId: id,
          userId,
          action: status,
          comment: `Document ${status}`,
          timestamp: new Date().toISOString()
        })
      });

      const assignee = await fetchWithLogging(`/users/${updatedDoc.assigneeId}`, { headers });

      return {
        ...updatedDoc,
        assignee
      };
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  },

  async createDocument(document) {
    return fetchWithLogging('/documents', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...document,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    });
  },

  // User operations
  async getUsers() {
    return fetchWithLogging('/users', { headers });
  },

  async getUser(id) {
    return fetchWithLogging(`/users/${id}`, { headers });
  },

  // Team operations
  async getTeams() {
    return fetchWithLogging('/teams', { headers });
  },

  async getTeam(id) {
    return fetchWithLogging(`/teams/${id}`, { headers });
  },

  // Document History operations
  async getDocumentHistory(documentId) {
    return fetchWithLogging(`/documentHistory?documentId=${documentId}`, { headers });
  }
};
