uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.46 + 0.15 * sin(time * 1.00);
	float n2 = 2.24 + 0.24 * cos(time * 0.51);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.67;
	float d = sr - rr;
	float v = sin(d * 26.32 - time * 2.56);
	vec3 col = palette(v * 1.32 + time * 0.36, vec3(0.51, 0.59, 0.45), vec3(0.31, 0.34, 0.40), vec3(1.20, 1.32, 1.04), vec3(0.47, 0.09, 0.10));
	col = clamp((col - 0.5) * 1.26 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
