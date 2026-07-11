uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	vec3 col = vec3(0.032, 0.033, 0.040);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 1.63 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.45 + 0.11 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.15)) * (0.0095 / (length(p - cp) + 0.018)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
