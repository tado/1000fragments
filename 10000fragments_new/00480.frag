uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float map(vec3 q){
	q.z += time * 1.59;
	float g = dot(sin(q * 3.24), cos(q.zxy * 3.24));
	return (abs(g) - 0.39) / (3.24 * 2.5);
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 ro = vec3(0.0, 0.0, -2.97);
	vec3 rd = normalize(vec3(p, 1.55));
	float tt = 0.0; float it = 0.0;
	for(int i = 0; i < 67; i++){
		vec3 pos = ro + rd * tt;
		float dm = map(pos);
		if(dm < 0.002 || tt > 14.0) break;
		tt += dm * 0.70;
		it += 1.0;
	}
	float fog = exp(-tt * 0.45);
	vec3 col = hue(tt * 0.30 + time * 0.04) * fog;
	col += vec3(0.43, 0.86, 0.26) * (it / 67.0) * 0.63;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
