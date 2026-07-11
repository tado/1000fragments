uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 nodePos(float fi){
    float h1 = fract(sin(fi * 12.9898) * 43758.5453);
    float h2 = fract(sin(fi * 78.2330) * 43758.5453);
    return vec2(sin(time * (0.74 + 0.69 * h1) + fi * 2.39), cos(time * (0.79 + 0.65 * h2) + fi * 1.73)) * 0.77;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	vec3 col = vec3(0.023, 0.015, 0.026);
	for(int i = 0; i < 6; i++){
		float fi = float(i);
		vec2 na = nodePos(fi);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fi * 1.43 + time * 0.72)) * (0.0076 / (length(p - na) + 0.016));
		for(int j = i + 1; j < 6; j++){
			vec2 nb = nodePos(float(j));
			float ll = length(na - nb);
			if(ll < 1.07){
				vec2 pa = p - na; vec2 ba = nb - na;
				float hh = clamp(dot(pa, ba) / (dot(ba, ba) + 0.0001), 0.0, 1.0);
				float sd = length(pa - ba * hh);
				col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + ll * 3.83 + time * 0.43)) * (0.0029 / (sd + 0.009)) * (1.0 - ll / 1.07);
			}
		}
	}
	col = col / (1.0 + col);
	col *= 0.80 + 0.13 * sin(gl_FragCoord.y * 2.38 + time * 4.75);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
