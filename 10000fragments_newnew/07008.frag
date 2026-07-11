uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.021, 0.024, 0.021);
	for(int ci = 0; ci < 29; ci++){
		float ft = time * 0.83 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.61 + 0.27 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 29.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.71)) * (0.0062 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 2.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
