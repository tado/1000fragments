uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(sin((time * 0.59) * 0.57), cos((time * 0.59) * 0.33)) * 0.15;
	vec2 vp = p * 2.58;
	vec2 vi = floor(vp); vec2 vf = fract(vp);
	float m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);
	for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
		vec2 nb = vec2(float(vx), float(vy));
		vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin((time * 0.59) * 1.69 + 6.2831853 * pt);
		float dl = length(nb + pt - vf);
		if(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }
	}
	float edge = smoothstep(0.0, 0.12, m2 - m1);
	vec3 col = palette(hash21(mid) * 1.70 + (time * 0.59) * 0.03, vec3(0.25, 0.34, 0.26), vec3(0.16, 0.17, 0.18), vec3(0.76, 0.57, 0.80), vec3(0.87, 0.03, 0.85)) * (0.60 + 0.30 * sin((time * 0.59) * 2.99 + hash21(mid + 5.0) * 6.2831853));
	col *= edge;
	col *= 0.86 + 0.19 * sin(gl_FragCoord.y * 1.86 + (time * 0.59) * 17.22);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(1.045, 1.002, 0.947) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
