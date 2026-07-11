uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2((time * 0.56) * -0.32) * p;
	vec3 col = vec3(0.033, 0.040, 0.012);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.64 + 0.24 * vec2(sin((time * 0.56) * 1.83 + hc.x * 6.2831853), cos((time * 0.56) * 1.35 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.30);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.70, 1.39) + fi * 1.77 + (time * 0.56) * 0.58)) * (0.025 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(0.918, 0.987, 1.042) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
