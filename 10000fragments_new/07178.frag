uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float map(vec3 q){
	q.z += time * 1.53;
	vec3 mq = mod(q, 2.01) - 1.01;
	return length(mq) - 0.31;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(1.01, 1.01, -3.0);
	vec3 rd = normalize(vec3(p, 0.97));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.66;
		it += 1.0;
	}
	float fog = exp(-tt * 0.34);
	vec3 col = palette(tt * 0.31 + time * 0.22, vec3(0.60, 0.56, 0.47), vec3(0.41, 0.40, 0.46), vec3(1.27, 1.32, 1.03), vec3(0.38, 0.95, 0.32)) * fog;
	col += vec3(0.51, 0.36, 0.64) * (it / 67.0) * 0.61;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
