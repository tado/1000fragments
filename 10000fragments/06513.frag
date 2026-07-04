uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.63;
	vec3 mq = mod(q, 2.04) - 1.02;
	return length(mq) - 0.25;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.02, 1.02, -3.0);
	vec3 rd = normalize(vec3(p, 1.77));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.17 + time * 0.32, vec3(0.50, 0.53, 0.53), vec3(0.47, 0.47, 0.48), vec3(1.26, 1.23, 0.74), vec3(0.02, 0.95, 0.13)) * fog;
	col += vec3(0.22, 0.84, 0.86) * (it / 51.0) * 0.63;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
