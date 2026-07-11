uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.10;
	vec3 col = vec3(0.027, 0.059, 0.019);
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 q = vec2(sin(time * 1.17 * (0.3 + fi * 0.15) + fi * 2.4), cos(time * 1.53 * (0.4 + fi * 0.06) + fi * 1.7)) * 0.84;
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.66 + time * 0.74)) * (0.019 / (gd + 0.040));
	}
	col = col / (1.0 + col);
	col *= 0.81 + 0.10 * sin(gl_FragCoord.y * 1.14 + time * 16.70);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
