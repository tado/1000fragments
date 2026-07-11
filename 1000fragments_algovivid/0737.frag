uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float map(vec3 q){
	q.z += (time * 0.72) * 0.88;
	float g = dot(sin(q * 2.12), cos(q.zxy * 2.12));
	return (abs(g) - 0.30) / (2.12 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x += p.y * 0.63;
	p.y += sin(p.x * 2.90 + (time * 0.72) * 0.94) * 0.15;
	vec3 ro = vec3(0.0, 0.0, -3.40);
	vec3 rd = normalize(vec3(p, 1.35));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.10 + (time * 0.72) * 0.16, vec3(0.41, 0.36, 0.34), vec3(0.17, 0.13, 0.20), vec3(0.45, 0.70, 0.85), vec3(0.23, 0.66, 0.36)) * fog;
	col += vec3(0.36, 0.81, 0.99) * (it / 48.0) * 0.53;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.18);
	col = clamp(col, 0.0, 1.0) * vec3(0.950, 0.964, 1.032) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
