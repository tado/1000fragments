uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	vec3 col = vec3(0.011, 0.020, 0.033);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 0.89 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.53 + 0.11 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.42)) * (0.0041 / (length(p - cp) + 0.011)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
