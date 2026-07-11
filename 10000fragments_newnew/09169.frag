uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.98;
	float g = dot(sin(q * 1.76), cos(q.zxy * 1.76));
	return (abs(g) - 0.29) / (1.76 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.44);
	vec3 rd = normalize(vec3(p, 0.93));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.11 + time * 0.33, vec3(0.54, 0.45, 0.59), vec3(0.49, 0.33, 0.45), vec3(0.76, 1.10, 1.17), vec3(0.79, 0.21, 0.65)) * fog;
	col += vec3(0.70, 0.50, 0.49) * (it / 63.0) * 0.99;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
