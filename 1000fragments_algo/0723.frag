uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    vec3 c = clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return mix(vec3(dot(c, vec3(0.333, 0.334, 0.333))), c, 0.50) * 0.85;
}

float map(vec3 q){
	q.z += (time * 0.81) * 0.84;
	vec3 mq = mod(q, 1.87) - 0.94;
	return length(mq) - 0.42;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.94, 0.94, -3.0);
	vec3 rd = normalize(vec3(p, 1.74));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = hue(tt * 0.27 + (time * 0.81) * 0.26) * fog;
	col += vec3(0.31, 0.77, 0.49) * (it / 69.0) * 0.32;
	col *= 0.80 + 0.12 * sin(gl_FragCoord.y * 2.55 + (time * 0.81) * 16.11);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.59);
	col = clamp(col, 0.0, 1.0) * vec3(0.942, 0.995, 1.054) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
