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
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(length(q) * 16.19 - (time * 0.78) * 2.48);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.55, 1.11) + pv * 2.37 + float(zi) * 0.94 + (time * 0.78) * 0.72));
		q = rot2(0.39) * q * 1.76 + vec2(-0.19, -0.28);
		fw *= 0.59;
	}
	col *= 0.35;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.45);
	col = clamp(col, 0.0, 1.0) * vec3(0.976, 1.026, 0.946) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
