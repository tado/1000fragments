uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.01;
	vec3 col = vec3(0.004, 0.016, 0.004);
	for(int gi = 0; gi < 5; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.30 + 0.25 * vec2(sin((time * 0.65) * 2.47 + hc.x * 6.2831853), cos((time * 0.65) * 0.85 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.30);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.58, 1.17) + fi * 1.21 + (time * 0.65) * 0.50)) * (0.017 / (gd + 0.023));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.55);
	col = clamp(col, 0.0, 1.0) * vec3(1.024, 0.988, 0.932) * 1.00 + 0.044;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
