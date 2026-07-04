uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.46;
	float g = dot(sin(q * 3.21), cos(q.zxy * 3.21));
	return (abs(g) - 0.45) / (3.21 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.68);
	vec3 rd = normalize(vec3(p, 1.32));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 49; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.73;
		it += 1.0;
	}
	float fog = exp(-tt * 0.19);
	vec3 col = hue(tt * 0.20 + time * 0.30) * fog;
	col += vec3(0.67, 0.86, 0.28) * (it / 49.0) * 0.81;
	col = fract(col * 1.68);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
