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
	p = rot2(time * -0.61) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.34 + 0.26 * sin(time * 1.82);
	float n2 = 1.50 + 0.97 * cos(time * 0.94);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.81;
	float d = sr - rr;
	float v = sin(d * 12.68 - time * 3.32);
	vec3 col = palette(v * 0.96 + time * 0.33, vec3(0.40, 0.47, 0.47), vec3(0.43, 0.42, 0.48), vec3(0.94, 0.86, 0.84), vec3(0.97, 0.54, 0.46));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
