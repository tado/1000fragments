uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.023, 0.036, 0.027);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.68 - float(ci) * 0.06;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.46 + 0.16 * sin(ft * 8.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.83)) * (0.0081 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
