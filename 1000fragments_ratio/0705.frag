uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float map(vec3 q){
	q.z += (time * 0.52) * 2.07;
	vec2 g = mod(vec2(q.x, q.z), 2.22) - 1.11;
	float d = length(g) - (0.26 + 0.09 * sin(q.y * 3.20 + (time * 0.52) * 1.34));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.11, 1.11, -3.0);
	vec3 rd = normalize(vec3(p, 1.62));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.21 + (time * 0.52) * 0.16, vec3(0.46, 0.38, 0.41), vec3(0.31, 0.25, 0.27), vec3(0.70, 0.75, 0.69), vec3(0.38, 0.51, 0.82)) * fog;
	col += vec3(0.36, 0.34, 0.25) * (it / 67.0) * 0.39;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.21);
	col = clamp(col, 0.0, 1.0) * vec3(0.927, 1.000, 1.033) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
