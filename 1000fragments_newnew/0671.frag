uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.78;
	vec3 col = vec3(0.017, 0.012, 0.048);
	for(int gi = 0; gi < 8; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.21 + 0.11 * vec2(sin((time * 0.57) * 2.86 + hc.x * 6.2831853), cos((time * 0.57) * 1.22 + hc.y * 6.2831853));
		vec2 bq = abs(p - q) - vec2(0.16, 0.10);
		float gd = abs(length(max(bq, vec2(0.0))) + min(max(bq.x, bq.y), 0.0));
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.54, 1.07) + fi * 1.80 + (time * 0.57) * 0.45)) * (0.036 / (gd + 0.034));
	}
	col = col / (1.0 + col);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.57)) * 100.0) - 0.5) * 0.07;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 1.012, 0.997) * 1.00 + 0.037;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
