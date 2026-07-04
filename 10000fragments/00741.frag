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
    float bx = p.x + (vnoise2(vec2(p.y * 1.44, t * 0.93)) - 0.5) * 0.59;
    v = exp(-abs(bx) * 8.90) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.0 + 0.16 * sin(time * 3.84);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.05), field(p, time, 2.09));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.50, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
