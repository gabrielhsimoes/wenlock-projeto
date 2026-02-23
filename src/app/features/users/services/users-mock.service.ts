import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../user.model';

const STORAGE_KEY = 'users_mock_v1';

@Injectable({
  providedIn: 'root',
})
export class UsersMockService {
  private readonly _users$ = new BehaviorSubject<User[]>(this.load());
  readonly users$ = this._users$.asObservable();

  private load(): User[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as User[]) : [];
    } catch {
      return [];
    }
  }

  private persist(list: User[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  create(payload: Omit<User, 'id' | 'createdAt'>): User {
    const list = this._users$.value;
    const nextId = list.length ? Math.max(...list.map((u) => u.id)) + 1 : 1;

    const newUser: User = {
      id: nextId,
      createdAt: new Date().toISOString(),
      ...payload,
    };

    const next = [newUser, ...list];
    this._users$.next(next);
    this.persist(next);
    return newUser;
  }

  update(id: number, changes: Partial<Omit<User, 'id'>>): void {
    const next = this._users$.value.map((u) =>
      u.id === id ? { ...u, ...changes } : u,
    );
    this._users$.next(next);
    this.persist(next);
  }

  remove(id: number): void {
    const next = this._users$.value.filter((u) => u.id !== id);
    this._users$.next(next);
    this.persist(next);
  }

  getById(id: number): User | undefined {
    return this._users$.value.find((u) => u.id === id);
  }
}
