uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.80;
	float g = dot(sin(q * 2.15), cos(q.zxy * 2.15));
	return (abs(g) - 0.52) / (2.15 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.12);
	vec3 rd = normalize(vec3(p, 1.40));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.26);
	vec3 col = palette(tt * 0.40 + time * 0.25, vec3(0.56, 0.54, 0.47), vec3(0.44, 0.38, 0.32), vec3(0.92, 1.01, 1.01), vec3(0.70, 0.23, 0.92)) * fog;
	col += vec3(0.87, 0.37, 0.33) * (it / 52.0) * 0.63;
	col = fract(col * 1.71);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
