uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.67;
	vec3 mq = mod(q, 2.13) - 1.06;
	return length(mq) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.06, 1.06, -3.0);
	vec3 rd = normalize(vec3(p, 1.24));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.30);
	vec3 col = palette(tt * 0.25 + time * 0.19, vec3(0.47, 0.58, 0.54), vec3(0.35, 0.43, 0.42), vec3(1.25, 1.08, 1.35), vec3(0.54, 0.63, 0.08)) * fog;
	col += vec3(0.96, 0.26, 0.30) * (it / 48.0) * 0.73;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.09;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
