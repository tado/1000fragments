uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.034, 0.017, 0.001);
	for(int li = 0; li < 16; li++){
		float fl = float(li);
		float fy = (fl / 16.0 - 0.5) * 1.70;
		float w = 0.27 * sin(p.x * 9.95 + (time * 0.54) * 3.84 + fl * 1.45) * exp(-p.x * p.x * 2.60);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.30, 2.59) + fl * 0.68 + (time * 0.54) * 0.75)) * (0.0040 / (ld + 0.0064));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.72 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.35);
	col = clamp(col, 0.0, 1.0) * vec3(1.058, 0.994, 0.928) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
