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
	p.y += sin(p.x * 1.54 + (time * 0.58) * 0.98) * 0.08;
	p += vec2(sin((time * 0.58) * 0.65), cos((time * 0.58) * 0.84)) * 0.13;
	p *= 1.37;
	p = rot2((time * 0.58) * -1.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.12 + 0.71 * sin((time * 0.58) * 1.67);
	float n2 = 1.92 + 0.69 * cos((time * 0.58) * 1.66);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.65;
	float d = sr - rr;
	float v = sin(d * 14.87 - (time * 0.58) * 4.08);
	vec3 col = palette((v) * 0.80 + (time * 0.58) * 0.07, vec3(0.38, 0.45, 0.51), vec3(0.28, 0.28, 0.28), vec3(0.96, 0.88, 0.83), vec3(0.32, 0.43, 0.57));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.926, 0.977, 1.034);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
