uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(time * -1.43) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.81 + 0.18 * sin(time * 0.53);
	float n2 = 0.87 + 0.71 * cos(time * 0.88);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.89;
	float d = sr - rr;
	float v = sin(d * 11.55 - time * 4.10);
	vec3 col = palette(v * 0.66 + time * 0.24, vec3(0.56, 0.56, 0.56), vec3(0.33, 0.38, 0.35), vec3(1.25, 1.14, 1.21), vec3(0.03, 0.48, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
