uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.75;
	float g = dot(sin(q * 2.91), cos(q.zxy * 2.91));
	return (abs(g) - 0.54) / (2.91 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.37);
	vec3 rd = normalize(vec3(p, 1.48));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 70; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.79;
		it += 1.0;
	}
	float fog = exp(-tt * 0.44);
	vec3 col = palette(tt * 0.30 + time * 0.17, vec3(0.49, 0.44, 0.56), vec3(0.36, 0.38, 0.49), vec3(1.16, 0.81, 1.30), vec3(0.82, 0.18, 0.15)) * fog;
	col += vec3(0.53, 0.51, 0.95) * (it / 70.0) * 0.66;
	col = fract(col * 1.43);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
