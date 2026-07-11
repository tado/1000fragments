uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	vec3 col = vec3(0.013, 0.026, 0.031);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 1.92 - float(ci) * 0.12;
		vec2 cp = vec2(sin(ft * 4.0 + 0.17), sin(ft * 1.0)) * 0.90;
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.91)) * (0.0108 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.94 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
