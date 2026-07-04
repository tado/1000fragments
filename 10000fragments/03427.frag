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
    float bx = p.x + (vnoise2(vec2(p.y * 3.57, t * 1.79)) - 0.5) * 0.70;
    v = exp(-abs(bx) * 11.54) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.01 + ga * 4.0 - t * 2.39 + ph);
    v = arm * exp(-gr * 0.70);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.97;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.69; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.62);
	float d = max(d1, d2);
	vec3 col = palette(d * 1.71 + time * 0.27, vec3(0.56, 0.43, 0.51), vec3(0.40, 0.37, 0.31), vec3(1.08, 1.36, 0.95), vec3(0.04, 0.05, 0.12));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
