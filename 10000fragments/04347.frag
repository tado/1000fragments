uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.28;
	float g = dot(sin(q * 3.76), cos(q.zxy * 3.76));
	return (abs(g) - 0.62) / (3.76 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.61);
	vec3 rd = normalize(vec3(p, 1.43));
	rd.xy = rot2(time * -0.07) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 56; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.38);
	vec3 col = palette(tt * 0.14 + time * 0.14, vec3(0.45, 0.58, 0.52), vec3(0.31, 0.45, 0.39), vec3(0.76, 0.98, 1.00), vec3(0.38, 0.87, 0.35)) * fog;
	col += vec3(0.69, 0.92, 0.67) * (it / 56.0) * 0.57;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.70 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
