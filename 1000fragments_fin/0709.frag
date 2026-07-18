uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.66) * (0.54 + 0.63 * h1) + fi * 2.39), cos((time * 0.66) * (0.31 + 0.36 * h2) + fi * 1.73)) * 0.79;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.y = abs(p.y) - 0.40;
	p.x = abs(p.x);
	vec3 col = vec3(0.031, 0.013, 0.031);
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(2.034, 3.619, 5.203) + fi * 1.32 + (time * 0.66) * 0.62)) * (0.0095 / (length(p - na) + 0.014));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.00){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(2.034, 3.619, 5.203) + ll * 1.49 + (time * 0.66) * 0.40)) * (0.0014 / (sd + 0.011)) * (1.0 - ll / 1.00);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.87 + 0.13 * sin(gl_FragCoord.y * 1.48 + (time * 0.66) * 16.81);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.46);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.17);
	col *= vec3(0.996, 0.999, 0.989);
	col += 0.025;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
