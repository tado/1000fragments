uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.45;
	p = rot2(time * 0.35) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.69 + 0.19 * sin(time * 1.52);
	float n2 = 0.68 + 0.81 * cos(time * 1.17);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.81;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.89 + time * 0.17, vec3(0.48, 0.48, 0.59), vec3(0.31, 0.32, 0.32), vec3(1.35, 1.18, 0.71), vec3(0.66, 0.14, 0.05));
	col *= 0.89 + 0.14 * sin(gl_FragCoord.y * 1.50 + time * 5.91);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
