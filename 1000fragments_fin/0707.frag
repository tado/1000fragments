uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.65) * (0.46 + 0.54 * h1) + fi * 2.39), cos((time * 0.65) * (0.36 + 0.77 * h2) + fi * 1.73)) * 0.85;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p.y = abs(p.y);
	vec3 col = mix(vec3(0.031, 0.050, 0.048), vec3(0.034, 0.064, 0.045), clamp(0.5 + p.y * 0.28 + p.x * 0.01, 0.0, 1.0));
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.600, 1.818, 3.036) + fi * 0.89 + (time * 0.65) * 0.84)) * (0.0102 / (length(p - na) + 0.027));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.90){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.85, 0.36, 0.51) * (0.0020 / (sd + 0.011)) * (1.0 - ll / 0.90);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.48);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.26);
	col *= vec3(0.982, 1.017, 0.941);
	col += 0.017;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.31 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
