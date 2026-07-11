uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.35;
	vec3 col = vec3(0.031, 0.036, 0.023);
	for(int ci = 0; ci < 27; ci++){
		float ft = time * 0.84 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 3.0 + 0.60), sin(ft * 4.0)) * 0.61;
		float fade = 1.0 - float(ci) / 27.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.52)) * (0.0079 / (length(p - cp) + 0.027)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
