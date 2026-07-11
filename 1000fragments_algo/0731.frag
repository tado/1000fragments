uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.51) * 1.02;
	float g = dot(sin(q * 3.94), cos(q.zxy * 3.94));
	return (abs(g) - 0.50) / (3.94 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.12 + (time * 0.51) * 0.82) * 0.18;
	vec3 ro = vec3(0.0, 0.0, -3.45);
	vec3 rd = normalize(vec3(p, 1.10));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.20 + (time * 0.51) * 0.12, vec3(0.54, 0.43, 0.44), vec3(0.29, 0.26, 0.30), vec3(0.50, 0.67, 0.51), vec3(0.80, 0.78, 0.98)) * fog;
	col += vec3(0.87, 0.26, 0.99) * (it / 63.0) * 0.43;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.57);
	col = clamp(col, 0.0, 1.0) * vec3(0.991, 0.979, 1.005) * 1.00 + 0.049;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
