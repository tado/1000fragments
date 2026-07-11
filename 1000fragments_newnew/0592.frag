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
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 3.02;
		float pv = sin(gq.x + (time * 0.78) * 1.19) * sin(gq.y - (time * 0.78) * 1.74);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.93, 1.86) + pv * 3.34 + float(zi) * 0.46 + (time * 0.78) * 0.71));
		q = rot2(0.58) * q * 0.71 + vec2(-0.09, -0.03);
		fw *= 0.62;
	}
	col *= 0.32;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.989, 0.983, 0.993) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
