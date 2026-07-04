uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	p = rot2(time * 1.50) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.75 + 0.31 * sin(time * 1.75);
	float n2 = 0.77 + 0.58 * cos(time * 1.48);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.82;
	float d = sr - rr;
	float v = sin(d * 20.40 - time * 2.40);
	vec3 col = palette(v * 0.60 + time * 0.07, vec3(0.42, 0.55, 0.45), vec3(0.34, 0.50, 0.38), vec3(1.36, 1.16, 0.92), vec3(0.33, 0.12, 1.00));
	col *= 0.87 + 0.18 * sin(gl_FragCoord.y * 2.81 + time * 8.89);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
