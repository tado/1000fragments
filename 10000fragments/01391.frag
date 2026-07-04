uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.53;
	vec3 mq = mod(q, 2.30) - 1.15;
	return length(mq) - 0.32;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.15, 1.15, -3.0);
	vec3 rd = normalize(vec3(p, 1.77));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = hue(tt * 0.19 + time * 0.07) * fog;
	col += vec3(0.45, 0.41, 0.45) * (it / 69.0) * 0.60;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
