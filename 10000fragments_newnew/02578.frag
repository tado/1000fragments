uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.96 + 0.68 * sin(time * 1.82);
	float n2 = 1.30 + 0.40 * cos(time * 1.42);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.75;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	vec3 col = palette(v * 1.89 + sr * 1.93 * 0.89 + time * 0.37, vec3(0.46, 0.42, 0.48), vec3(0.44, 0.44, 0.47), vec3(1.23, 1.07, 0.73), vec3(0.20, 0.06, 0.89));
	col *= 1.0 - smoothstep(0.0, 0.11, d) * 0.67;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
