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
    vec2 wq = vec2(vnoise2(p * 3.74 + ph), vnoise2(p * 3.74 + vec2(5.2, 1.3) + ph));
    vec2 wr = vec2(vnoise2(p * 3.74 + 3.69 * wq + vec2(1.7, 9.2) + t * 0.67),
                   vnoise2(p * 3.74 + 2.13 * wq + vec2(8.3, 2.8) - t * 1.09));
    v = vnoise2(p * 3.74 + 2.66 * wr) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.30;
	{ p = vec2(atan(p.y, p.x) * 1.65, length(p) * 4.29 - (time * 0.60) * 0.34); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.21, lr * 1.30 + (time * 0.60) * -0.84); }
	float d = 0.5 + 0.5 * field(p, (time * 0.60), 0.0);
	vec3 col = mix(vec3(0.79, 0.70, 0.82), vec3(0.09, 0.06, 0.11), d);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.54);
	col = clamp(col, 0.0, 1.0) * vec3(1.044, 1.008, 0.934) * 1.00 + 0.024;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
