uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.27;
	vec3 col = vec3(0.027, 0.029, 0.039);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.08 - float(ci) * 0.11;
		vec2 cp = vec2(sin(ft * 5.0 + 2.36), sin(ft * 5.0)) * 0.52;
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.99)) * (0.0041 / (length(p - cp) + 0.010)) * fade;
	}
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
