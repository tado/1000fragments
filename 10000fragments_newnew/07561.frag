uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 6.0;
	float n1 = 0.74 + 0.65 * sin(time * 1.54);
	float n2 = 1.10 + 0.42 * cos(time * 0.73);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.55;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.12, d);

	vec3 col = palette(v * 1.55 + sr * 1.14 * 1.10 + time * 0.25, vec3(0.40, 0.53, 0.46), vec3(0.33, 0.42, 0.33), vec3(0.96, 1.12, 0.74), vec3(0.69, 0.95, 0.96));
	col *= 1.0 - smoothstep(0.0, 0.10, d) * 0.68;
	col = clamp((col - 0.5) * 1.30 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
