uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.53;
	vec3 col = vec3(0.011, 0.018, 0.000);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.38 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 3.0 + 0.12), sin(ft * 5.0)) * 0.86;
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.22)) * (0.0055 / (length(p - cp) + 0.023)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
