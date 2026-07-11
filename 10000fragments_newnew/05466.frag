uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.97;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.29 + 0.57 * sin(time * 1.78);
	float n2 = 0.97 + 0.72 * cos(time * 1.75);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.78;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.10, d);

	vec3 col = palette(v * 1.13 + sr * 1.82 * 0.72 + time * 0.30, vec3(0.49, 0.46, 0.53), vec3(0.38, 0.36, 0.48), vec3(0.95, 1.19, 1.34), vec3(0.77, 0.97, 0.10));
	col *= 1.0 - smoothstep(0.0, 0.03, d) * 0.69;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
