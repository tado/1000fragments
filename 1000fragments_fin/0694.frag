uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.72) * (0.42 + 0.48 * h1) + fi * 2.39), cos((time * 0.72) * (0.37 + 1.19 * h2) + fi * 1.73)) * 0.59;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p += vec2(sin((time * 0.72) * 0.98), cos((time * 0.72) * 1.12)) * 0.06;
	vec3 col = mix(vec3(0.069, 0.059, 0.048), vec3(0.082, 0.075, 0.030), clamp(0.5 + p.y * -0.50 + p.x * 0.21, 0.0, 1.0));
	for(int i = 0; i < 10; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(4.353, 5.286, 6.219) + fi * 1.04 + (time * 0.72) * 0.82)) * (0.0107 / (length(p - na) + 0.015));
		for(int j = i + 1; j < 10; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.07){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.64, 0.42, 0.42) * (0.0013 / (sd + 0.013)) * (1.0 - ll / 1.07);
			}
		}
	}
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.20);
	col *= vec3(0.931, 0.990, 1.050);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
