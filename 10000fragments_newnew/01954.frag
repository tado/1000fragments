uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	p = rot2(time * -0.32) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.65 + 0.27 * sin(time * 1.59);
	float n2 = 1.80 + 0.51 * cos(time * 1.47);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.48;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.54 + time * 0.28, vec3(0.48, 0.44, 0.42), vec3(0.42, 0.37, 0.31), vec3(1.09, 0.96, 0.71), vec3(0.59, 0.57, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
