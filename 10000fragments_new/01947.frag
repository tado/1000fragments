uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 2.21;
	vec3 mq = mod(q, 2.27) - 1.14;
	return length(mq) - 0.36;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.14, 1.14, -3.0);
	vec3 rd = normalize(vec3(p, 1.18));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.90;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = hue(tt * 0.29 + time * 0.27) * fog;
	col += vec3(0.29, 0.98, 0.99) * (it / 57.0) * 0.54;
	col *= 0.89 + 0.14 * sin(gl_FragCoord.y * 2.31 + time * 9.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
