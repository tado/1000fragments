uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.014, 0.030, 0.006);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 1.13 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.63 + 0.13 * sin(ft * 5.0));
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.69)) * (0.0112 / (length(p - cp) + 0.015)) * fade;
	}
	col = col / (1.0 + col);
	col = fract(col * 1.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
