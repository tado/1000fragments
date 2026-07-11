uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec3 col = vec3(0.029, 0.023, 0.039);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.13 + 0.33 * vec2(sin((time * 0.64) * 2.79 + hc.x * 6.2831853), cos((time * 0.64) * 2.25 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.16);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.78, 1.56) + fi * 1.96 + (time * 0.64) * 0.63)) * (0.014 / (gd + 0.019));
	}
	col = col / (1.0 + col);
	col *= 0.88 + 0.16 * sin(gl_FragCoord.y * 1.20 + (time * 0.64) * 6.03);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(1.057, 0.985, 0.910) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
