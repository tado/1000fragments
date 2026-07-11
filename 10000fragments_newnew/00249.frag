uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	vec3 col = vec3(0.007, 0.007, 0.055);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 1.55 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.41 + 0.23 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.64)) * (0.0079 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
