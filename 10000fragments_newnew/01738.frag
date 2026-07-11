uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.20;
	p = rot2(time * -1.01) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.21 + 0.51 * sin(time * 1.20);
	float n2 = 1.11 + 0.48 * cos(time * 1.65);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.64;
	float d = sr - rr;
	float v = sin(d * 12.45 - time * 1.89);
	vec3 col = palette(v * 0.51 + time * 0.25, vec3(0.46, 0.45, 0.56), vec3(0.47, 0.35, 0.38), vec3(1.22, 1.32, 0.78), vec3(0.09, 0.08, 0.98));
	col *= 0.86 + 0.13 * sin(gl_FragCoord.y * 1.79 + time * 7.24);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
