uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 0.84;
	float g = dot(sin(q * 2.78), cos(q.zxy * 2.78));
	return (abs(g) - 0.54) / (2.78 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -3.36);
	vec3 rd = normalize(vec3(p, 1.34));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 71; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.20);
	vec3 col = palette(tt * 0.37 + time * 0.28, vec3(0.45, 0.40, 0.53), vec3(0.50, 0.43, 0.46), vec3(1.06, 1.05, 0.75), vec3(0.11, 0.58, 0.36)) * fog;
	col += vec3(0.54, 0.75, 0.78) * (it / 71.0) * 0.85;
	col = fract(col * 2.19);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
