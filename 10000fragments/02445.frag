uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.12;
	vec3 col = vec3(0.014, 0.036, 0.023);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.45 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.54 + 0.17 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.79)) * (0.0054 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
