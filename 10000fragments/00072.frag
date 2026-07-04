uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.005, 0.037, 0.020);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.09 - float(ci) * 0.05;
		vec2 cp = cos(ft * 2.0) * 0.52 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.38)) * (0.0066 / (length(p - cp) + 0.014)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
