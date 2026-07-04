uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec3 col = vec3(0.016, 0.034, 0.005);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 1.18 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 1.0 + 1.40), sin(ft * 2.0)) * 0.76;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.93)) * (0.0059 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
