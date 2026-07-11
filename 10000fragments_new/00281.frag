uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.51;
	float g = dot(sin(q * 3.22), cos(q.zxy * 3.22));
	return (abs(g) - 0.62) / (3.22 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.73);
	vec3 rd = normalize(vec3(p, 1.53));
	rd.xy = rot2(time * -0.16) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 55; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.82;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.39 + time * 0.11, vec3(0.45, 0.59, 0.57), vec3(0.40, 0.44, 0.31), vec3(1.20, 0.85, 1.33), vec3(0.99, 0.75, 0.38)) * fog;
	col += vec3(0.22, 0.51, 0.62) * (it / 55.0) * 0.83;
	col = mod(col * 1.52, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
