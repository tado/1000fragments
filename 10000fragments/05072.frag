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
	vec3 col = vec3(0.006, 0.016, 0.058);
	for(int li = 0; li < 22; li++){
		float fl = float(li);
		float fy = (fl / 22.0 - 0.5) * 2.06;
		float w = (vnoise2(vec2(p.x * 2.57 + fl * 7.3, time * 1.36 + fl)) - 0.5) * 0.36;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.51 + time * 0.31)) * (0.0024 / (ld + 0.0121));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.63 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
