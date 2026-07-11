uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.xz = rot2(time * 0.87) * q.xz;
	q.xy = rot2(time * 1.07) * q.xy;
	vec2 w = vec2(length(q.xz) - 0.89, q.y);
	return length(w) - 0.44;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.80);
	vec3 rd = normalize(vec3(p, 1.10));
	rd.xy = rot2(time * -0.11) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.19 + time * 0.11, vec3(0.49, 0.57, 0.43), vec3(0.33, 0.40, 0.47), vec3(0.73, 1.08, 0.98), vec3(0.39, 0.65, 0.18)) * fog;
	col += vec3(0.28, 0.21, 0.40) * (it / 67.0) * 0.96;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.59));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
