uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.29 + t * 0.75 + ph) * 0.7;
    float wb = sin(p.y * 8.56 - t * 1.14 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.62;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.36;
	float d = 0.5 + 0.5 * field(p, (time * 0.73), 0.0);
	vec2 hq = rot2(0.36) * p * 14.49;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.68;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.75, 0.93, 0.73), vec3(0.12, 0.11, 0.11), v);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.17 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.985, 1.004, 0.982) * 1.00 + 0.036;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
