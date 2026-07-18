uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.79) * (0.76 + 0.67 * h1) + fi * 2.39), cos((time * 0.79) * (0.67 + 1.06 * h2) + fi * 1.73)) * 0.94;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x += p.y * 0.44;
	p *= 1.10;
	p = rot2((time * 0.79) * -1.02) * p;
	vec3 col = mix(vec3(0.016, 0.034, 0.057), vec3(0.017, 0.020, 0.069), clamp(0.5 + p.y * 0.19 + p.x * -0.23, 0.0, 1.0));
	for(int i = 0; i < 9; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(3.679, 5.557, 7.435) + fi * 1.12 + (time * 0.79) * 0.27)) * (0.0082 / (length(p - na) + 0.012));
		for(int j = i + 1; j < 9; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.79){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.23, 0.44, 0.47) * (0.0025 / (sd + 0.010)) * (1.0 - ll / 0.79);
			}
		}
	}
	col = col / (1.0 + col);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.25);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.32);
	col *= vec3(0.986, 1.005, 0.995);
	col += 0.009;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.28 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
