uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.33;
	vec2 g = mod(vec2(q.x, q.z), 2.07) - 1.04;
	float d = length(g) - (0.17 + 0.11 * sin(q.y * 1.55 + time * 2.32));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.04, 1.04, -3.0);
	vec3 rd = normalize(vec3(p, 0.99));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.25 + time * 0.36, vec3(0.57, 0.42, 0.59), vec3(0.47, 0.33, 0.34), vec3(0.73, 1.21, 1.30), vec3(0.68, 0.05, 0.47)) * fog;
	col += vec3(0.35, 0.68, 0.44) * (it / 70.0) * 0.91;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
