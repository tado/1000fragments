uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	vec3 col = vec3(0.030, 0.014, 0.019);
	for(int ci = 0; ci < 19; ci++){
		float ft = time * 1.65 - float(ci) * 0.05;
		vec2 cp = vec2(cos(ft), sin(ft)) * (0.53 + 0.22 * sin(ft * 3.0));
		float fade = 1.0 - float(ci) / 19.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 1.22)) * (0.0074 / (length(p - cp) + 0.019)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 1.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
