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
    float bx = p.x + (vnoise2(vec2(p.y * 3.83, t * 2.25)) - 0.5) * 0.82;
    v = exp(-abs(bx) * 10.71) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.88, 1.04, 0.82) + vec3(0.17, 0.17, 0.07);
	col = mod(col * 1.47, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
