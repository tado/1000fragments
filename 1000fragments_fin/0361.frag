uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p += vec2(sin((time * 0.83) * 0.89), cos((time * 0.83) * 0.50)) * 0.20;
	p *= 1.02;
	vec3 col = vec3(0.006, 0.029, 0.071);
	for(int gi = 0; gi < 9; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.83) * 1.49 * (0.3 + fi * 0.07) + fi * 2.4), cos((time * 0.83) * 1.27 * (0.4 + fi * 0.10) + fi * 1.7)) * 0.91;
		float gd = abs(length(p - q) - 0.15);
		col += (0.5 + 0.5 * cos(vec3(2.238, 3.247, 4.256) + fi * 1.74 + (time * 0.83) * 0.47)) * (0.021 / (gd + 0.033));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.44));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.976, 1.011, 0.939);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
