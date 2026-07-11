uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.93;
	vec3 mq = mod(q, 2.03) - 1.01;
	return length(mq) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.01, 1.01, -3.0);
	vec3 rd = normalize(vec3(p, 1.63));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.10 + time * 0.38, vec3(0.58, 0.56, 0.54), vec3(0.41, 0.31, 0.41), vec3(1.38, 0.74, 1.07), vec3(0.25, 0.41, 0.69)) * fog;
	col += vec3(0.20, 0.97, 0.81) * (it / 51.0) * 0.38;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
