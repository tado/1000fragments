uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.11;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 1.40 + 0.68 * sin(time * 1.06);
	float n2 = 2.39 + 0.54 * cos(time * 0.53);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.78;
	float d = sr - rr;
	float v = sin(d * 22.28 - time * 1.26);
	vec3 col = palette(v * 0.52 + time * 0.22, vec3(0.41, 0.48, 0.43), vec3(0.48, 0.46, 0.43), vec3(1.03, 0.75, 1.37), vec3(1.00, 0.39, 0.76));
	col = mod(col * 1.94, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
