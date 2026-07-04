uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -1.12) * p;
	vec3 col = vec3(0.022, 0.023, 0.013);
	for(int li = 0; li < 8; li++){
		float fl = float(li);
		float fy = (fl / 8.0 - 0.5) * 2.10;
		float w = (vnoise2(vec2(p.x * 3.56 + fl * 7.3, time * 1.68 + fl)) - 0.5) * 0.39;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.67 + time * 1.11)) * (0.0067 / (ld + 0.0073));
	}
	col = col / (1.0 + col);
	col *= 0.82 + 0.17 * sin(gl_FragCoord.y * 2.93 + time * 8.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
