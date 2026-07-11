uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.43 + t * 1.36) - 0.5) * 2.0;
    v = sin((p.y * 3.69 + zx * 0.92 + t * 1.71) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x = abs(p.x) - 0.44;
	float d = 0.5 + 0.5 * field(p, (time * 0.51), 0.0);
	vec2 hq = rot2(1.21) * p * 11.23;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.72;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = mix(vec3(0.08, 0.05, 0.01), vec3(0.74, 0.80, 0.92), v);
	col *= 0.85 + 0.11 * sin(gl_FragCoord.y * 2.57 + (time * 0.51) * 16.80);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(0.972, 1.000, 0.933) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
