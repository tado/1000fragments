uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.032, 0.010, 0.057);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.82 - float(ci) * 0.05;
		vec2 cp = cos(ft * 2.0) * 0.71 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.41)) * (0.0087 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
