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
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 13.58 - time * 2.60);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 2.39 + float(zi) * 0.44 + time * 0.19));
		q = rot2(0.39) * q * 0.76 + vec2(-0.20, -0.24);
		fw *= 0.59;
	}
	col *= 0.33;
	col = mod(col * 1.88, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
