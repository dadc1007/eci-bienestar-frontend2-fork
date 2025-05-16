import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { enrollUser, getInscriptions, deleteInscription } from '../services/enrollmentService';

export const useInscriptions = () => {
  return useQuery({
    queryKey: ['inscriptions'],
    queryFn: getInscriptions,
  });
};

export const useEnrollUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, classId }: { userId: string; classId: string }) =>
      enrollUser(userId, classId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inscriptions'] }),
  });
};

export const useDeleteInscription = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, classId }: { userId: string; classId: string }) =>
      deleteInscription(userId, classId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['inscriptions'] }),
  });
};