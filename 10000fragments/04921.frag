uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.01;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 8; zi++){
		vec2 gq = q * 8.15;
		float pv = sin(gq.x + time * 2.98) * sin(gq.y - time * 1.35);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.38 + float(zi) * 1.12 + time * 0.41));
		q = rot2(0.72) * q * 0.65 + vec2(0.16, 0.01);
		fw *= 0.68;
	}
	col *= 0.37;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
