uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.53 + (time * 0.73) * 0.84) * 0.11;
	p.x = abs(p.x);
	vec3 col = vec3(0.036, 0.003, 0.058);
	for(int li = 0; li < 15; li++){
		float fl = float(li);
		float fy = (fl / 15.0 - 0.5) * 1.60;
		float w = 0.30 * sin(p.x * 3.78 + (time * 0.73) * 4.40 + fl * 0.67) * exp(-p.x * p.x * 2.85);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.41, 2.82) + fl * 0.51 + (time * 0.73) * 0.24)) * (0.0045 / (ld + 0.0106));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.29 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.952, 0.995, 0.932) * 1.00 + 0.050;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
