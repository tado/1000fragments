uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.55;
	vec3 col = vec3(0.040, 0.018, 0.054);
	for(int ci = 0; ci < 28; ci++){
		float ft = time * 1.09 - float(ci) * 0.06;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.20 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 28.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.50)) * (0.0062 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
