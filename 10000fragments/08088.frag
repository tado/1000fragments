uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.037, 0.019, 0.029);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 0.67 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.59 + 0.17 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.34)) * (0.0086 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
