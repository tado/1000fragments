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
	p = rot2(time * 1.56) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.70 + 0.30 * sin(time * 0.50);
	float n2 = 1.66 + 0.72 * cos(time * 1.22);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.52;
	float d = sr - rr;
	float v = d;
	vec3 col = palette(v * 1.12 + time * 0.08, vec3(0.44, 0.50, 0.56), vec3(0.44, 0.50, 0.37), vec3(0.93, 1.23, 1.18), vec3(0.59, 0.62, 0.23));
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
