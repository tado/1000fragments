uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.47;
	p = rot2(time * -1.30) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.56 + 0.26 * sin(time * 1.55);
	float n2 = 1.64 + 0.82 * cos(time * 1.28);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.67;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 0.64 + time * 0.03, vec3(0.48, 0.55, 0.58), vec3(0.36, 0.43, 0.45), vec3(1.26, 1.05, 0.96), vec3(0.22, 0.57, 0.77));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.78 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
