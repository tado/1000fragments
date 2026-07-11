uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.41;
	vec3 mq = mod(q, 1.67) - 0.83;
	return length(mq) - 0.36;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.83, 0.83, -3.0);
	vec3 rd = normalize(vec3(p, 1.11));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.67;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.35 + time * 0.18, vec3(0.47, 0.45, 0.43), vec3(0.31, 0.32, 0.36), vec3(1.10, 0.86, 0.84), vec3(0.31, 0.42, 0.84)) * fog;
	col += vec3(0.75, 0.26, 0.80) * (it / 67.0) * 0.76;
	col = clamp((col - 0.5) * 2.04 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
