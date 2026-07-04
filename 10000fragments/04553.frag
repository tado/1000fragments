uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.021, 0.036, 0.047);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 2.08 - float(ci) * 0.12;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.54 + 0.16 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.90)) * (0.0106 / (length(p - cp) + 0.016)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
