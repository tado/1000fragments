uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.84;
	vec3 col = vec3(0.026, 0.013, 0.022);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 1.17 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.46 + 0.25 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.92)) * (0.0072 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.95 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
