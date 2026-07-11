uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.007, 0.031, 0.055);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 1.82 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.62 + 0.26 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.32)) * (0.0050 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
