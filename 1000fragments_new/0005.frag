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
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.99 + ph), vnoise2(p * 4.99 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.99 + 3.44 * wq + vec2(1.7, 9.2) + t * 0.47),
                   vnoise2(p * 4.99 + 2.43 * wq + vec2(8.3, 2.8) - t * 0.45));
    v = vnoise2(p * 4.99 + 2.63 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 2.00 + time * 0.08, vec3(0.49, 0.47, 0.60), vec3(0.39, 0.48, 0.45), vec3(1.37, 0.94, 0.90), vec3(0.81, 0.70, 0.34));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.08;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
