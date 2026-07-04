uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	vec3 col = vec3(0.000, 0.037, 0.014);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.17 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 2.0 + 0.28), sin(ft * 1.0)) * 0.65;
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.93)) * (0.0048 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.36);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
