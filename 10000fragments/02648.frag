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
	p = rot2(time * -1.17) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.27 + 0.79 * sin(time * 1.81);
	float n2 = 1.01 + 0.53 * cos(time * 0.95);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.73;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.14 + time * 0.23, vec3(0.50, 0.45, 0.42), vec3(0.36, 0.46, 0.49), vec3(0.88, 1.12, 1.26), vec3(0.22, 0.72, 0.52));
	col = mod(col * 1.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
