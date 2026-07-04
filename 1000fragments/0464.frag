uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.24;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.83 + 0.17 * sin(time * 1.93);
	float n2 = 1.57 + 0.92 * cos(time * 0.69);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.45;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.06, d);

	vec3 col = palette(v * 2.32 + sr * 0.66 * 0.67 + time * 0.30, vec3(0.55, 0.51, 0.56), vec3(0.34, 0.42, 0.42), vec3(0.91, 1.04, 0.79), vec3(0.31, 0.64, 0.77));
	col *= 1.0 - smoothstep(0.0, 0.05, d) * 0.83;
	col = mod(col * 2.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
