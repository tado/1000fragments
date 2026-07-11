uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.66;
	float g = dot(sin(q * 3.09), cos(q.zxy * 3.09));
	return (abs(g) - 0.44) / (3.09 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.52);
	vec3 rd = normalize(vec3(p, 1.66));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.13 + time * 0.28, vec3(0.56, 0.56, 0.51), vec3(0.43, 0.44, 0.47), vec3(1.02, 1.24, 1.01), vec3(0.09, 0.89, 0.74)) * fog;
	col += vec3(0.39, 0.33, 0.31) * (it / 72.0) * 0.70;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.07;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
