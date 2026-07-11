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
	vec3 col = vec3(0.022, 0.013, 0.002);
	for(int li = 0; li < 14; li++){
		float fl = float(li);
		float fy = (fl / 14.0 - 0.5) * 1.83;
		float w = (vnoise2(vec2(p.x * 2.55 + fl * 7.3, (time * 0.71) * 2.25 + fl)) - 0.5) * 0.39;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 0.81, 1.63) + fl * 1.10 + (time * 0.71) * 0.24)) * (0.0055 / (ld + 0.0126));
	}
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.37 * dot(vg, vg);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.58);
	col = clamp(col, 0.0, 1.0) * vec3(1.044, 1.005, 0.920) * 1.00 + 0.030;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
