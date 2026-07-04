uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.53;
	float g = dot(sin(q * 3.35), cos(q.zxy * 3.35));
	return (abs(g) - 0.69) / (3.35 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.40);
	vec3 rd = normalize(vec3(p, 1.25));
	rd.xy = rot2(time * -0.06) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.61;
		it += 1.0;
	}
	float fog = exp(-tt * 0.18);
	vec3 col = palette(tt * 0.11 + time * 0.21, vec3(0.50, 0.45, 0.51), vec3(0.33, 0.48, 0.48), vec3(1.17, 0.92, 1.08), vec3(0.90, 0.69, 0.98)) * fog;
	col += vec3(0.86, 0.80, 0.23) * (it / 71.0) * 0.89;
	col *= 0.82 + 0.19 * sin(gl_FragCoord.y * 2.58 + time * 7.50);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
