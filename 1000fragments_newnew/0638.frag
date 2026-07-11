uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.037, 0.014, 0.049);
	for(int ci = 0; ci < 17; ci++){
		float ft = (time * 0.67) * 1.35 - float(ci) * 0.04;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.64 + 0.18 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.53, 1.06) + ft * 1.18)) * (0.0067 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.64 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.014, 0.985, 0.999) * 1.00 + 0.028;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
