uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.78) * 0.67), cos((time * 0.78) * 1.06)) * 0.19;
	p = rot2((time * 0.78) * -1.39) * p;
	vec3 col = vec3(0.056, 0.029, 0.002);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.92 + 0.17 * vec2(sin((time * 0.78) * 2.53 + hc.x * 6.2831853), cos((time * 0.78) * 1.83 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.23, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.60, 3.20) + fi * 0.95 + (time * 0.78) * 1.01)) * (0.035 / (gd + 0.011));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.24);
	col = clamp(col, 0.0, 1.0) * vec3(1.027, 0.976, 1.016) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
