uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 1.49 + t * 0.24) - 0.5) * 2.0;
    v = sin((p.y * 4.75 + zx * 1.67 + t * 1.32) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.35;
	float d = 0.5 + 0.5 * field(p, (time * 0.70), 0.0);
	vec2 hq = rot2(0.28) * p * 23.70;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = mix(vec3(0.83, 0.95, 0.75), vec3(0.11, 0.06, 0.05), v);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(1.046, 0.990, 0.932) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
