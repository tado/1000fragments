uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.012, 0.016, 0.051);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 0.96 - float(ci) * 0.12;
		vec2 cp = vec2(sin(ft * 3.0 + 0.20), sin(ft * 4.0)) * 0.82;
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.78)) * (0.0103 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
