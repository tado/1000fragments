uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.036, 0.004, 0.000);
	for(int ci = 0; ci < 16; ci++){
		float ft = time * 1.12 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.44 + 0.19 * sin(ft * 6.0));
		float fade = 1.0 - float(ci) / 16.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.64)) * (0.0042 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.53));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
