uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.82;
	float g = dot(sin(q * 2.02), cos(q.zxy * 2.02));
	return (abs(g) - 0.22) / (2.02 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.05);
	vec3 rd = normalize(vec3(p, 1.14));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.86;
		it += 1.0;
	}
	float fog = exp(-tt * 0.36);
	vec3 col = palette(tt * 0.25 + time * 0.15, vec3(0.44, 0.44, 0.45), vec3(0.31, 0.36, 0.32), vec3(1.12, 0.86, 1.09), vec3(0.14, 0.95, 0.62)) * fog;
	col += vec3(0.48, 0.41, 0.67) * (it / 67.0) * 0.95;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
