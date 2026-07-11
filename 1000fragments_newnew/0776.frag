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
	p *= 1.19;
	vec2 vp = p * 2.71;
	vec2 vi = floor(vp); vec2 vf = fract(vp);
	float m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);
	for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
		vec2 nb = vec2(float(vx), float(vy));
		vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin((time * 0.67) * 1.35 + 6.2831853 * pt);
		float dl = length(nb + pt - vf);
		if(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }
	}
	float edge = smoothstep(0.0, 0.12, m2 - m1);
	vec3 col = palette(hash21(mid) * 0.89 + (time * 0.67) * 0.04, vec3(0.48, 0.51, 0.53), vec3(0.16, 0.15, 0.21), vec3(0.81, 0.58, 0.61), vec3(0.87, 0.91, 0.02)) * (0.77 + 0.27 * sin((time * 0.67) * 4.97 + hash21(mid + 5.0) * 6.2831853));
	col *= edge;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.42);
	col = clamp(col, 0.0, 1.0) * vec3(0.934, 0.984, 1.041) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
