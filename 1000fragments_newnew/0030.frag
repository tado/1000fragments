uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.80) * 1.56;
	vec2 g = mod(vec2(q.x, q.z), 2.22) - 1.11;
	float d = length(g) - (0.25 + 0.13 * sin(q.y * 1.50 + (time * 0.80) * 3.89));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.11, 1.11, -3.0);
	vec3 rd = normalize(vec3(p, 1.70));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.21 + (time * 0.80) * 0.19, vec3(0.52, 0.53, 0.48), vec3(0.15, 0.12, 0.17), vec3(0.61, 0.48, 0.68), vec3(0.51, 0.84, 0.48)) * fog;
	col += vec3(0.92, 1.00, 0.75) * (it / 69.0) * 0.57;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.49 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.56);
	col = clamp(col, 0.0, 1.0) * vec3(1.020, 0.966, 0.990) * 1.00 + 0.038;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
