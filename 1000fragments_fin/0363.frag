uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.01;
	p.y += sin(p.x * 2.93 + (time * 0.75) * 1.06) * 0.19;
	p.x *= resolution.x / resolution.y;
	p *= 1.01;
	p = rot2((time * 0.75) * -1.13) * p;
	vec3 col = mix(vec3(0.026, 0.048, 0.052), vec3(0.031, 0.054, 0.047), clamp(0.5 + p.y * 0.15 + p.x * -0.21, 0.0, 1.0));
	for(int gi = 0; gi < 7; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.90 + 0.22 * vec2(sin((time * 0.75) * 0.81 + hc.x * 6.2831853), cos((time * 0.75) * 2.95 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.27);
		col += (0.5 + 0.5 * cos(vec3(2.226, 4.232, 6.239) + fi * 0.77 + (time * 0.75) * 0.75)) * (0.036 / (gd + 0.024));
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.32);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.16);
	col *= vec3(1.045, 0.986, 0.918);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
