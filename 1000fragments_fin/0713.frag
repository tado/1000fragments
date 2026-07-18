uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.88) * (0.58 + 0.55 * h1) + fi * 2.39), cos((time * 0.88) * (0.49 + 0.51 * h2) + fi * 1.73)) * 0.72;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x += p.y * -0.74;
	p *= 0.97;
	p = rot2((time * 0.88) * 0.56) * p;
	vec3 col = mix(vec3(0.018, 0.053, 0.075), vec3(0.020, 0.042, 0.073), clamp(0.5 + p.y * 0.49 + p.x * -0.19, 0.0, 1.0));
	for(int i = 0; i < 8; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(1.763, 2.601, 3.438) + fi * 1.21 + (time * 0.88) * 0.26)) * (0.0050 / (length(p - na) + 0.015));
		for(int j = i + 1; j < 8; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.72){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.70, 0.41, 0.52) * (0.0018 / (sd + 0.015)) * (1.0 - ll / 0.72);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.40);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.09);
	col *= vec3(1.014, 0.959, 1.022);
	col += 0.012;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.26 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
