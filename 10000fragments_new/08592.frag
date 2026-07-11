uniform float time;
uniform vec2 resolution;
out vec4 fragColor;


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.52;
	vec3 col = vec3(0.059, 0.025, 0.026);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 q = vec2(cos(fi * 1.72 + time * 0.78), sin(fi * 1.72 + time * 0.78)) * (0.57 + 0.15 * sin(fi * 1.7 + time * 1.88));
		vec2 q2 = -q;
		vec2 pa = p - q; vec2 ba = q2 - q;
		float hh = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
		float gd = length(pa - ba * hh);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 0.56 + time * 0.27)) * (0.031 / (gd + 0.050));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.56 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
