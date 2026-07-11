uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.25;
	float g = dot(sin(q * 3.93), cos(q.zxy * 3.93));
	return (abs(g) - 0.37) / (3.93 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.89);
	vec3 rd = normalize(vec3(p, 1.58));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 63; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.75;
		it += 1.0;
	}
	float fog = exp(-tt * 0.25);
	vec3 col = palette(tt * 0.38 + time * 0.32, vec3(0.58, 0.55, 0.57), vec3(0.40, 0.46, 0.38), vec3(1.05, 1.30, 1.30), vec3(1.00, 0.66, 0.02)) * fog;
	col += vec3(0.82, 0.73, 0.80) * (it / 63.0) * 0.73;
	col = clamp((col - 0.5) * 1.84 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
