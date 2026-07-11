uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.65;
	float g = dot(sin(q * 2.44), cos(q.zxy * 2.44));
	return (abs(g) - 0.26) / (2.44 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.07);
	vec3 rd = normalize(vec3(p, 1.51));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 52; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.78;
		it += 1.0;
	}
	float fog = exp(-tt * 0.21);
	vec3 col = palette(tt * 0.30 + time * 0.32, vec3(0.43, 0.57, 0.52), vec3(0.31, 0.30, 0.44), vec3(1.33, 1.17, 1.38), vec3(0.79, 0.09, 0.38)) * fog;
	col += vec3(0.89, 0.30, 0.61) * (it / 52.0) * 0.92;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
