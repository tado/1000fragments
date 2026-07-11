uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.25;
	p = rot2((time * 0.67) * 0.40) * p;
	vec3 col = vec3(0.057, 0.049, 0.062);
	for(int gi = 0; gi < 11; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.03 + 0.20 * vec2(sin((time * 0.67) * 1.64 + hc.x * 6.2831853), cos((time * 0.67) * 0.80 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.17);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.57, 1.14) + fi * 0.44 + (time * 0.67) * 0.84)) * (0.028 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.35);
	col = clamp(col, 0.0, 1.0) * vec3(0.914, 0.966, 1.057) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
