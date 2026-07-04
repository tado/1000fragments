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

float field(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.31 * vnoise2(p * 5.43 + t * 0.88);
    v = sin(wr * 12.58 - t * 3.09 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.22;
	p = (floor(p * 11.9) + 0.5) / 11.9;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.71), field(p, time, 1.43));
	col = 0.5 + 0.5 * col;
	col *= 0.86 + 0.18 * sin(gl_FragCoord.y * 1.79 + time * 8.26);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
