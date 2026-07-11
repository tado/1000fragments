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
    vec2 wq = vec2(vnoise2(p * 4.34 + ph), vnoise2(p * 4.34 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.34 + 1.46 * wq + vec2(1.7, 9.2) + t * 0.95),
                   vnoise2(p * 4.34 + 2.84 * wq + vec2(8.3, 2.8) - t * 0.48));
    v = vnoise2(p * 4.34 + 2.87 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.52, 0.13) * sin(length(p) * 4.03 - time * 1.36) * 0.17;
	p *= 2.75;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.85, 1.54, 1.52) + vec3(0.22, 0.13, 0.23);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
