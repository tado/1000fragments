uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	p = rot2(time * 1.32) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.55 + 0.23 * sin(time * 1.43);
	float n2 = 2.26 + 0.83 * cos(time * 0.96);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.81;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.51 + time * 0.05, vec3(0.59, 0.47, 0.51), vec3(0.30, 0.40, 0.31), vec3(0.73, 1.26, 1.11), vec3(0.89, 0.21, 0.95));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
