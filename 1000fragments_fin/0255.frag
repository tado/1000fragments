uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}


void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.y = abs(p.y) - 0.34;
	p.x = abs(p.x) - 0.28;
	p.x *= resolution.x / resolution.y;
	vec2 vp = p * 3.69;
	vec2 vi = floor(vp); vec2 vf = fract(vp);
	float m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);
	for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
		vec2 nb = vec2(float(vx), float(vy));
		vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin((time * 0.84) * 2.03 + 6.2831853 * pt);
		float dl = length(nb + pt - vf);
		if(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }
	}
	float edge = smoothstep(0.0, 0.15, m2 - m1);
	vec3 col = palette(hash21(mid) * 0.64 + (time * 0.84) * 0.30, vec3(0.48, 0.51, 0.48), vec3(0.52, 0.51, 0.52), vec3(0.97, 1.03, 1.04), vec3(0.02, 0.32, 0.65)) * (0.63 + 0.35 * sin((time * 0.84) * 3.12 + hash21(mid + 5.0) * 6.2831853));
	col *= edge;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.42);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.04);
	col *= vec3(0.972, 1.023, 0.957);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
