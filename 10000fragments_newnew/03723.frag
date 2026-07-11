uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.22;
	float g = dot(sin(q * 3.66), cos(q.zxy * 3.66));
	return (abs(g) - 0.43) / (3.66 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.28);
	vec3 rd = normalize(vec3(p, 1.60));
	rd.xy = rot2(time * 0.06) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.65;
		it += 1.0;
	}
	float fog = exp(-tt * 0.16);
	vec3 col = palette(tt * 0.16 + time * 0.31, vec3(0.49, 0.43, 0.46), vec3(0.43, 0.49, 0.44), vec3(0.78, 1.31, 0.74), vec3(0.81, 0.93, 0.63)) * fog;
	col += vec3(0.94, 0.96, 0.48) * (it / 67.0) * 0.33;
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
