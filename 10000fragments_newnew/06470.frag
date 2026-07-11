uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.33;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 3.0;
	float n1 = 1.27 + 0.20 * sin(time * 1.09);
	float n2 = 2.24 + 0.28 * cos(time * 1.74);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.63;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.07, d);

	vec3 col = palette(v * 2.31 + sr * 1.03 * 1.27 + time * 0.36, vec3(0.46, 0.46, 0.56), vec3(0.39, 0.35, 0.41), vec3(1.32, 1.31, 1.25), vec3(0.27, 0.95, 0.20));
	col *= 1.0 - smoothstep(0.0, 0.09, d) * 0.88;
	col = fract(col * 1.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
