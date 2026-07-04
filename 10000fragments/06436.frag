uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.95;
	vec3 col = vec3(0.006, 0.011, 0.002);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 1.45 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 5.0 + 1.39), sin(ft * 1.0)) * 0.83;
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.14)) * (0.0087 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
