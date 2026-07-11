uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.80) * 0.95;
}

float map(vec3 q){
	q.z += (time * 0.59) * 1.67;
	vec3 mq = mod(q, 1.71) - 0.86;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	vec3 ro = vec3(0.86, 0.86, -3.0);
	vec3 rd = normalize(vec3(p, 1.45));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.63;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = hue(tt * 0.14 + (time * 0.59) * 0.05) * fog;
	col += vec3(0.95, 0.63, 0.30) * (it / 66.0) * 0.89;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.038, 1.003, 0.925) * 1.00 + 0.013;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
