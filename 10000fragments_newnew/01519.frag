uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	vec3 col = vec3(0.023, 0.021, 0.043);
	for(int ci = 0; ci < 30; ci++){
		float ft = time * 0.71 - float(ci) * 0.07;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.54 + 0.12 * sin(ft * 4.0));
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.64)) * (0.0113 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
