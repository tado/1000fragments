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
	p = rot2(time * 0.43) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.63 + 0.63 * sin(time * 1.88);
	float n2 = 1.00 + 0.49 * cos(time * 0.90);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.83;
	float d = sr - rr;
	float v = sin(d * 17.36 - time * 3.07);
	vec3 col = palette(v * 1.36 + time * 0.28, vec3(0.59, 0.47, 0.52), vec3(0.35, 0.42, 0.45), vec3(0.93, 0.90, 0.77), vec3(0.57, 0.33, 0.58));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
