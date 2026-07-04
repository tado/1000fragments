uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	p = rot2(time * 0.95) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 0.98 + 0.66 * sin(time * 0.76);
	float n2 = 1.68 + 0.69 * cos(time * 0.60);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.44;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = palette(v * 2.04 + sr * 1.47 * 1.35 + time * 0.33, vec3(0.43, 0.54, 0.42), vec3(0.45, 0.36, 0.36), vec3(1.23, 0.72, 0.86), vec3(0.67, 0.73, 0.96));
	col *= 1.0 - smoothstep(0.0, 0.10, d) * 0.70;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
