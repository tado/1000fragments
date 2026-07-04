uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.55;
	vec3 mq = mod(q, 1.78) - 0.89;
	return length(mq) - 0.27;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.89, 0.89, -3.0);
	vec3 rd = normalize(vec3(p, 1.08));
	rd.xy = rot2(time * 0.21) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 51; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.24 + time * 0.15, vec3(0.56, 0.60, 0.48), vec3(0.45, 0.38, 0.37), vec3(1.31, 0.91, 1.38), vec3(0.97, 0.56, 0.11)) * fog;
	col += vec3(0.75, 0.27, 0.44) * (it / 51.0) * 0.37;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
