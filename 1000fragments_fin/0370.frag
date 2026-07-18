uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x += p.y * -0.76;
	p *= 0.93;
	vec3 col = vec3(0.043, 0.058, 0.077);
	for(int gi = 0; gi < 10; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin((time * 0.90) * 1.43 * (0.3 + fi * 0.16) + fi * 2.4), cos((time * 0.90) * 1.13 * (0.4 + fi * 0.19) + fi * 1.7)) * 0.48;
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.195, 1.519, 2.843) + fi * 1.26 + (time * 0.90) * 1.33)) * (0.040 / (gd + 0.027));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.43);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.988, 1.020, 0.936);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
