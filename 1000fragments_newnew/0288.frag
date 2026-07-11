uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.71;
    v = 0.5 * (sin(1.0 * cp.x + t * 1.54) * sin(2.0 * cp.y + ph)
             + sin(2.0 * cp.x - t * 1.05) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, (time * 0.80), 0.0);
	vec2 hq = rot2(1.14) * p * 19.34;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.84, 0.85, 0.67), vec3(0.13, 0.05, 0.05), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.85 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.949, 0.974, 1.034) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
