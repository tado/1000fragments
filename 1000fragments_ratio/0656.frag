uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.83) * (0.39 + 1.01 * h1) + fi * 2.39), cos((time * 0.83) * (0.61 + 1.04 * h2) + fi * 1.73)) * 0.94;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= min(1.0, 1.8 * resolution.y / resolution.x);
	p = p.yx;
	p.y = abs(p.y) - 0.33;
	p = rot2((time * 0.83) * -1.16) * p;
	vec3 col = vec3(0.004, 0.035, 0.059);
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.06, 2.11) + fi * 1.07 + (time * 0.83) * 0.52)) * (0.0101 / (length(p - na) + 0.012));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.09){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 1.06, 2.11) + ll * 3.29 + (time * 0.83) * 0.98)) * (0.0017 / (sd + 0.019)) * (1.0 - ll / 1.09);
			}
		}
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.33);
	col = clamp(col, 0.0, 1.0) * vec3(1.017, 1.004, 1.002) * 1.00 + 0.017;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
