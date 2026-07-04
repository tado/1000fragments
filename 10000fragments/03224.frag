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
	float n1 = 1.13 + 0.19 * sin(time * 0.56);
	float n2 = 2.44 + 0.95 * cos(time * 1.12);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.64;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.13, d);

	vec3 col = palette(v * 1.05 + sr * 1.75 * 1.03 + time * 0.32, vec3(0.53, 0.57, 0.47), vec3(0.39, 0.46, 0.37), vec3(0.91, 0.90, 1.34), vec3(0.35, 0.54, 0.57));
	col *= 1.0 - smoothstep(0.0, 0.02, d) * 0.91;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
