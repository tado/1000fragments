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
	p += vec2(sin((time * 0.57) * 0.61), cos((time * 0.57) * 1.09)) * 0.23;
	p = p.yx;
	p *= 0.90;
	p = rot2((time * 0.57) * 1.39) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.95 + 0.18 * sin((time * 0.57) * 1.37);
	float n2 = 0.93 + 0.41 * cos((time * 0.57) * 1.14);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.76;
	float d = sr - rr;
	float v = sin(d * 20.75 - (time * 0.57) * 5.29);
	vec3 col = palette((v) * 1.05 + (time * 0.57) * 0.17, vec3(0.18, 0.34, 0.42), vec3(0.16, 0.29, 0.29), vec3(1.01, 1.02, 1.00), vec3(0.55, 0.47, 0.35));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.55);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.05);
	col *= vec3(1.033, 1.003, 0.922);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.24 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
