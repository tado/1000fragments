uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.29;
	vec3 mq = mod(q, 1.66) - 0.83;
	return length(mq) - 0.37;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.83, 0.83, -3.0);
	vec3 rd = normalize(vec3(p, 1.72));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.74;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = hue(tt * 0.15 + time * 0.26) * fog;
	col += vec3(0.96, 0.81, 0.53) * (it / 61.0) * 0.37;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
