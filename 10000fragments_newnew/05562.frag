uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.73 + 0.56 * sin(time * 1.06);
	float n2 = 0.77 + 0.41 * cos(time * 1.58);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.59;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = palette(v * 1.01 + sr * 1.88 * 1.36 + time * 0.07, vec3(0.60, 0.47, 0.44), vec3(0.44, 0.46, 0.47), vec3(0.96, 1.32, 1.18), vec3(0.93, 0.10, 0.39));
	col *= 1.0 - smoothstep(0.0, 0.14, d) * 0.68;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
