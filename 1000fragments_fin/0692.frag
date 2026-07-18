uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.65) * (0.38 + 0.68 * h1) + fi * 2.39), cos((time * 0.65) * (0.57 + 0.31 * h2) + fi * 1.73)) * 0.87;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.6;
	vec3 col = mix(vec3(0.050, 0.035, 0.091), vec3(0.056, 0.032, 0.097), clamp(0.5 + p.y * 0.25 + p.x * -0.29, 0.0, 1.0));
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(1.810, 2.811, 3.812) + fi * 1.27 + (time * 0.65) * 0.13)) * (0.0114 / (length(p - na) + 0.012));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.03){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(1.810, 2.811, 3.812) + ll * 1.18 + (time * 0.65) * 0.60)) * (0.0030 / (sd + 0.012)) * (1.0 - ll / 1.03);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.27);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.025, 0.988, 0.943);
	col += 0.016;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.58 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
