uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x = abs(p.x) - 0.26;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 7.60;
		float pv = sin(gq.x + (time * 0.74) * 1.62) * sin(gq.y - (time * 0.74) * 2.63);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.48, 0.96) + pv * 1.52 + float(zi) * 0.78 + (time * 0.74) * 0.24));
		q = rot2(0.96) * q * 0.58 + vec2(-0.27, 0.03);
		fw *= 0.66;
	}
	col *= 0.39;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(0.970, 1.025, 0.951) * 1.00 + 0.018;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
