uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y += sin(p.x * 1.41 + (time * 0.56) * 1.48) * 0.15;
	vec3 col = mix(vec3(0.058, 0.053, 0.046), vec3(0.071, 0.050, 0.043), clamp(0.5 + p.y * -0.60 + p.x * 0.27, 0.0, 1.0));
	for(int ci = 0; ci < 28; ci++){
		float ft = (time * 0.56) * 1.83 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 1.0 + 1.70), sin(ft * 5.0)) * 0.87;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.683, 1.767, 2.851) + ft * 1.32)) * (0.0051 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.31);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col *= vec3(0.930, 0.975, 1.041);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.52 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
