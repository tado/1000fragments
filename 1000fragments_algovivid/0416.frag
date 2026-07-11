uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.49, 0.0)) * 13.85 - t * 6.52 + ph);
    float mb = sin(length(p + vec2(0.49, 0.0)) * 25.25 - t * 4.94 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.20;
	float d = 0.5 + 0.5 * field(p, (time * 0.57), 0.0);
	vec2 hq = rot2(0.98) * p * 15.13;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = mix(vec3(0.79, 0.89, 0.81), vec3(0.12, 0.12, 0.17), v);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.10);
	col = clamp(col, 0.0, 1.0) * vec3(0.983, 1.005, 1.015) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
