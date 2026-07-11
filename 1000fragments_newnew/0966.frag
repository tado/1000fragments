uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float map(vec3 q){
	q.z += (time * 0.77) * 1.53;
	vec2 g = mod(vec2(q.x, q.z), 2.50) - 1.25;
	float d = length(g) - (0.22 + 0.11 * sin(q.y * 2.83 + (time * 0.77) * 2.08));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.25, 1.25, -3.0);
	vec3 rd = normalize(vec3(p, 1.23));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.24);
	vec3 col = palette(tt * 0.34 + (time * 0.77) * 0.11, vec3(0.44, 0.44, 0.38), vec3(0.22, 0.27, 0.28), vec3(0.64, 0.90, 0.77), vec3(0.15, 0.97, 0.13)) * fog;
	col += vec3(0.80, 0.56, 0.36) * (it / 56.0) * 0.83;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.65));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.62);
	col = clamp(col, 0.0, 1.0) * vec3(1.018, 1.019, 1.013) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
