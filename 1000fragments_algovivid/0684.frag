uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.81) * (0.40 + 1.18 * h1) + fi * 2.39), cos((time * 0.81) * (0.73 + 0.80 * h2) + fi * 1.73)) * 0.93;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.44;
	p.x = abs(p.x);
	p *= 1.38;
	p = rot2((time * 0.81) * -1.25) * p;
	vec3 col = vec3(0.007, 0.008, 0.043);
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.72, 1.44) + fi * 0.86 + (time * 0.81) * 0.69)) * (0.0054 / (length(p - na) + 0.019));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 0.86){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += vec3(0.80, 0.75, 0.62) * (0.0030 / (sd + 0.010)) * (1.0 - ll / 0.86);
			}
		}
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.66 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.23);
	col = clamp(col, 0.0, 1.0) * vec3(1.033, 0.986, 0.933) * 1.00 + 0.015;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
