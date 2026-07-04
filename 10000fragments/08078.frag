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
	p = rot2(time * -0.57) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.12 + 0.44 * sin(time * 1.40);
	float n2 = 0.66 + 0.85 * cos(time * 0.93);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.76;
	float d = sr - rr;
	float v = sin(d * 22.83 - time * 4.30);
	vec3 col = palette(v * 1.10 + time * 0.24, vec3(0.56, 0.48, 0.50), vec3(0.31, 0.43, 0.40), vec3(0.71, 1.25, 1.30), vec3(0.08, 0.11, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
