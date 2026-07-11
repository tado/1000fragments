uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.79;
	vec3 mq = mod(q, 2.32) - 1.16;
	return length(mq) - 0.47;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.76));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = hue(tt * 0.23 + time * 0.05) * fog;
	col += vec3(0.87, 0.68, 0.55) * (it / 59.0) * 0.40;
	col *= 0.81 + 0.15 * sin(gl_FragCoord.y * 2.51 + time * 15.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
