uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.14;
	vec3 col = vec3(0.041, 0.007, 0.076);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.95 + 0.25 * vec2(sin((time * 0.75) * 2.42 + hc.x * 6.2831853), cos((time * 0.75) * 1.58 + hc.y * 6.2831853));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.83, 1.66) + fi * 0.94 + (time * 0.75) * 0.59)) * (0.015 / (gd + 0.036));
	}
	col = col / (1.0 + col);
	col *= 0.90 + 0.20 * sin(gl_FragCoord.y * 2.30 + (time * 0.75) * 10.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.50);
	col = clamp(col, 0.0, 1.0) * vec3(1.007, 1.019, 1.020) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
