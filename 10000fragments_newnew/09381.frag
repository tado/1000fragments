uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.001, 0.017, 0.049);
	for(int ci = 0; ci < 25; ci++){
		float ft = time * 2.07 - float(ci) * 0.12;
		vec2 cp = vec2(sin(ft * 1.0 + 0.20), sin(ft * 3.0)) * 0.88;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.67)) * (0.0087 / (length(p - cp) + 0.014)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.12 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
