uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 0.71;
	vec3 mq = mod(q, 2.63) - 1.31;
	mq.xy = rot2(time * 1.69) * mq.xy;
	vec3 b = abs(mq) - vec3(0.38);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.31, 1.31, -3.0);
	vec3 rd = normalize(vec3(p, 1.62));
	rd.xy = rot2(time * -0.25) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.69;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = hue(tt * 0.25 + time * 0.07) * fog;
	col += vec3(0.95, 0.51, 0.85) * (it / 54.0) * 0.84;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
