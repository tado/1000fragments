uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p.y = abs(p.y) - 0.56;
	p *= 0.88;
	vec3 col = mix(vec3(0.033, 0.031, 0.081), vec3(0.027, 0.050, 0.090), clamp(0.5 + p.y * 0.52 + p.x * 0.18, 0.0, 1.0));
	for(int ci = 0; ci < 30; ci++){
		float ft = (time * 0.57) * 1.16 - float(ci) * 0.06;
		vec2 cp = vec2(sin(ft * 5.0 + 0.93), sin(ft * 1.0)) * 0.60;
		float fade = 1.0 - float(ci) / 30.0;
		col += (0.5 + 0.5 * cos(vec3(3.919, 5.407, 6.894) + ft * 1.68)) * (0.0119 / (length(p - cp) + 0.026)) * fade;
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.021, 0.973, 0.949);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.54 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
