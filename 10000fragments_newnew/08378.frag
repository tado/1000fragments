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
    float wr = length(p) + 0.12 * vnoise2(p * 5.02 + t * 0.68);
    v = sin(wr * 15.86 - t * 2.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.73;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.14;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.79));
	col = 0.5 + 0.5 * col;
	col *= 0.88 + 0.17 * sin(gl_FragCoord.y * 2.17 + time * 15.94);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
