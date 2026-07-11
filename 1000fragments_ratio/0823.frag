uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y += sin(p.x * 2.51 + (time * 0.68) * 1.13) * 0.17;
	p.y = abs(p.y);
	p *= 1.10;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 8.0;
	float n1 = 1.94 + 0.78 * sin((time * 0.68) * 1.35);
	float n2 = 1.38 + 0.53 * cos((time * 0.68) * 1.00);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.59;
	float d = sr - rr;
	float v = 1.0 - smoothstep(0.0, 0.05, d);

	float cc = clamp(0.5 + 0.5 * (v * 1.27 + sr * 0.76), 0.0, 1.0);
	vec3 col = mix(vec3(0.09, 0.08, 0.05), vec3(0.77, 0.84, 0.72), cc);
	col *= 1.0 - smoothstep(0.0, 0.05, d) * 0.74;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.51 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 0.953, 1.012) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
