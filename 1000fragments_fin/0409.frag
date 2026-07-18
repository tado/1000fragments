uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 16.85 + t * 2.79 + ph) + sin(p.y * 7.77 - t * 4.58 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.20;
	float d = 0.5 + 0.5 * field(p, (time * 0.55), 0.0);
	vec2 hq = rot2(1.28) * p * 11.49;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.72;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 0.86 + (time * 0.55) * 0.22, vec3(0.30, 0.25, 0.39), vec3(0.41, 0.40, 0.48), vec3(1.02, 1.04, 1.02), vec3(0.61, 0.80, 0.06)) * v;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.26);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.042, 1.004, 0.938);
	col += 0.019;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
