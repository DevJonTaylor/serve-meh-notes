/**
 * TODO:  test static toNote
 */
import { jest, describe, test } from '@jest/globals'
import Note from '../../Classes/Modals/Note.js'

const nanoIdResponse = 'qwerty'
jest.useFakeTimers()
jest.setSystemTime(new Date('2021-01-01'))
describe('Test Suite > Note Class', () => {

  test('Instantiation: Note | id: string | created: JS timestamp', () => {
    const note = new Note();
    expect(note).toBeInstanceOf(Note);
  })

  test('id: string', () => {
    const note = new Note();
    note._id = nanoIdResponse;
    expect(note.id).toEqual(nanoIdResponse)
  })

  test('created: JS timestamp', () => {
    const note = new Note();
    expect(note.created).toEqual(1609459200000)
  })

  test('updated: JS timestamp', () => {
    const note = new Note();
    expect(note.updated).toEqual(1609459200000)
  })

  test('title(title?: string): string|this', () => {
    const note = new Note();
    expect(note.title('testing string')).toBeInstanceOf(Note)
    expect(note.title()).toEqual('testing string')
  })

  test('text(text?: string): JS timestamp', () => {
    const note = new Note();
    expect(note.text('testing string')).toBeInstanceOf(Note)
    expect(note.text()).toEqual('testing string')
  })

  test('toObject: {{ id: string, title: string, text: string, created: number, updated: number }}', () => {
    const note = new Note();
    note._id = nanoIdResponse;
    note.title('title')
      .text('text')
    expect(note.toObject).toEqual({
      id: nanoIdResponse,
      title: 'title',
      text: 'text',
      created: 1609459200000,
      updated: 1609459200000
    })
  })

  test('toString(): string', () => {
    const obj = {
      id: nanoIdResponse,
      title: 'title',
      text: 'text',
      created: 1609459200000,
      updated: 1609459200000
    };
    const note = new Note();
    note.title('title').text('text')._id = nanoIdResponse
    expect(note.toString()).toEqual(JSON.stringify(obj))
  })

  test(
    'static toNote({{ id: string, title: string, text: string, created: number, updated: number }}): Note',
    () => {
    expect(Note.toNote({id: nanoIdResponse, title: 'title', text: 'text', created: 1609459200000, updated: 1609459200000})).toBeInstanceOf(Note)
  })

  afterAll(() => {
    jest.useRealTimers()
  })
})