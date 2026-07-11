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
    float wr = length(p) + 0.23 * vnoise2(p * 4.14 + t * 1.35);
    v = sin(wr * 14.82 - t * 0.74 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.53;
	{ p = vec2(atan(p.y, p.x) * 1.56, length(p) * 4.01 - time * 0.40); }
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.41, 0.23, 0.60) * (0.23 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
