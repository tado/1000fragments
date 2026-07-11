uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.28;
	vec3 col = vec3(0.014, 0.024, 0.010);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.90 - float(ci) * 0.06;
		vec2 cp = vec2(sin(ft * 3.0 + 0.95), sin(ft * 5.0)) * 0.75;
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.65)) * (0.0101 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
