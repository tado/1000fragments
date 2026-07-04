uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.41;
	vec3 col = vec3(0.029, 0.031, 0.058);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 0.68 - float(ci) * 0.07;
		vec2 cp = vec2(sin(ft * 4.0 + 2.91), sin(ft * 1.0)) * 0.77;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.54)) * (0.0111 / (length(p - cp) + 0.021)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 2.00 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
