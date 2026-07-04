uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 7.0;
	float n1 = 1.56 + 0.39 * sin(time * 1.95);
	float n2 = 2.35 + 0.83 * cos(time * 1.51);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.46;
	float d = sr - rr;
	float v = sin(d * 26.30 - time * 2.56);
	vec3 col = palette(v * 1.11 + time * 0.06, vec3(0.45, 0.47, 0.42), vec3(0.44, 0.39, 0.41), vec3(0.79, 0.93, 1.08), vec3(0.33, 0.87, 0.59));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
