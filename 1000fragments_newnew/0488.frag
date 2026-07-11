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
    float wr = length(p) + 0.21 * vnoise2(p * 4.30 + t * 0.56);
    v = sin(wr * 27.55 - t * 2.49 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.17;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 1.01;
	float d = field(p, (time * 0.82), 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.66, 0.61, 0.61) + vec3(0.04, 0.08, 0.08);
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.61);
	col = clamp(col, 0.0, 1.0) * vec3(1.010, 0.949, 0.998) * 1.00 + 0.045;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
