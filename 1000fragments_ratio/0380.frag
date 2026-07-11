uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y = abs(p.y) - 0.20;
	p *= 2.28;
	vec3 col = vec3(0.030, 0.054, 0.046);
	for(int gi = 0; gi < 12; gi++){
		float fi = float(gi);
		vec2 hc = hash22(vec2(fi * 1.3, fi * 7.7));
		vec2 q = (hc - 0.5) * 1.34 + 0.11 * vec2(sin((time * 0.53) * 2.27 + hc.x * 6.2831853), cos((time * 0.53) * 2.17 + hc.y * 6.2831853));
		float gd = length(p - q);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.62, 3.23) + fi * 0.45 + (time * 0.53) * 1.21)) * (0.014 / (gd + 0.035));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.19 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col = clamp(col, 0.0, 1.0) * vec3(0.919, 0.984, 1.048) * 1.00 + 0.016;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
