uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	p = rot2(time * -0.57) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.28 + 0.25 * sin(time * 0.67);
	float n2 = 1.95 + 0.92 * cos(time * 1.50);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.56;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.64 + time * 0.25, vec3(0.49, 0.59, 0.54), vec3(0.48, 0.36, 0.42), vec3(1.36, 0.91, 1.30), vec3(0.94, 0.37, 0.38));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
