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
	p = p.yx;
	p.x *= resolution.x / resolution.y;
	p *= 1.39;
	vec2 vp = p * 2.98;
	vec2 vi = floor(vp); vec2 vf = fract(vp);
	float m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);
	for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
		vec2 nb = vec2(float(vx), float(vy));
		vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin((time * 0.62) * 0.99 + 6.2831853 * pt);
		float dl = length(nb + pt - vf);
		if(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }
	}
	float edge = smoothstep(0.0, 0.05, m2 - m1);
	vec3 col = palette(hash21(mid) * 1.33 + (time * 0.62) * 0.23, vec3(0.44, 0.42, 0.35), vec3(0.29, 0.26, 0.23), vec3(1.00, 1.03, 0.75), vec3(0.03, 0.27, 0.44)) * (0.68 + 0.32 * sin((time * 0.62) * 4.01 + hash21(mid + 5.0) * 6.2831853));
	col *= edge;
	col = clamp((col - 0.5) * 2.15 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.49);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.15);
	col *= vec3(0.923, 0.974, 1.038);
	col += 0.014;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.30 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
