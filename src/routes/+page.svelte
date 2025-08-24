<script lang="ts">
	import { Geolocation } from '@capacitor/geolocation';
	import { onMount } from 'svelte';

	let loc: { latitude: number; longitude: number } | null = null;
	let incident: string = '';
	let isSending = false;
	let message = '';

	// Get current geolocation
	async function getCurrentPosition() {
		try {
			// Request permission first
			const permission = await Geolocation.requestPermissions();
			if (permission.location === 'denied') {
				message = 'Location permission denied!';
				return;
			}

			const res = await Geolocation.getCurrentPosition();
			loc = {
				latitude: res.coords.latitude,
				longitude: res.coords.longitude
			};
		} catch (err) {
			console.error('Error getting location:', err);
			message = 'Unable to get location.';
		}
	}

	// Send anonymous report
	async function sendReport() {
		if (!incident.trim() || !loc) {
			message = 'Please enter a description and get your location first.';
			return;
		}

		isSending = true;
		message = '';

		try {
			// Later replace with your API request (fetch/axios)
			console.log('📡 Sending report:', {
				incident,
				location: loc
			});

			// Fake delay to simulate sending
			await new Promise((r) => setTimeout(r, 1200));

			message = '✅ Incident report submitted anonymously!';
			incident = '';
			loc = null;
		} catch (err) {
			console.error('Error sending report:', err);
			message = '❌ Failed to send report.';
		} finally {
			isSending = false;
		}
	}

	onMount(() => {
		// Optionally auto-fetch location
		getCurrentPosition();
	});
</script>

<div class="mx-auto max-w-md space-y-4 p-4">
	<h1 class="text-xl font-bold">Campus Incident Reporting</h1>

	<textarea
		bind:value={incident}
		class="w-full rounded border p-2"
		rows="4"
		placeholder="Describe the incident (no personal info, you are anonymous)..."
	></textarea>

	{#if loc}
		<p class="text-sm text-gray-600">
			📍 Location: {loc.latitude.toFixed(5)}, {loc.longitude.toFixed(5)}
		</p>
	{:else}
		<p class="text-sm text-gray-500">Location not captured yet.</p>
	{/if}

	<div class="flex gap-2">
		<button
			class="rounded bg-blue-500 px-3 py-2 text-white hover:bg-blue-600"
			on:click={getCurrentPosition}
		>
			Get Location
		</button>

		<button
			class="rounded bg-green-500 px-3 py-2 text-white hover:bg-green-600 disabled:opacity-50"
			on:click={sendReport}
			disabled={isSending}
		>
			{isSending ? 'Sending...' : 'Send Report'}
		</button>
	</div>

	{#if message}
		<p class="mt-2 text-sm">{message}</p>
	{/if}
</div>
