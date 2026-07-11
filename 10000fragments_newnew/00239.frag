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
    float bx = p.x + (vnoise2(vec2(p.y * 1.37, t * 2.52)) - 0.5) * 0.87;
    v = exp(-abs(bx) * 9.94) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.33; }
	p.x += sin(p.y * 4.27 + time * 3.91) * 0.25;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.08, vec3(0.47, 0.55, 0.50), vec3(0.40, 0.36, 0.35), vec3(1.05, 1.09, 1.39), vec3(0.58, 0.93, 0.19));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
