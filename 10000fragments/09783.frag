uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.09;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 1.52 + 0.37 * sin(time * 1.14);
	float n2 = 1.90 + 0.86 * cos(time * 1.27);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.54;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	vec3 col = palette(v * 2.09 + sr * 0.95 * 0.73 + time * 0.01, vec3(0.55, 0.47, 0.41), vec3(0.44, 0.35, 0.50), vec3(0.91, 0.77, 0.76), vec3(0.10, 0.21, 0.62));
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.65;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
