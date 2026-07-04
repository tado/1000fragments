uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.88;
	vec3 col = vec3(0.011, 0.016, 0.057);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 1.14 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.60 + 0.15 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.99)) * (0.0102 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
