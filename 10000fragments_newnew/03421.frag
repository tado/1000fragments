uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.88;
	vec3 mq = mod(q, 2.07) - 1.04;
	return length(mq) - 0.30;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.04, 1.04, -3.0);
	vec3 rd = normalize(vec3(p, 1.48));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 60; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = palette(tt * 0.16 + time * 0.09, vec3(0.53, 0.54, 0.54), vec3(0.30, 0.43, 0.43), vec3(1.38, 1.16, 0.96), vec3(0.37, 0.94, 0.24)) * fog;
	col += vec3(0.92, 0.96, 0.47) * (it / 60.0) * 0.58;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
