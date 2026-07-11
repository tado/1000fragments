uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.89 + t * 2.76 + ph) * 0.7;
    float wb = sin(p.y * 8.85 - t * 0.89 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.63;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.28) * p * 9.55;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.58;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = mix(vec3(0.05, 0.09, 0.01), vec3(0.73, 0.93, 0.98), v);
	col = mod(col * 1.93, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
