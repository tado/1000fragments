uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.013, 0.012, 0.043);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.64 + 0.16 * vec2(sin((time * 0.58) * 2.99 + hc.x * 6.2831853), cos((time * 0.58) * 0.94 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.15);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.61, 1.22) + fi * 0.66 + (time * 0.58) * 1.36)) * (0.029 / (gd + 0.049));
	}
	col = col / (1.0 + col);
	col *= 0.83 + 0.14 * sin(gl_FragCoord.y * 1.55 + (time * 0.58) * 7.64);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.51);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 1.005, 0.915) * 1.00 + 0.031;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
