uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.66) * (0.75 + 0.59 * h1) + fi * 2.39), cos((time * 0.66) * (0.53 + 1.20 * h2) + fi * 1.73)) * 0.65;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	p += vec2(sin((time * 0.66) * 1.15), cos((time * 0.66) * 1.03)) * 0.11;
	p.x = abs(p.x);
	p *= 0.92;
	vec3 col = vec3(0.016, 0.012, 0.023);
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(3.325, 4.860, 6.395) + fi * 1.38 + (time * 0.66) * 0.61)) * (0.0047 / (length(p - na) + 0.025));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.76){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.55, 0.57, 0.92) * (0.0019 / (sd + 0.015)) * (1.0 - ll / 0.76);
			}
		}
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.24);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(1.009, 0.999, 1.004);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.34 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
