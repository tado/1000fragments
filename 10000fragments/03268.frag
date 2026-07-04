uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 2.17;
	vec2 g = mod(vec2(q.x, q.z), 2.11) - 1.06;
	float d = length(g) - (0.20 + 0.07 * sin(q.y * 2.52 + time * 3.99));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.06, 1.06, -3.0);
	vec3 rd = normalize(vec3(p, 1.07));
	rd.xy = rot2(time * 0.19) * rd.xy;
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.33);
	vec3 col = palette(tt * 0.26 + time * 0.37, vec3(0.44, 0.46, 0.47), vec3(0.34, 0.35, 0.48), vec3(1.00, 1.14, 1.25), vec3(0.29, 0.40, 0.97)) * fog;
	col += vec3(0.26, 0.33, 0.49) * (it / 67.0) * 0.32;
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.11;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
