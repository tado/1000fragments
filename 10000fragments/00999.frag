uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.85;
	vec3 mq = mod(q, 2.29) - 1.14;
	return length(mq) - 0.29;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.14, 1.14, -3.0);
	vec3 rd = normalize(vec3(p, 1.15));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = hue(tt * 0.24 + time * 0.20) * fog;
	col += vec3(0.20, 1.00, 0.86) * (it / 66.0) * 0.51;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
