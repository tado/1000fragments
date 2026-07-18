uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.x -= max(0.0, resolution.x / resolution.y - 1.8) * 0.5;
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.x = abs(p.x);
	p *= 1.56;
	vec3 col = vec3(0.030, 0.023, 0.025);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 2.02 + (time * 0.68) * 2.19), sin(fi * 2.02 + (time * 0.68) * 2.19)) * (0.61 + 0.18 * sin(fi * 1.7 + (time * 0.68) * 0.60));
		vec2 bq = abs(p - q) - vec2(0.21, 0.11);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(1.488, 2.584, 3.679) + fi * 0.59 + (time * 0.68) * 1.41)) * (0.019 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.25 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.06);
	col *= vec3(0.966, 0.998, 0.944);
	col += 0.004;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
