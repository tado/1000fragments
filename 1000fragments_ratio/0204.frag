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
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p *= 1.22;
	p.x *= resolution.x / resolution.y;
	p *= 2.04;
	vec2 vp = p * 5.05;
	vec2 vi = floor(vp); vec2 vf = fract(vp);
	float m1 = 8.0; float m2 = 8.0; vec2 mid = vec2(0.0);
	for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
		vec2 nb = vec2(float(vx), float(vy));
		vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin((time * 0.54) * 0.51 + 6.2831853 * pt);
		float dl = length(nb + pt - vf);
		if(dl < m1){ m2 = m1; m1 = dl; mid = vi + nb; } else if(dl < m2){ m2 = dl; }
	}
	float edge = smoothstep(0.0, 0.05, m2 - m1);
	vec3 col = palette(hash21(mid) * 1.31 + (time * 0.54) * 0.09, vec3(0.36, 0.33, 0.38), vec3(0.15, 0.20, 0.23), vec3(0.40, 0.80, 0.73), vec3(0.78, 0.59, 0.85)) * (0.62 + 0.26 * sin((time * 0.54) * 2.32 + hash21(mid + 5.0) * 6.2831853));
	col *= edge;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.54)) * 100.0) - 0.5) * 0.09;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.941, 0.973, 1.055) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
