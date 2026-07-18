uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = mix(vec3(0.064, 0.036, 0.062), vec3(0.058, 0.070, 0.090), clamp(0.5 + p.y * 0.63 + p.x * -0.27, 0.0, 1.0));
	for(int li = 0; li < 18; li++){
		float fl = float(li);
		float fy = (fl / 18.0 - 0.5) * 1.79;
		float w = 0.07 * sin(p.x * 8.00 + (time * 0.64) * 3.56 + fl * 0.89);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.483, 2.344, 4.206) + fl * 0.54 + (time * 0.64) * 0.43)) * (0.0037 / (ld + 0.0096));
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.21);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.017, 0.965, 1.003);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.27 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
