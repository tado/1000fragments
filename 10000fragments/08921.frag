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
	float m = 8.0;
	float n1 = 1.33 + 0.47 * sin(time * 1.96);
	float n2 = 1.08 + 0.95 * cos(time * 1.19);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.41;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.09, d);

	vec3 col = palette(v * 1.93 + sr * 1.75 * 1.11 + time * 0.04, vec3(0.58, 0.53, 0.46), vec3(0.50, 0.43, 0.38), vec3(1.01, 1.10, 0.93), vec3(0.38, 0.05, 0.38));
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
