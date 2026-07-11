uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.38;
	float g = dot(sin(q * 1.69), cos(q.zxy * 1.69));
	return (abs(g) - 0.53) / (1.69 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.73);
	vec3 rd = normalize(vec3(p, 1.53));
	rd.xy = rot2(time * 0.40) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 59; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.27);
	vec3 col = palette(tt * 0.32 + time * 0.15, vec3(0.48, 0.42, 0.42), vec3(0.30, 0.37, 0.43), vec3(0.92, 1.30, 0.93), vec3(0.52, 0.88, 0.40)) * fog;
	col += vec3(0.65, 0.99, 0.30) * (it / 59.0) * 0.95;
	col = mod(col * 2.85, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
