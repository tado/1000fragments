uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.031, 0.033, 0.016);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 1.67 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.61 + 0.29 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.72)) * (0.0072 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
