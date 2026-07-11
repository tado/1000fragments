uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 5.0;
	float n1 = 1.70 + 0.33 * sin(time * 0.71);
	float n2 = 1.75 + 0.64 * cos(time * 0.40);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.73;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = palette(v * 2.13 + sr * 0.71 * 1.28 + time * 0.06, vec3(0.43, 0.51, 0.43), vec3(0.45, 0.42, 0.39), vec3(0.99, 1.27, 1.14), vec3(0.32, 0.13, 0.29));
	col *= 1.0 - smoothstep(0.0, 0.12, d) * 0.66;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
