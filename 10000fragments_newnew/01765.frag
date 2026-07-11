uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	vec3 col = vec3(0.036, 0.011, 0.048);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 0.95 - float(ci) * 0.06;
		vec2 cp = vec2(sin(ft * 1.0 + 0.55), sin(ft * 3.0)) * 0.89;
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.70)) * (0.0040 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
