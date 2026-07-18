uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.23 + sin(p.y * 4.54 + t * 5.98) * 2.20 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.88) * 0.72), cos((time * 0.88) * 0.31)) * 0.18;
	p.x += p.y * 0.32;
	p *= 1.54;
	float d = 0.5 + 0.5 * field(p, (time * 0.88), 0.0);
	vec2 hq = rot2(0.98) * p * 13.04;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.88, 0.98, 0.74), vec3(0.14, 0.05, 0.11), v);
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.30);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(1.024, 0.973, 1.006);
	col += 0.026;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.32 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
