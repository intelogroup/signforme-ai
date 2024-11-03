const API_URL = import.meta.env.VITE_API_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${API_KEY}`
};

export const api = {
  // Document operations
  async getDocuments() {
    try {
      // Fetch documents and users
      const [documentsResponse, usersResponse] = await Promise.all([
        fetch(`${API_URL}/documents`, { headers }),
        fetch(`${API_URL}/users`, { headers })
      ]);

      if (!documentsResponse.ok || !usersResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const documents = await documentsResponse.json();
      const users = await usersResponse.json();

      // Map users to documents
      const documentsWithAssignees = documents.map(doc => ({
        ...doc,
        assignee: users.find(user => user.id === doc.assigneeId.toString())
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
    if (!response.ok) throw new Error('Failed to fetch document');
    return response.json();
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
      if (!documentResponse.ok) throw new Error('Failed to update document');

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
      if (!historyResponse.ok) throw new Error('Failed to update document history');

      const updatedDoc = await documentResponse.json();
      
      // Fetch the assignee data
      const userResponse = await fetch(`${API_URL}/users/${updatedDoc.assigneeId}`, { headers });
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const assignee = await userResponse.json();

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
    if (!response.ok) throw new Error('Failed to create document');
    return response.json();
  },

  // User operations
  async getUsers() {
    const response = await fetch(`${API_URL}/users`, { headers });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getUser(id) {
    const response = await fetch(`${API_URL}/users/${id}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  // Team operations
  async getTeams() {
    const response = await fetch(`${API_URL}/teams`, { headers });
    if (!response.ok) throw new Error('Failed to fetch teams');
    return response.json();
  },

  async getTeam(id) {
    const response = await fetch(`${API_URL}/teams/${id}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch team');
    return response.json();
  },

  // Document History operations
  async getDocumentHistory(documentId) {
    const response = await fetch(`${API_URL}/documentHistory?documentId=${documentId}`, { headers });
    if (!response.ok) throw new Error('Failed to fetch document history');
    return response.json();
  }
};
