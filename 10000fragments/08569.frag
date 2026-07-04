uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 18.50 + t * 0.71 + ph) * 0.7;
    float wb = sin(p.y * 9.52 - t * 2.26 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.35;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.95) * p * 10.39;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.93, 0.76, 0.62), vec3(0.12, 0.00, 0.18), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
