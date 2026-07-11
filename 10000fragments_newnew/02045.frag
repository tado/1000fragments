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
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 wq = vec2(vnoise2(p * 4.55 + ph), vnoise2(p * 4.55 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 4.55 + 2.20 * wq + vec2(1.7, 9.2) + t * 0.95),
                   vnoise2(p * 4.55 + 3.86 * wq + vec2(8.3, 2.8) - t * 1.08));
    v = vnoise2(p * 4.55 + 3.61 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.07;
	p = fract(p * 2.44) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.55 + time * 0.00);
	col *= 0.89 + 0.10 * sin(gl_FragCoord.y * 1.87 + time * 7.09);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
