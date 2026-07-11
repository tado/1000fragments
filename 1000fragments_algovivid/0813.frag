uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.59 + (time * 0.71) * 1.37) * 0.10;
	p *= 1.13;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 4.0;
	float n1 = 2.00 + 0.46 * sin((time * 0.71) * 0.55);
	float n2 = 0.75 + 0.30 * cos((time * 0.71) * 1.56);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.43;
	float d = sr - rr;
	float v = sin(d * 18.22 - (time * 0.71) * 2.44);
	vec3 col = vec3(0.61, 0.58, 0.71) * (0.06 / (abs((v)) + 0.03));
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col = clamp(col, 0.0, 1.0) * vec3(1.042, 0.997, 0.928) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
