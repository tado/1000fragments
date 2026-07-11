uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.59 + 0.66 * sin(time * 1.66);
	float n2 = 1.53 + 0.91 * cos(time * 0.56);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.79;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.14, d);

	vec3 col = palette(v * 1.76 + sr * 1.14 * 1.15 + time * 0.08, vec3(0.45, 0.49, 0.56), vec3(0.41, 0.33, 0.49), vec3(0.92, 0.82, 1.10), vec3(0.44, 0.95, 0.03));
	col *= 1.0 - smoothstep(0.0, 0.08, d) * 0.81;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
