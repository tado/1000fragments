uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y) - 0.36;
	p.y += sin(p.x * 2.24 + (time * 0.73) * 0.47) * 0.11;
	vec2 vp = p * 4.54;
	vec2 vi = floor(vp); vec2 vf = fract(vp);
	float m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);
	for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
		vec2 nb = vec2(float(vx), float(vy));
		vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin((time * 0.73) * 2.00 + 6.2831853 * pt);
		float dl = length(nb + pt - vf);
		if(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }
	}
	float edge = smoothstep(0.0, 0.14, m2 - m1);
	vec3 col = palette(hash21(mid) * 1.98 + (time * 0.73) * 0.26, vec3(0.43, 0.39, 0.35), vec3(0.12, 0.18, 0.15), vec3(0.52, 0.71, 0.89), vec3(0.70, 0.62, 0.96)) * (0.77 + 0.31 * sin((time * 0.73) * 2.63 + hash21(mid + 5.0) * 6.2831853));
	col *= edge;
	col *= 0.81 + 0.10 * sin(gl_FragCoord.y * 2.28 + (time * 0.73) * 7.57);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(1.026, 1.001, 0.915) * 1.00 + 0.011;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
