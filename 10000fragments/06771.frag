uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.16 + 0.51 * sin(time * 0.95);
	float n2 = 2.01 + 0.85 * cos(time * 1.49);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.65;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = palette(v * 2.37 + sr * 1.87 * 0.85 + time * 0.21, vec3(0.43, 0.43, 0.47), vec3(0.50, 0.32, 0.44), vec3(0.88, 1.38, 0.98), vec3(0.75, 0.70, 0.20));
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.72;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.75 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
