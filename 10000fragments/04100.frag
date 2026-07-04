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
	vec3 col = vec3(0.031, 0.010, 0.059);
	for(int li = 0; li < 18; li++){
		float fl = float(li);
		float fy = (fl / 18.0 - 0.5) * 1.99;
		float w = (vnoise2(vec2(p.x * 2.59 + fl * 7.3, time * 1.58 + fl)) - 0.5) * 0.23;
		float ld = abs(p.y - fy - w);
		col += (0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + fl * 0.99 + time * 0.88)) * (0.0050 / (ld + 0.0129));
	}
	col = col / (1.0 + col);
	col *= 0.89 + 0.12 * sin(gl_FragCoord.y * 2.39 + time * 7.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
