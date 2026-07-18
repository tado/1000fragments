uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x);
	p.y += sin(p.x * 1.06 + (time * 0.84) * 1.32) * 0.08;
	p.x *= resolution.x / resolution.y;
	p *= 2.08;
	vec2 q = p * 1.85;
	float am = 0.30;
	for(int wi = 0; wi < 4; wi++){
		q += am * vec2(sin(q.y * 1.94 + (time * 0.84) * 0.54), sin(q.x * 2.05 - (time * 0.84) * 0.37));
		q = rot2(0.57) * q;
		am *= 0.85;
	}
	float v = sin(q.x * 2.40 + q.y * 1.01);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.048, 0.042, 0.067), vec3(0.722, 0.294, 0.184), smoothstep(0.0, 0.49, cc)), vec3(1.000, 0.818, 0.662), smoothstep(0.49, 1.0, cc));
	col = mix(col, vec3(0.05, 0.06, 0.03), smoothstep(0.79, 1.0, abs(v)) * 0.67);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(1.032, 1.014, 0.916);
	col += 0.015;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.41 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
