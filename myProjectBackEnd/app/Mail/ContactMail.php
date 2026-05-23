<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Content;

class OTPMail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $otp;
    public $userName;

    public function __construct($userName, $otp)
    {
        $this->userName = $userName;
        $this->otp = $otp;
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your OTP Code'
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.contact'
        );
    }

    public function attachments(): array
    {
        return [];
    }
}
