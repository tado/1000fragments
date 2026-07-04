uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	p = rot2(time * -0.62) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.87 + 0.41 * sin(time * 1.56);
	float n2 = 2.47 + 0.87 * cos(time * 1.51);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.59;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = palette(v * 1.70 + sr * 0.84 * 0.46 + time * 0.21, vec3(0.40, 0.57, 0.52), vec3(0.35, 0.43, 0.49), vec3(0.82, 1.36, 1.34), vec3(0.03, 0.54, 0.66));
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.85;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
