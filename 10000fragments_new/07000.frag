uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.91;
	vec3 mq = mod(q, 2.40) - 1.20;
	mq.xy = rot2(time * -1.40) * mq.xy;
	vec3 b = abs(mq) - vec3(0.33);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.20, 1.20, -3.0);
	vec3 rd = normalize(vec3(p, 1.53));
	rd.xy = rot2(time * -0.30) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.28);
	vec3 col = palette(tt * 0.38 + time * 0.35, vec3(0.44, 0.57, 0.50), vec3(0.36, 0.33, 0.37), vec3(0.74, 1.30, 0.94), vec3(0.27, 0.33, 0.60)) * fog;
	col += vec3(0.46, 0.26, 0.39) * (it / 48.0) * 0.95;
	col = mod(col * 2.79, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
