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
	p *= 1.96;
	p = rot2((time * 0.60) * 0.47) * p;
	vec3 col = vec3(0.046, 0.023, 0.066);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.64 + 0.34 * vec2(sin((time * 0.60) * 2.13 + hc.x * 6.2831853), cos((time * 0.60) * 1.69 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.15, 0.21);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.03, 2.06) + fi * 1.33 + (time * 0.60) * 1.31)) * (0.018 / (gd + 0.026));
	}
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.42 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(0.914, 0.998, 1.054) * 1.00 + 0.043;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
