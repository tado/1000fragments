uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p *= 1.00;
	p = rot2((time * 0.68) * 0.97) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.03 + 0.35 * sin((time * 0.68) * 1.17);
	float n2 = 1.27 + 0.51 * cos((time * 0.68) * 0.58);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.88;
	float d = sr - rr;
	float v = d;
	vec3 col = palette((v) * 0.72 + (time * 0.68) * 0.03, vec3(0.52, 0.49, 0.46), vec3(0.19, 0.22, 0.22), vec3(0.82, 0.67, 0.66), vec3(0.38, 0.29, 0.71));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.36);
	col = clamp(col, 0.0, 1.0) * vec3(0.921, 0.989, 1.031) * 1.00 + 0.014;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
