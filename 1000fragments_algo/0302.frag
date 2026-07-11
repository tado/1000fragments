uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		float pv = sin(length(q) * 16.58 - (time * 0.65) * 3.00);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.81, 1.62) + pv * 2.89 + float(zi) * 1.10 + (time * 0.65) * 0.16));
		q = rot2(1.02) * q * 0.57 + vec2(-0.12, 0.21);
		fw *= 0.72;
	}
	col *= 0.37;
	col *= 0.84 + 0.15 * sin(gl_FragCoord.y * 1.16 + (time * 0.65) * 7.72);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(0.943, 0.983, 1.030) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
