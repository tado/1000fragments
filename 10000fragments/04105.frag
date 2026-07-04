uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 2.04;
	vec3 mq = mod(q, 2.35) - 1.18;
	mq.xy = rot2(time * -1.16) * mq.xy;
	vec3 b = abs(mq) - vec3(0.28);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.18, 1.18, -3.0);
	vec3 rd = normalize(vec3(p, 0.93));
	rd.xy = rot2(time * -0.27) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = hue(tt * 0.18 + time * 0.06) * fog;
	col += vec3(0.28, 0.95, 0.84) * (it / 63.0) * 0.96;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
