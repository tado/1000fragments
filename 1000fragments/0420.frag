uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	p = rot2(time * -0.35) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.69 + 0.50 * sin(time * 1.20);
	float n2 = 2.38 + 0.87 * cos(time * 1.46);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.69;
	float d = sr - rr;
	float v = sin(d * 17.44 - time * 3.89);
	vec3 col = palette(v * 0.88 + time * 0.30, vec3(0.48, 0.40, 0.60), vec3(0.31, 0.31, 0.34), vec3(1.16, 0.72, 0.95), vec3(0.34, 0.81, 0.45));
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.26 + time * 5.02);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
