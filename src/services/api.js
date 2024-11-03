const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};

const handleResponse = async (response) => {
  if (!response.ok) {
    // Log the actual response text for debugging
    const text = await response.text();
    console.error('API Error Response:', text);
    try {
      // Try to parse it as JSON anyway
      const data = JSON.parse(text);
      throw new Error(data.message || 'API request failed');
    } catch (e) {
      // If it's not JSON, throw the text content
      throw new Error(`API request failed: ${text}`);
    }
  }
  
  try {
    const text = await response.text();
    // Log the response for debugging
    console.log('API Response:', text);
    // Try to parse as JSON
    return text ? JSON.parse(text) : {};
  } catch (e) {
    console.error('JSON Parse Error:', e);
    throw new Error('Failed to parse JSON response');
  }
};

export const api = {
  // Document operations
  async getDocuments() {
    try {
      console.log('Fetching from:', `${API_URL}/documents`);
      // Fetch documents and users
      const [documentsResponse, usersResponse] = await Promise.all([
        fetch(`${API_URL}/documents`, { headers }),
        fetch(`${API_URL}/users`, { headers })
      ]);

      const documents = await handleResponse(documentsResponse);
      const users = await handleResponse(usersResponse);

      // Map users to documents
      const documentsWithAssignees = documents.map(doc => ({
        ...doc,
        assignee: users.find(user => user.id === doc.assigneeId?.toString())
      }));

      console.log('Documents with assignees:', documentsWithAssignees);
      return documentsWithAssignees;
    } catch (error) {
      console.error('Error in getDocuments:', error);
      throw error;
    }
  },

  async getDocument(id) {
    const response = await fetch(`${API_URL}/documents/${id}`, { headers });
    return handleResponse(response);
  },

  async updateDocumentStatus(id, status, userId) {
    try {
      // Update document status
      const documentResponse = await fetch(`${API_URL}/documents/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({
          status,
          updatedAt: new Date().toISOString()
        })
      });
      const updatedDoc = await handleResponse(documentResponse);

      // Add to document history
      const historyResponse = await fetch(`${API_URL}/documentHistory`, {
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
      await handleResponse(historyResponse);
      
      // Fetch the assignee data
      const userResponse = await fetch(`${API_URL}/users/${updatedDoc.assigneeId}`, { headers });
      const assignee = await handleResponse(userResponse);

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
    const response = await fetch(`${API_URL}/documents`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...document,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    });
    return handleResponse(response);
  },

  // User operations
  async getUsers() {
    const response = await fetch(`${API_URL}/users`, { headers });
    return handleResponse(response);
  },

  async getUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`, { headers });
    return handleResponse(response);
  },

  // Team operations
  async getTeams() {
    const response = await fetch(`${API_URL}/teams`, { headers });
    return handleResponse(response);
  },

  async getTeam(id) {
    const response = await fetch(`${API_URL}/teams/${id}`, { headers });
    return handleResponse(response);
  },

  // Document History operations
  async getDocumentHistory(documentId) {
    const response = await fetch(`${API_URL}/documentHistory?documentId=${documentId}`, { headers });
    return handleResponse(response);
  }
};
