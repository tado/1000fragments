uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.81;
	vec2 g = mod(vec2(q.x, q.z), 2.25) - 1.12;
	float d = length(g) - (0.30 + 0.11 * sin(q.y * 3.16 + time * 3.01));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.12, 1.12, -3.0);
	vec3 rd = normalize(vec3(p, 1.44));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.88;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.31 + time * 0.23, vec3(0.51, 0.41, 0.57), vec3(0.39, 0.33, 0.38), vec3(1.22, 0.86, 1.00), vec3(0.98, 0.24, 0.16)) * fog;
	col += vec3(0.72, 0.31, 0.87) * (it / 55.0) * 1.00;
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
