uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	p = rot2((time * 0.77) * 0.57) * p;
	float sa = atan(p.y, p.x);
	float sr = length(p);
	float m = 9.0;
	float n1 = 1.85 + 0.61 * sin((time * 0.77) * 1.21);
	float n2 = 2.06 + 0.42 * cos((time * 0.77) * 0.92);
	float t1 = pow(abs(cos(m * sa * 0.25)), n2);
	float t2 = pow(abs(sin(m * sa * 0.25)), n2);
	float rr = pow(t1 + t2, -1.0 / max(n1, 0.2)) * 0.61;
	float d = sr - rr;
	float v = sin(d * 25.81 - (time * 0.77) * 2.06);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.035, 0.067, 0.120), vec3(0.168, 0.591, 0.484), smoothstep(0.0, 0.44, cc)), vec3(0.989, 0.960, 0.901), smoothstep(0.44, 1.0, cc));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.33);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.22);
	col *= vec3(0.923, 0.982, 1.051);
	col += 0.021;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.47 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
