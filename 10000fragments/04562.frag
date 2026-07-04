uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	vec3 col = vec3(0.023, 0.040, 0.034);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 1.16 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 4.0 + 0.52), sin(ft * 1.0)) * 0.75;
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.77)) * (0.0086 / (length(p - cp) + 0.012)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
