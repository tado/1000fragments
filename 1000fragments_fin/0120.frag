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
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float wr = length(p) + 0.13 * vnoise2(p * 5.92 + t * 1.07);
    v = sin(wr * 23.47 - t * 3.15 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.75 + (time * 0.73) * 0.64) * 0.07;
	p *= 1.0 + 0.28 * sin((time * 0.73) * 2.82);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.18, lr * 2.54 + (time * 0.73) * 0.56); }
	{ p = vec2(atan(p.y, p.x) * 1.38, length(p) * 4.05 - (time * 0.73) * 0.91); }
	float d = field(p, (time * 0.73), 0.0);
	vec3 col = palette(d * 1.02 + (time * 0.73) * 0.11, vec3(0.35, 0.46, 0.50), vec3(0.33, 0.28, 0.30), vec3(1.02, 0.88, 0.79), vec3(0.31, 0.42, 0.64));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.67));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.38);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.27);
	col *= vec3(1.029, 1.004, 0.918);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.23 * dot(fq, fq);
	col += (hash21(gl_FragCoord.xy + fract(time) * 240.0) - 0.5) * 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
