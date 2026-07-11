uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.57) * 0.65), cos((time * 0.57) * 0.39)) * 0.06;
	p *= 1.15;
	vec3 col = vec3(0.015, 0.007, 0.012);
	for(int gi = 0; gi < 4; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 2.29 + 0.32 * vec2(sin((time * 0.57) * 2.52 + hc.x * 6.2831853), cos((time * 0.57) * 2.52 + hc.y * 6.2831853));
		float gd = abs(length(p - q) - 0.18);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.99, 1.98) + fi * 1.41 + (time * 0.57) * 0.55)) * (0.026 / (gd + 0.037));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.984, 1.010, 0.952) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
