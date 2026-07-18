uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p = p.yx;
	p *= 1.08;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.50 + 0.53 * sin((time * 0.68) * 0.50);
	float n2 = 0.88 + 0.42 * cos((time * 0.68) * 1.77);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.50;
	float d = sr - rr;
	float v = d;
	vec3 col = vec3(0.5 + 0.5 * (v)) * vec3(0.41, 0.43, 0.45) + vec3(0.09, 0.11, 0.06);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.30);
	col *= vec3(0.942, 0.970, 1.055);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.60 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
