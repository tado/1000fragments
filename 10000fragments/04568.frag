uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.83;
	float g = dot(sin(q * 2.58), cos(q.zxy * 2.58));
	return (abs(g) - 0.63) / (2.58 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.45);
	vec3 rd = normalize(vec3(p, 1.64));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 69; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.39);
	vec3 col = palette(tt * 0.17 + time * 0.02, vec3(0.49, 0.41, 0.42), vec3(0.32, 0.36, 0.32), vec3(0.87, 1.11, 0.90), vec3(0.35, 0.70, 0.53)) * fog;
	col += vec3(0.57, 0.50, 0.30) * (it / 69.0) * 0.33;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.58 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
