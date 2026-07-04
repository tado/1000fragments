uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.26;
	p = rot2(time * -0.68) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 0.55 + 0.43 * sin(time * 1.45);
	float n2 = 1.52 + 0.64 * cos(time * 0.41);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.44;
	float d = sr - rr;
	float v = sin(d * 25.80 - time * 3.50);
	vec3 col = palette(v * 0.72 + time * 0.20, vec3(0.44, 0.46, 0.43), vec3(0.44, 0.47, 0.34), vec3(1.17, 0.92, 0.94), vec3(0.57, 0.06, 0.18));
	col *= 0.89 + 0.18 * sin(gl_FragCoord.y * 2.13 + time * 6.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
