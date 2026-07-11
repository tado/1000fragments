uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.42;
	vec3 col = vec3(0.028, 0.031, 0.023);
	for(int ci = 0; ci < 17; ci++){
		float ft = time * 1.07 - float(ci) * 0.12;
		vec2 cp = cos(ft * 4.0) * 0.51 * vec2(cos(ft), sin(ft));
		float fade = 1.0 - float(ci) / 17.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.53)) * (0.0047 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
