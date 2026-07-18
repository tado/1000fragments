uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.43 + 0.16 * pow(abs(cos(ra * 2.0 + t * 2.47)), 1.39);
    v = sin((rr - pet) * 11.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.48;
	p *= 1.0 + 0.28 * sin((time * 0.55) * 2.66);
	p = rot2(length(p) * -3.41 + (time * 0.55) * 1.06) * p;
	p.y += sin(p.x * 7.92 + (time * 0.55) * 1.55) * 0.11;
	p = rot2(p.y * -1.97 + (time * 0.55) * 1.16) * p;
	float d = clamp(0.5 + 0.5 * field(p, (time * 0.55), 0.0), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.033, 0.048, 0.125), vec3(0.109, 0.436, 0.761), smoothstep(0.0, 0.59, d)), vec3(0.866, 0.964, 0.984), smoothstep(0.59, 1.0, d));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.19);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(0.944, 0.992, 1.051);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.49 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
