uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.54;
	vec3 mq = mod(q, 2.23) - 1.11;
	mq.xy = rot2(time * -0.73) * mq.xy;
	vec3 b = abs(mq) - vec3(0.42);
	return length(max(b, vec3(0.0))) + min(max(b.x, max(b.y, b.z)), 0.0);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.11, 1.11, -3.0);
	vec3 rd = normalize(vec3(p, 1.12));
	rd.xy = rot2(time * -0.09) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.60;
		it += 1.0;
	}
	float fog = exp(-tt * 0.42);
	vec3 col = palette(tt * 0.24 + time * 0.32, vec3(0.58, 0.43, 0.57), vec3(0.41, 0.39, 0.39), vec3(0.77, 1.24, 1.29), vec3(0.47, 0.47, 0.38)) * fog;
	col += vec3(0.77, 0.45, 0.24) * (it / 67.0) * 0.90;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
