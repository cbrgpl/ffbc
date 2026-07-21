export type SessionDto = {
  email: string;
  id: string;
};

export type Session = {
  id: string;
  username: string;
};

export const dto2Session = (dto: SessionDto): Session => ({
  id: dto.id,
  username: dto.email,
});
