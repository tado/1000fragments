uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y = abs(p.y);
	p += vec2(sin((time * 0.67) * 0.92), cos((time * 0.67) * 1.12)) * 0.16;
	p *= 1.49;
	p = rot2((time * 0.67) * -0.69) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.55 + 0.28 * sin((time * 0.67) * 1.87);
	float n2 = 1.02 + 0.68 * cos((time * 0.67) * 1.04);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.60;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	vec3 col = palette((v * 2.11 + sr * 1.19) * 1.00 + (time * 0.67) * 0.08, vec3(0.43, 0.41, 0.39), vec3(0.32, 0.27, 0.24), vec3(1.02, 1.04, 0.68), vec3(0.03, 0.22, 0.42));
	col *= 1.0 - smoothstep(0.0, 0.11, d) * 0.83;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.38));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col *= vec3(1.020, 0.992, 0.948);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
