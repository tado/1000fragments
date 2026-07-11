uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.40;
	vec3 col = vec3(0.055, 0.048, 0.051);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.69 + 0.22 * vec2(sin((time * 0.51) * 2.51 + hc.x * 6.2831853), cos((time * 0.51) * 2.38 + hc.y * 6.2831853));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.46, 2.91) + fi * 1.01 + (time * 0.51) * 0.40)) * (0.011 / (gd + 0.043));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.28);
	col = clamp(col, 0.0, 1.0) * vec3(0.948, 0.982, 1.028) * 1.00 + 0.034;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
