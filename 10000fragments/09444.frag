uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.35;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 7.08;
		float pv = sin(gq.x + time * 1.25) * sin(gq.y - time * 0.63);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.33 + float(zi) * 0.50 + time * 0.17));
		q = rot2(0.43) * q * 0.61 + vec2(-0.15, -0.23);
		fw *= 0.72;
	}
	col *= 0.39;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.26 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
