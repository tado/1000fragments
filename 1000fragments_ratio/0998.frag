uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash21(i + vec2(0.0, 0.0)), hash21(i + vec2(1.0, 0.0)), u.x),
               mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x), u.y);
}


void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec3 col = vec3(0.038, 0.002, 0.022);
	for(int li = 0; li < 15; li++){
		float fl = float(li);
		float fy = (fl / 15.0 - 0.5) * 1.88;
		float w = (vnoise2(vec2(p.x * 3.28 + fl * 7.3, (time * 0.51) * 1.19 + fl)) - 0.5) * 0.28;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 1.12, 2.24) + fl * 0.98 + (time * 0.51) * 0.92)) * (0.0068 / (ld + 0.0140));
	}
	col = col / (1.0 + col);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.29);
	col = clamp(col, 0.0, 1.0) * vec3(1.043, 0.993, 0.913) * 1.00 + 0.039;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
