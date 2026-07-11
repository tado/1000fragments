uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin((time * 0.51) * (0.63 + 0.84 * h1) + fi * 2.39), cos((time * 0.51) * (0.72 + 0.67 * h2) + fi * 1.73)) * 0.74;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x *= min(1.0, 1.8 * resolution.y / resolution.x);
	p.x += p.y * 0.69;
	p.x = abs(p.x) - 0.56;
	vec3 col = vec3(0.007, 0.021, 0.054);
	for(int i = 0; i < 7; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.57, 3.14) + fi * 1.26 + (time * 0.51) * 0.32)) * (0.0076 / (length(p - na) + 0.010));
		for(int j = i + 1; j < 7; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.07){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 1.57, 3.14) + ll * 3.36 + (time * 0.51) * 0.32)) * (0.0011 / (sd + 0.019)) * (1.0 - ll / 1.07);
			}
		}
	}
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 4.0) / 4.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.11);
	col = clamp(col, 0.0, 1.0) * vec3(1.006, 0.993, 0.986) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
