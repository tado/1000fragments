uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.34;
	vec3 col = vec3(0.006, 0.037, 0.038);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 2.03 - float(ci) * 0.08;
		vec2 cp = vec2(sin(ft * 5.0 + 2.52), sin(ft * 4.0)) * 0.82;
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.85)) * (0.0119 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 2.86, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
