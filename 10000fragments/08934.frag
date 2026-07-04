uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.92 + t * 2.77 + ph) * 0.7;
    float wb = sin(p.y * 7.97 - t * 2.66 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.78;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.54;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.32) * p * 8.76;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.05, 0.00, 0.08), vec3(1.00, 0.98, 0.99), v);
	col = mod(col * 1.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
