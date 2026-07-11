uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float map(vec3 q){
	q.z += (time * 0.85) * 1.31;
	float g = dot(sin(q * 3.43), cos(q.zxy * 3.43));
	return (abs(g) - 0.25) / (3.43 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	vec3 ro = vec3(0.0, 0.0, -2.60);
	vec3 rd = normalize(vec3(p, 1.10));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 64; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.22 + (time * 0.85) * 0.06, vec3(0.42, 0.45, 0.37), vec3(0.28, 0.27, 0.24), vec3(0.86, 0.74, 0.63), vec3(0.40, 0.29, 0.96)) * fog;
	col += vec3(0.82, 0.52, 0.33) * (it / 64.0) * 0.95;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.82 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col = clamp(col, 0.0, 1.0) * vec3(1.034, 0.973, 0.929) * 1.00 + 0.012;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
