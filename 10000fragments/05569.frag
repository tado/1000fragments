uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 0.74 + 0.24 * sin(time * 1.71);
	float n2 = 1.16 + 0.44 * cos(time * 1.19);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.49;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = palette(v * 1.06 + sr * 1.03 * 0.63 + time * 0.19, vec3(0.41, 0.58, 0.57), vec3(0.33, 0.47, 0.49), vec3(0.83, 1.27, 1.23), vec3(0.12, 0.15, 0.62));
	col *= 1.0 - smoothstep(0.0, 0.04, d) * 0.67;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
