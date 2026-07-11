uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = p.yx;
	p = rot2((time * 0.70) * -1.23) * p;
	vec3 col = vec3(0.006, 0.044, 0.066);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.90 + 0.35 * vec2(sin((time * 0.70) * 1.89 + hc.x * 6.2831853), cos((time * 0.70) * 1.99 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.18, 0.08);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.70, 3.39) + fi * 1.45 + (time * 0.70) * 1.14)) * (0.016 / (gd + 0.015));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.31);
	col = clamp(col, 0.0, 1.0) * vec3(1.034, 0.998, 0.912) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
