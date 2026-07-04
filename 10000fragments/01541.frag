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
    vec2 wq = vec2(vnoise2(p * 4.26 + ph), vnoise2(p * 4.26 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.26 + 3.13 * wq + vec2(1.7, 9.2) + t * 0.74),
                   vnoise2(p * 4.26 + 3.29 * wq + vec2(8.3, 2.8) - t * 0.68));
    v = vnoise2(p * 4.26 + 1.18 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = (floor(p * 21.1) + 0.5) / 21.1;
	p = fract(p * 2.35) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.81, 0.29, 0.46) * (0.15 / (abs(d) + 0.09));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
