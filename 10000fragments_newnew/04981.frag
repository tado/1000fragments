uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.01;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.11 + 0.72 * sin(time * 1.70);
	float n2 = 1.11 + 0.33 * cos(time * 1.31);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.89;
	float d = sr - rr;
	float v = sin(d * 14.86 - time * 1.86);
	vec3 col = palette(v * 1.09 + time * 0.02, vec3(0.41, 0.40, 0.48), vec3(0.47, 0.34, 0.31), vec3(1.35, 0.93, 0.85), vec3(0.04, 0.49, 0.50));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.90 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
