uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.11;
	vec3 col = vec3(0.0);
	float fw = 1.0;
	vec2 q = p;
	for(int zi = 0; zi < 6; zi++){
		float pv = sin(atan(q.y, q.x) * 3.0 + length(q) * 7.09 - time * 4.51);
		col += fw * (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + pv * 4.00 + float(zi) * 1.37 + time * 0.25));
		q = rot2(0.97) * q * 0.81 + vec2(-0.01, -0.27);
		fw *= 0.60;
	}
	col *= 0.32;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
