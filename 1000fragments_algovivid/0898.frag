uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.031, 0.017, 0.058);
	for(int ci = 0; ci < 25; ci++){
		float ft = (time * 0.79) * 0.74 - float(ci) * 0.05;
		vec2 cp = vec2(sin(ft * 3.0 + 2.40), sin(ft * 1.0)) * 0.83;
		float fade = 1.0 - float(ci) / 25.0;
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.04, 2.08) + ft * 1.11)) * (0.0089 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.73 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col = clamp(col, 0.0, 1.0) * vec3(0.917, 0.999, 1.031) * 1.00 + 0.025;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
