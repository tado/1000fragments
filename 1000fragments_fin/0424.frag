uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.16 + t * 5.51 + ph) + sin(p.y * 16.37 - t * 1.01 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.57) * 1.15), cos((time * 0.57) * 1.13)) * 0.25;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, (time * 0.57), 0.0);
	vec2 hq = rot2(0.37) * p * 15.33;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.72;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.75, 0.83, 0.80), vec3(0.02, 0.14, 0.08), v);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.69));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col *= vec3(1.009, 0.962, 1.010);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
