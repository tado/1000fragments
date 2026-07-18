uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(sin((time * 0.72) * 0.86), cos((time * 0.72) * 1.04)) * 0.05;
	p *= 2.45;
	vec2 q = p * 2.10;
	float am = 0.48;
	for(int wi = 0; wi < 6; wi++){
		q += am * vec2(sin(q.y * 1.90 + (time * 0.72) * 0.74), sin(q.x * 2.30 - (time * 0.72) * 0.76));
		q = rot2(0.68) * q;
		am *= 0.73;
	}
	float v = sin(q.x * 3.50 + q.y * 2.30);
	float cc = clamp(0.5 + 0.5 * (v), 0.0, 1.0);
	vec3 col = mix(mix(vec3(0.022, 0.032, 0.078), vec3(0.449, 0.216, 0.657), smoothstep(0.0, 0.44, cc)), vec3(1.000, 0.719, 0.847), smoothstep(0.44, 1.0, cc));
	col = mix(col, vec3(0.00, 0.05, 0.03), smoothstep(0.87, 1.0, abs(v)) * 0.73);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.028, 0.966, 1.024);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.39 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
