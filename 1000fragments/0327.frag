uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.41;
	vec3 mq = mod(q, 2.37) - 1.18;
	mq.xy = rot2(time * -1.48) * mq.xy;
	vec3 b = abs(mq) - vec3(0.32);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.18, 1.18, -3.0);
	vec3 rd = normalize(vec3(p, 1.75));
	rd.xy = rot2(time * 0.15) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 54; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.77;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.34 + time * 0.34, vec3(0.60, 0.50, 0.45), vec3(0.41, 0.48, 0.37), vec3(1.23, 0.71, 0.91), vec3(0.97, 0.60, 0.11)) * fog;
	col += vec3(0.53, 0.85, 0.85) * (it / 54.0) * 0.66;
	col = mod(col * 2.83, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
