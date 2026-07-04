uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec3 col = vec3(0.020, 0.021, 0.013);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 0.80 - float(ci) * 0.12;
		vec2 cp = vec2(sin(ft * 1.0 + 1.94), sin(ft * 1.0)) * 0.60;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.80)) * (0.0091 / (length(p - cp) + 0.028)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
