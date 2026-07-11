uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 5.28;
		float pv = sin(gq.x + (time * 0.77) * 2.30) * sin(gq.y - (time * 0.77) * 1.90);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 0.82, 1.63) + pv * 3.63 + float(zi) * 0.34 + (time * 0.77) * 0.28));
		q = rot2(1.18) * q * 0.66 + vec2(0.18, 0.01);
		fw *= 0.58;
	}
	col *= 0.34;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(0.942, 0.965, 1.047) * 1.00 + 0.021;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
