uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.39;
	vec3 col = vec3(0.031, 0.030, 0.053);
	for(int ci = 0; ci < 18; ci++){
		float ft = time * 2.02 - float(ci) * 0.09;
		vec2 cp = vec2(sin(ft * 4.0 + 2.56), sin(ft * 5.0)) * 0.65;
		float fade = 1.0 - float(ci) / 18.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.84)) * (0.0040 / (length(p - cp) + 0.024)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
