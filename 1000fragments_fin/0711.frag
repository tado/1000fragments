uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.69) * (0.67 + 0.36 * h1) + fi * 2.39), cos((time * 0.69) * (0.37 + 1.05 * h2) + fi * 1.73)) * 0.70;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	if(resolution.x > resolution.y * 1.9) p *= 0.3;
	p *= 0.76;
	p.x += p.y * 0.53;
	p = rot2((time * 0.69) * -0.96) * p;
	vec3 col = mix(vec3(0.009, 0.068, 0.075), vec3(0.014, 0.057, 0.043), clamp(0.5 + p.y * 0.16 + p.x * 0.26, 0.0, 1.0));
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(5.196, 6.023, 6.851) + fi * 1.43 + (time * 0.69) * 0.30)) * (0.0118 / (length(p - na) + 0.012));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.90){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(5.196, 6.023, 6.851) + ll * 1.90 + (time * 0.69) * 0.81)) * (0.0013 / (sd + 0.013)) * (1.0 - ll / 0.90);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.53);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col *= vec3(1.018, 0.957, 1.015);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.29 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
