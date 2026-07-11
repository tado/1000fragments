uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.18;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.51 + 0.40 * sin(time * 1.90);
	float n2 = 1.25 + 0.21 * cos(time * 1.21);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.86;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = palette(v * 2.49 + sr * 1.93 * 0.94 + time * 0.15, vec3(0.52, 0.54, 0.47), vec3(0.38, 0.48, 0.48), vec3(1.29, 1.36, 0.80), vec3(0.35, 0.39, 0.30));
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.73;
	col = clamp((col - 0.5) * 1.26 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
