uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	vec3 col = vec3(0.027, 0.006, 0.034);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 0.86 - float(ci) * 0.06;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.48 + 0.29 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.24)) * (0.0111 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
