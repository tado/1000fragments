uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.88;
	vec3 mq = mod(q, 2.06) - 1.03;
	return length(mq) - 0.36;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.03, 1.03, -3.0);
	vec3 rd = normalize(vec3(p, 1.58));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.84;
		it += 1.0;
	}
	float fog = exp(-tt * 0.40);
	vec3 col = hue(tt * 0.12 + time * 0.20) * fog;
	col += vec3(0.70, 0.35, 0.99) * (it / 72.0) * 0.72;
	col = fract(col * 1.79);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
