uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.15;
	vec3 col = vec3(0.006, 0.038, 0.024);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.79 - float(ci) * 0.07;
		vec2 cp = cos(ft * 6.0) * 0.64 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.90)) * (0.0066 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
