uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2((time * 0.82) * -0.90) * p;
	vec3 col = mix(vec3(0.013, 0.021, 0.056), vec3(0.020, 0.036, 0.061), clamp(0.5 + p.y * -0.09 + p.x * -0.21, 0.0, 1.0));
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.65 + 0.32 * vec2(sin((time * 0.82) * 2.40 + hc.x * 6.2831853), cos((time * 0.82) * 1.69 + hc.y * 6.2831853));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(5.154, 7.065, 8.976) + fi * 0.56 + (time * 0.82) * 0.91)) * (0.015 / (gd + 0.046));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.41);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.13);
	col *= vec3(0.986, 1.004, 0.955);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.56 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
