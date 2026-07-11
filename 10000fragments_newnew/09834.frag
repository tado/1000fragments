uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.027, 0.020, 0.008);
	for(int ci = 0; ci < 24; ci++){
		float ft = time * 1.51 - float(ci) * 0.11;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.64 + 0.14 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 24.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.80)) * (0.0095 / (length(p - cp) + 0.020)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
