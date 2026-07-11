uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.59;
	float g = dot(sin(q * 1.69), cos(q.zxy * 1.69));
	return (abs(g) - 0.59) / (1.69 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.20);
	vec3 rd = normalize(vec3(p, 0.91));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.68;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.28 + time * 0.39, vec3(0.59, 0.46, 0.54), vec3(0.31, 0.49, 0.36), vec3(1.36, 1.34, 0.83), vec3(0.57, 0.74, 0.15)) * fog;
	col += vec3(0.87, 0.62, 0.58) * (it / 55.0) * 0.57;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
