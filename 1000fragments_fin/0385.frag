uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.61) * 0.94), cos((time * 0.61) * 0.53)) * 0.22;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	p = rot2((time * 0.61) * -0.72) * p;
	vec3 col = mix(vec3(0.022, 0.042, 0.086), vec3(0.017, 0.052, 0.048), clamp(0.5 + p.y * 0.25 + p.x * -0.15, 0.0, 1.0));
	for(int gi = 0; gi < 6; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.38 + 0.18 * vec2(sin((time * 0.61) * 2.61 + hc.x * 6.2831853), cos((time * 0.61) * 1.37 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.09);
		col += (0.5 + 0.5 * cos(vec3(4.395, 5.165, 5.934) + fi * 0.70 + (time * 0.61) * 0.44)) * (0.036 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.45);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(0.986, 1.010, 0.990);
	col += 0.018;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.22 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
