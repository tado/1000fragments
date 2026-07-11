uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.21;
	p = rot2(time * 0.86) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.82 + 0.34 * sin(time * 1.73);
	float n2 = 1.62 + 0.64 * cos(time * 1.00);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.83;
	float d = sr - rr;
	float v = sin(d * 19.49 - time * 1.98);
	vec3 col = palette(v * 0.65 + time * 0.07, vec3(0.46, 0.56, 0.53), vec3(0.44, 0.42, 0.46), vec3(1.24, 0.83, 0.80), vec3(0.49, 0.54, 0.61));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
