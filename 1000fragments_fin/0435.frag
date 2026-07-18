uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.80 + t * 2.40 + ph) + sin(p.y * 4.96 - t * 2.40 + ph)
        + sin((p.x + p.y) * 10.98 + t * 2.40 + ph) + sin(length(p) * 15.74 - t * 2.40 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p *= 0.86;
	float d = 0.5 + 0.5 * field(p, (time * 0.80), 0.0);
	vec2 hq = rot2(0.23) * p * 9.06;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = mix(vec3(0.72, 0.76, 0.66), vec3(0.02, 0.04, 0.05), v);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.20);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(0.927, 0.992, 1.042);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
