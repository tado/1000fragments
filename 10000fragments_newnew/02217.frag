uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	p = rot2(time * -0.37) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.50 + 0.29 * sin(time * 1.87);
	float n2 = 2.00 + 0.79 * cos(time * 1.18);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.47;
	float d = sr - rr;
	float v = sin(d * 13.10 - time * 3.29);
	vec3 col = palette(v * 0.41 + time * 0.37, vec3(0.44, 0.52, 0.46), vec3(0.33, 0.38, 0.41), vec3(1.03, 0.89, 1.06), vec3(0.89, 0.88, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
