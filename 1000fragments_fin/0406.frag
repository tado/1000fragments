uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 7.70 + t * 2.42 + ph) * 0.7;
    float wb = sin(p.y * 13.75 - t * 2.80 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.73;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p *= 1.74;
	float d = 0.5 + 0.5 * field(p, (time * 0.57), 0.0);
	vec2 hq = rot2(0.45) * p * 10.47;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.59;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.77, 0.74, 0.68), vec3(0.14, 0.12, 0.19), v);
	col = clamp((col - 0.5) * 2.05 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(0.989, 1.004, 0.994);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.55 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
