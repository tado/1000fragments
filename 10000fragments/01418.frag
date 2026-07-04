uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.028, 0.037, 0.000);
	for(int ci = 0; ci < 20; ci++){
		float ft = time * 1.29 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.48 + 0.15 * sin(ft * 7.0));
		float fade = 1.0 - float(ci) / 20.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.59)) * (0.0090 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
