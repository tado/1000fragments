uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.13 + (time * 0.63) * 0.75) * 0.18;
	p *= 1.02;
	vec3 col = vec3(0.014, 0.009, 0.032);
	for(int li = 0; li < 12; li++){
		float fl = float(li);
		float fy = (fl / 12.0 - 0.5) * 2.12;
		float w = 0.26 * sin(p.x * 7.74 + (time * 0.63) * 4.05 + fl * 0.98) * exp(-p.x * p.x * 2.44);
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(1.974, 2.841, 3.709) + fl * 0.53 + (time * 0.63) * 0.69)) * (0.0062 / (ld + 0.0094));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.47);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.040, 1.004, 0.926);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.50 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
