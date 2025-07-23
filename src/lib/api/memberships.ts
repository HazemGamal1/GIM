export const deleteMembership = async (id: string) => {
  const res = await fetch(`/api/memberships/delete-type/id=${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) {
    throw new Error('Failed to delete membership');
  }

  return res.json();
};