uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.93;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 4.85;
		float pv = sin(gq.x + time * 1.68) * sin(gq.y - time * 1.79);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.14 + float(zi) * 1.48 + time * 0.10));
		q = rot2(0.31) * q * 1.31 + vec2(0.27, -0.27);
		fw *= 0.59;
	}
	col *= 0.34;
	col = mod(col * 2.42, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
