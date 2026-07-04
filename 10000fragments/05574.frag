uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.86;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		vec2 gq = q * 9.44;
		float pv = sin(gq.x + time * 1.41) * sin(gq.y - time * 2.07);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 3.24 + float(zi) * 0.74 + time * 0.57));
		q = rot2(1.01) * q * 0.66 + vec2(0.24, 0.07);
		fw *= 0.74;
	}
	col *= 0.41;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
