uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float map(vec3 q){
	q.z += (time * 0.56) * 1.68;
	float g = dot(sin(q * 2.02), cos(q.zxy * 2.02));
	return (abs(g) - 0.76) / (2.02 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 2.74 + (time * 0.56) * 0.71) * 0.06;
	vec3 ro = vec3(0.0, 0.0, -3.43);
	vec3 rd = normalize(vec3(p, 1.37));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 58; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.31 + (time * 0.56) * 0.06, vec3(0.14, 0.33, 0.42), vec3(0.18, 0.23, 0.30), vec3(1.02, 1.04, 0.96), vec3(0.52, 0.44, 0.37)) * fog;
	col += vec3(0.87, 0.62, 0.85) * (it / 58.0) * 1.00;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.18);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.005, 0.995, 0.989);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
