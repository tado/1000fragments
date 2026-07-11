uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.31;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.76 + 0.14 * sin(time * 0.70);
	float n2 = 2.27 + 0.55 * cos(time * 0.53);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.89;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = palette(v * 1.81 + sr * 1.61 * 0.92 + time * 0.11, vec3(0.54, 0.49, 0.49), vec3(0.33, 0.43, 0.40), vec3(1.14, 0.84, 0.96), vec3(0.75, 0.48, 0.17));
	col *= 1.0 - smoothstep(0.0, 0.06, d) * 0.77;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
