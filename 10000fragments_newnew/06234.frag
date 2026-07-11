uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.031, 0.021, 0.038);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 0.82 - float(ci) * 0.10;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.45 + 0.28 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.67)) * (0.0112 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.84 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
