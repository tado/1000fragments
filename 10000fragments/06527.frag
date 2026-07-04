uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.10;
	vec3 mq = mod(q, 2.33) - 1.16;
	mq.xy = rot2(time * -0.92) * mq.xy;
	vec3 b = abs(mq) - vec3(0.29);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.16, 1.16, -3.0);
	vec3 rd = normalize(vec3(p, 1.14));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 66; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.85;
		it += 1.0;
	}
	float fog = exp(-tt * 0.29);
	vec3 col = hue(tt * 0.27 + time * 0.20) * fog;
	col += vec3(0.39, 0.22, 0.32) * (it / 66.0) * 0.51;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
