uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.99;
	float g = dot(sin(q * 2.83), cos(q.zxy * 2.83));
	return (abs(g) - 0.71) / (2.83 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.46);
	vec3 rd = normalize(vec3(p, 1.20));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.41);
	vec3 col = palette(tt * 0.17 + time * 0.02, vec3(0.58, 0.52, 0.50), vec3(0.47, 0.49, 0.31), vec3(1.29, 0.83, 0.86), vec3(0.79, 0.91, 0.79)) * fog;
	col += vec3(0.35, 0.26, 0.34) * (it / 66.0) * 0.57;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.05;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
