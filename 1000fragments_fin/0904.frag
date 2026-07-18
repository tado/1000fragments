uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.x += p.y * 0.44;
	vec3 col = vec3(0.006, 0.007, 0.029);
	for(int ci = 0; ci < 21; ci++){
		float ft = (time * 0.90) * 1.07 - float(ci) * 0.06;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.70 + 0.27 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 21.0;
		col += (0.5 + 0.5 * cos(vec3(2.221, 4.144, 6.067) + ft * 0.60)) * (0.0087 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.32 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.28);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.022, 0.987, 0.938);
	col += 0.006;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.53 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
