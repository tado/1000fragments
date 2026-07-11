uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.031, 0.036, 0.035);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 1.81 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.50 + 0.27 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.61)) * (0.0096 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
