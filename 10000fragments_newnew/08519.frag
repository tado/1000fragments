uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.031, 0.013, 0.044);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.82 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.60 + 0.13 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.93)) * (0.0066 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
