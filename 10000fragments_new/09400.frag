uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.55;
	float g = dot(sin(q * 3.95), cos(q.zxy * 3.95));
	return (abs(g) - 0.74) / (3.95 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.20);
	vec3 rd = normalize(vec3(p, 1.34));
	rd.xy = rot2(time * -0.23) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 61; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.83;
		it += 1.0;
	}
	float fog = exp(-tt * 0.17);
	vec3 col = palette(tt * 0.19 + time * 0.25, vec3(0.59, 0.56, 0.59), vec3(0.44, 0.36, 0.34), vec3(0.74, 1.38, 0.80), vec3(0.53, 0.24, 0.87)) * fog;
	col += vec3(0.95, 0.46, 0.73) * (it / 61.0) * 0.83;
	col *= 0.84 + 0.12 * sin(gl_FragCoord.y * 2.31 + time * 4.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
