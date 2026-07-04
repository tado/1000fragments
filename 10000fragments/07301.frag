uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	p = rot2(time * 0.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.63 + 0.66 * sin(time * 1.79);
	float n2 = 2.24 + 0.70 * cos(time * 1.30);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.72;
	float d = sr - rr;
	float v = sin(d * 16.19 - time * 2.65);
	vec3 col = palette(v * 0.44 + time * 0.09, vec3(0.50, 0.45, 0.49), vec3(0.44, 0.38, 0.36), vec3(0.83, 0.76, 0.94), vec3(0.92, 0.24, 0.84));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
