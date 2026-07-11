uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 2.42;
	vec3 mq = mod(q, 1.71) - 0.85;
	return length(mq) - 0.45;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.85, 0.85, -3.0);
	vec3 rd = normalize(vec3(p, 1.58));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 65; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = hue(tt * 0.13 + time * 0.03) * fog;
	col += vec3(0.68, 0.88, 0.89) * (it / 65.0) * 0.36;
	col *= 0.85 + 0.14 * sin(gl_FragCoord.y * 1.18 + time * 12.63);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
