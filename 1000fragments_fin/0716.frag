uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.78) * (0.54 + 0.63 * h1) + fi * 2.39), cos((time * 0.78) * (0.76 + 0.45 * h2) + fi * 1.73)) * 0.69;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p += vec2(sin((time * 0.78) * 0.43), cos((time * 0.78) * 0.58)) * 0.14;
	p *= 1.25;
	p *= 0.91;
	vec3 col = mix(vec3(0.010, 0.039, 0.062), vec3(0.020, 0.031, 0.076), clamp(0.5 + p.y * -0.19 + p.x * -0.11, 0.0, 1.0));
	for(int i = 0; i < 8; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(3.680, 5.108, 6.537) + fi * 0.63 + (time * 0.78) * 0.87)) * (0.0103 / (length(p - na) + 0.026));
		for(int j = i + 1; j < 8; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.94){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(3.680, 5.108, 6.537) + ll * 1.86 + (time * 0.78) * 0.90)) * (0.0025 / (sd + 0.013)) * (1.0 - ll / 0.94);
			}
		}
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.29);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(0.936, 0.987, 1.038);
	col += 0.013;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.35 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
