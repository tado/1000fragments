uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.46;
	vec3 col = vec3(0.022, 0.019, 0.020);
	for(int ci = 0; ci < 22; ci++){
		float ft = time * 1.71 - float(ci) * 0.10;
		vec2 cp = vec2(sin(ft * 3.0 + 0.37), sin(ft * 2.0)) * 0.61;
		float fade = 1.0 - float(ci) / 22.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ft * 0.62)) * (0.0044 / (length(p - cp) + 0.022)) * fade;
	}
	col = col / (1.0 + col);
	col = mod(col * 1.67, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
