import { createFeatureSelector } from '@ngrx/store';
import { GameState } from '..';

export const selectGame = createFeatureSelector<GameState>('game');
