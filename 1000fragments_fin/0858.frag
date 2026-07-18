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
	p *= 1.18;
	p *= 0.81;
	p = rot2((time * 0.69) * 1.04) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.92 + 0.35 * sin((time * 0.69) * 1.65);
	float n2 = 2.20 + 0.22 * cos((time * 0.69) * 1.49);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.45;
	float d = sr - rr;
	float v = sin(d * 15.56 - (time * 0.69) * 2.01);
	vec3 col = palette((v) * 0.57 + (time * 0.69) * 0.14, vec3(0.30, 0.39, 0.25), vec3(0.22, 0.28, 0.17), vec3(1.03, 0.99, 1.00), vec3(0.11, 0.20, 0.06));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.76));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.932, 0.992, 1.058);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.43 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
