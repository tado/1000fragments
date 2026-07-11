uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.00;
	float g = dot(sin(q * 2.51), cos(q.zxy * 2.51));
	return (abs(g) - 0.51) / (2.51 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.98);
	vec3 rd = normalize(vec3(p, 1.79));
	rd.xy = rot2(time * -0.17) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 57; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.76;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = palette(tt * 0.22 + time * 0.29, vec3(0.48, 0.58, 0.46), vec3(0.50, 0.41, 0.43), vec3(1.24, 1.28, 0.99), vec3(0.25, 0.01, 0.30)) * fog;
	col += vec3(0.45, 0.70, 0.70) * (it / 57.0) * 0.33;
	col = mod(col * 2.19, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
