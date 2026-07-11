uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.10;
	vec3 col = vec3(0.028, 0.015, 0.045);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 0.73 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.14 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.90)) * (0.0044 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.05));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
