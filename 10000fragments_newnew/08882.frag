uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	vec3 col = vec3(0.022, 0.032, 0.053);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 1.85 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 2.0 + 2.52), sin(ft * 4.0)) * 0.54;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.02)) * (0.0083 / (length(p - cp) + 0.029)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
