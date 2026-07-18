uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 9.63 + t * 4.88 + ph) + sin(p.y * 4.49 - t * 4.88 + ph)
        + sin((p.x + p.y) * 3.83 + t * 4.88 + ph) + sin(length(p) * 13.49 - t * 4.88 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x += p.y * 0.80;
	p *= 1.12;
	float d = 0.5 + 0.5 * field(p, (time * 0.58), 0.0);
	vec2 hq = rot2(1.26) * p * 13.25;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.71;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.02, 0.00, 0.01), vec3(0.78, 0.77, 0.69), v);
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(1.032, 1.008, 0.918);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
