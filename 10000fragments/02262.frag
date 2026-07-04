uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.84;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 3.84;
		float pv = sin(gq.x + time * 2.29) * sin(gq.y - time * 0.88);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.70 + float(zi) * 0.32 + time * 0.50));
		q = rot2(0.45) * q * 0.79 + vec2(-0.14, 0.26);
		fw *= 0.63;
	}
	col *= 0.38;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.79 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
