uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.84;
	vec2 g = mod(vec2(q.x, q.z), 2.50) - 1.25;
	float d = length(g) - (0.20 + 0.12 * sin(q.y * 3.80 + time * 2.09));
	return d * 0.7;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.25, 1.25, -3.0);
	vec3 rd = normalize(vec3(p, 1.13));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 48; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.62;
		it += 1.0;
	}
	float fog = exp(-tt * 0.31);
	vec3 col = palette(tt * 0.24 + time * 0.26, vec3(0.46, 0.44, 0.55), vec3(0.48, 0.45, 0.35), vec3(1.02, 0.92, 0.75), vec3(0.34, 0.53, 0.73)) * fog;
	col += vec3(0.35, 0.28, 0.26) * (it / 48.0) * 0.98;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
