uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec3 col = vec3(0.012, 0.009, 0.033);
	for(int ci = 0; ci < 26; ci++){
		float ft = time * 1.59 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.65 + 0.14 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 26.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.08)) * (0.0041 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 1.26, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
