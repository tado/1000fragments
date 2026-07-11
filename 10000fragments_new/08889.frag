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
    vec2 wq = vec2(vnoise2(p * 4.37 + ph), vnoise2(p * 4.37 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.37 + 2.44 * wq + vec2(1.7, 9.2) + t * 1.07),
                   vnoise2(p * 4.37 + 1.06 * wq + vec2(8.3, 2.8) - t * 1.11));
    v = vnoise2(p * 4.37 + 2.57 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.12));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
