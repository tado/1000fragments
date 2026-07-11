uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.90;
	vec3 col = vec3(0.013, 0.013, 0.059);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 2.05 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 5.0 + 1.79), sin(ft * 1.0)) * 0.80;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.29)) * (0.0077 / (length(p - cp) + 0.014)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 2.15, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
