uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.37;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 7; zi++){
		vec2 gq = q * 4.50;
		float pv = sin(gq.x + time * 1.81) * sin(gq.y - time * 2.12);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.54 + float(zi) * 1.21 + time * 0.77));
		q = rot2(1.18) * q * 1.20 + vec2(-0.11, -0.15);
		fw *= 0.70;
	}
	col *= 0.34;
	col *= 0.84 + 0.20 * sin(gl_FragCoord.y * 1.21 + time * 15.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
