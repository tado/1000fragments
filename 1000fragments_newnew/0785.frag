uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 5; zi++){
		vec2 gq = q * 8.12;
		float pv = sin(gq.x + (time * 0.58) * 1.25) * sin(gq.y - (time * 0.58) * 2.72);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.46, 0.91) + pv * 3.10 + float(zi) * 0.51 + (time * 0.58) * 0.50));
		q = rot2(0.54) * q * 0.71 + vec2(0.18, 0.17);
		fw *= 0.57;
	}
	col *= 0.37;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.56 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.65);
	col = clamp(col, 0.0, 1.0) * vec3(1.015, 0.942, 0.998) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
