import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";

import { createChat } from '@n8n/chat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit{
  protected readonly title = signal('angularFinal');

  ngAfterViewInit(): void {
    createChat({
      webhookUrl: 'http://localhost:5678/webhook/dd321448-e827-4bfd-a2dc-1d189c7581de/chat',
      webhookConfig: {
        method: 'POST',
        headers: {}
      },
      target: '#n8n-chat',
      mode: 'window',
      chatInputKey: 'chatInput',
      chatSessionKey: 'sessionId',
      loadPreviousSession: true,
      metadata: {},
      showWelcomeScreen: false,
      defaultLanguage: 'en',
      initialMessages: [
        'Hi there',
        "My name is Ally. I'm your personal AI assistant designed to provide you with any information about the SHOPPING MALL company. How can I help you?"
      ],
      i18n: {
        en: {
          title: 'Shopping Mall',
          subtitle: "Start a chat. We're here to help you 24/7.",
          footer: '',
          getStarted: 'New Conversation',
          inputPlaceholder: 'Type your question..',
        },
      } as any,
      enableStreaming: false,
    });
  }
}

