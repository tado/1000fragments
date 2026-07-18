uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 9.99 + t * 3.67 + ph) * 0.7;
    float wb = sin(p.y * 6.46 - t * 3.16 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.65;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.36;
	float d = 0.5 + 0.5 * field(p, (time * 0.62), 0.0);
	vec2 hq = rot2(1.16) * p * 16.86;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.54;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.89, 0.84, 0.68), vec3(0.13, 0.07, 0.20), v);
	col = clamp((col - 0.5) * 1.25 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.37);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.926, 0.998, 1.034);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.51 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
