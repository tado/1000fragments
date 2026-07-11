uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.43, 0.0)) * 23.89 - t * 3.64 + ph);
    float mb = sin(length(p + vec2(0.43, 0.0)) * 21.30 - t * 1.88 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 0.76;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, (time * 0.67), 0.0);
	vec2 hq = rot2(0.32) * p * 12.21;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 0.92 + (time * 0.67) * 0.05, vec3(0.43, 0.43, 0.41), vec3(0.17, 0.17, 0.14), vec3(0.42, 0.89, 0.43), vec3(0.50, 0.57, 0.56)) * v;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.61 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col = clamp(col, 0.0, 1.0) * vec3(1.023, 1.009, 0.947) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
