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
    vec2 z = p * 1.55; vec2 jc = vec2(-0.72 + 0.3 * sin(t * 1.24 + ph), 0.11 + 0.3 * cos(t * 1.59 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 39; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / 39.0 * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float bx = p.x + (vnoise2(vec2(p.y * 2.95, t * 1.62)) - 0.5) * 1.12;
    v = exp(-abs(bx) * 5.52) * 2.0 - 1.0 + 0.0 * ph;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.57;
	p = fract(p * 2.44) - 0.5;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.97; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.69);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.66 + time * 0.05, vec3(0.41, 0.40, 0.51), vec3(0.47, 0.34, 0.38), vec3(1.04, 0.88, 1.36), vec3(0.30, 0.31, 0.36));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.69 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
