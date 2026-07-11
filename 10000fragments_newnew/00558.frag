uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.62;
	vec3 mq = mod(q, 1.69) - 0.85;
	return length(mq) - 0.46;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.85, 0.85, -3.0);
	vec3 rd = normalize(vec3(p, 1.22));
	rd.xy = rot2(time * 0.40) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 72; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.87;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.12 + time * 0.01, vec3(0.47, 0.49, 0.50), vec3(0.38, 0.45, 0.34), vec3(1.25, 0.84, 1.22), vec3(0.34, 0.74, 0.06)) * fog;
	col += vec3(0.97, 0.87, 0.38) * (it / 72.0) * 0.30;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.46 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
