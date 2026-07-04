uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.004, 0.002, 0.046);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 2.00 - float(ci) * 0.09;
		vec2 cp = cos(ft * 2.0) * 0.80 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.53)) * (0.0079 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
