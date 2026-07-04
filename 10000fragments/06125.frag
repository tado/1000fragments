uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(time * -1.01) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 0.58 + 0.27 * sin(time * 0.88);
	float n2 = 0.64 + 0.95 * cos(time * 1.36);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.66;
	float d = sr - rr;
	float v = sin(d * 11.14 - time * 5.37);
	vec3 col = palette(v * 1.15 + time * 0.29, vec3(0.57, 0.49, 0.45), vec3(0.38, 0.33, 0.35), vec3(1.28, 1.28, 1.17), vec3(0.25, 0.44, 0.55));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
