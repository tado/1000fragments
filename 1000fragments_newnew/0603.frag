uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.55) * 1.05;
	vec2 g = mod(vec2(q.x, q.z), 2.02) - 1.01;
	float d = length(g) - (0.27 + 0.08 * sin(q.y * 3.29 + (time * 0.55) * 2.39));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.01, 1.01, -3.0);
	vec3 rd = normalize(vec3(p, 1.06));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.38 + (time * 0.55) * 0.14, vec3(0.25, 0.32, 0.25), vec3(0.19, 0.25, 0.18), vec3(0.46, 0.88, 0.89), vec3(0.35, 0.54, 0.84)) * fog;
	col += vec3(0.99, 0.69, 0.46) * (it / 71.0) * 0.57;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.035, 0.989, 0.917) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
