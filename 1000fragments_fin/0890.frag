uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x = abs(p.x);
	vec3 col = mix(vec3(0.018, 0.036, 0.049), vec3(0.029, 0.020, 0.060), clamp(0.5 + p.y * -0.35 + p.x * 0.27, 0.0, 1.0));
	for(int ci = 0; ci < 18; ci++){
		float ft = (time * 0.56) * 2.08 - float(ci) * 0.10;
		vec2 cp = cos(ft * 3.0) * 0.65 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(2.360, 4.450, 6.539) + ft * 1.60)) * (0.0098 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.16);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.945, 0.970, 1.045);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
